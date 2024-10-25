import { loadHeaderFooterNav } from './utilities.mjs';
import providerSearch from './providerSearch.mjs';
import {
  walmartProductCardTemplate,
  extractWalmartArray,
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
  host
);

const searchForm = document.querySelector('#searchForm');
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchQuery = document
    .querySelector('.search-input')
    .value.trim()
    .split(' ')
    .join('+');
  walmartSearch.searchData(searchQuery);
});
