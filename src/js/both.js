import { loadHeaderFooterNav } from './utilities.mjs';
import providerSearch from './providerSearch.mjs';
import {
  walmartProductCardTemplate,
  extractWalmartArray,
} from './walmartSearch.mjs';
import {
  targetProductCardTemplate,
  extractTargetArray,
} from './targetSearch.mjs';

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
  walmartHost
);

const targetSearch = new providerSearch(
  targetHTMLElement,
  targetURL,
  targetProductCardTemplate,
  extractTargetArray,
  TargetHost
);

const searchForm = document.querySelector('.searchElements');
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchQuery = document
    .querySelector('.search-input')
    .value.trim()
    .split(' ')
    .join('+');
  walmartSearch.searchData(searchQuery);
  targetSearch.searchData(searchQuery);
});
