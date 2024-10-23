import { loadHeaderFooterNav } from './utilities.mjs';
import providerSearch from './providerSearch.mjs';
import {
  targetProductCardTemplate,
  extractTargetArray,
} from './targetSearch.mjs';
// renders the header, footer, and Nav
loadHeaderFooterNav();

const productsHTMLElement = document.querySelector('#target-products');
const searchURL = '/json/targetsearch.json';
const targetSearch = new providerSearch(
  productsHTMLElement,
  searchURL,
  targetProductCardTemplate,
  extractTargetArray
);

targetSearch.init();
