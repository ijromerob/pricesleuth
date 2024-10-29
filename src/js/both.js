import {
  loadHeaderFooterNav,
  renderWithTemplate,
  getParams,
} from './utilities.mjs';
import providerSearch from './providerSearch.mjs';
import {
  walmartProductCardTemplate,
  extractWalmartArray,
} from './walmartSearch.mjs';
import {
  targetProductCardTemplate,
  extractTargetArray,
} from './targetSearch.mjs';

import {
  combinedSearchButtonHTMLTemplate,
  bothSearchButtonHTMLtemp,
} from './bothSearch.mjs';

// renders the header, footer, and Nav
loadHeaderFooterNav();

// Elements in the HTML
const walmartHTMLElement = document.querySelector('#walmart-products-combined');
const targetHTMLElement = document.querySelector('#target-products-combined');

// Temporary links for target and
const walmartURL =
  'https://walmart-data.p.rapidapi.com/walmart-serp.php?url=https://www.walmart.com/search?q=';
const targetURL =
  'https://target-com-shopping-api.p.rapidapi.com/product_search?store_id=1122&keyword=';

// hosts
const walmartHost = 'walmart-data.p.rapidapi.com';
const TargetHost = 'target-com-shopping-api.p.rapidapi.com';
// Instances for searches

const walmartSearch = new providerSearch(
  walmartHTMLElement,
  walmartURL,
  walmartProductCardTemplate,
  extractWalmartArray,
  walmartHost,
  'walmart-c',
  combinedSearchButtonHTMLTemplate
);

const targetSearch = new providerSearch(
  targetHTMLElement,
  targetURL,
  targetProductCardTemplate,
  extractTargetArray,
  TargetHost,
  'target-c',
  combinedSearchButtonHTMLTemplate
);

const searchForm = document.querySelector('.searchElements');
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchValue = document.querySelector('.search-input').value;
  const searchQuery = searchValue.trim().split(' ').join('+');
  renderWithTemplate(
    bothSearchButtonHTMLtemp(searchQuery, searchValue),
    walmartHTMLElement,
    'beforebegin'
  );
  walmartSearch.searchData(searchQuery);
  targetSearch.searchData(searchQuery);
});

walmartSearch.init();
targetSearch.initCombined();

const deleteSearch = document.querySelectorAll('.delete-search');

if (deleteSearch.length > 0) {
  for (let i = 0; i < deleteSearch.length; i++) {
    deleteSearch[i].addEventListener('click', (event) => {
      event.preventDefault();
      const searchId = deleteSearch[i].id;
      const parentId = `${searchId}-parent`;
      document.getElementById(parentId).remove();
      targetSearch.deletePreviousSearch(searchId);
      walmartSearch.deletePreviousSearch(searchId);
      location.reload();
    });
  }
}

const parameter = getParams('search');
if (parameter) {
  targetSearch.renderSearchPage(parameter);
  walmartSearch.renderSearchPage(parameter);
}
