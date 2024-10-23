import { loadHeaderFooterNav } from './utilities.mjs';
import providerSearch from './providerSearch.mjs';
import {
  walmartProductCardTemplate,
  extractWalmartArray,
} from './walmartSearch.mjs';

// renders the header, footer, and Nav
loadHeaderFooterNav();

const productsHTMLElement = document.querySelector('#walmart-products');
const searchURL = '/json/walmartsearch.json';
const walmartSearch = new providerSearch(
  productsHTMLElement,
  searchURL,
  walmartProductCardTemplate,
  extractWalmartArray
);

walmartSearch.init();
