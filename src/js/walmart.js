import {
  loadHeaderFooterNav,
  getParams,
  renderWithTemplate,
} from './utilities.mjs';
import providerSearch from './providerSearch.mjs';
import {
  walmartProductCardTemplate,
  extractWalmartArray,
  walmartSearchButtonHTMLTemplate,
  walmartSearchButtonHTMLtemp,
} from './walmartSearch.mjs';

// renders the header, footer, and Nav
loadHeaderFooterNav();

const walmartString = `https://walmart-data.p.rapidapi.com/walmart-serp.php?url=https://www.walmart.com/search?q=`;
const host = 'walmart-data.p.rapidapi.com';
const productsHTMLElement = document.querySelector('#walmart-products');

const walmartSearch = new providerSearch(
  productsHTMLElement,
  walmartString,
  walmartProductCardTemplate,
  extractWalmartArray,
  host,
  'walmart',
  walmartSearchButtonHTMLTemplate
);

const searchForm = document.querySelector('#searchForm');
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchValue = document.querySelector('.search-input').value;
  const searchQuery = searchValue.trim().split(' ').join('+');
  renderWithTemplate(
    walmartSearchButtonHTMLtemp(searchQuery, searchValue),
    productsHTMLElement,
    'beforebegin'
  );
  walmartSearch.searchData(searchQuery);
});

walmartSearch.init();

const deleteSearch = document.querySelectorAll('.delete-search');

if (deleteSearch.length > 0) {
  for (let i = 0; i < deleteSearch.length; i++) {
    deleteSearch[i].addEventListener('click', (event) => {
      event.preventDefault();
      const searchId = deleteSearch[i].id;
      const parentId = `${searchId}-parent`;
      document.getElementById(parentId).remove();
      walmartSearch.deletePreviousSearch(searchId);
      location.reload();
    });
  }
}

const parameter = getParams('search');
if (parameter) {
  walmartSearch.renderSearchPage(parameter);
}
