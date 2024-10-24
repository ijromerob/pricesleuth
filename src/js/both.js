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
const walmartURL = '/json/walmartsearch.json';
const targetURL = '/json/targetsearch.json';

// Instances for searches

const walmartSearch = new providerSearch(
  walmartHTMLElement,
  walmartURL,
  walmartProductCardTemplate,
  extractWalmartArray
);

const targetSearch = new providerSearch(
  targetHTMLElement,
  targetURL,
  targetProductCardTemplate,
  extractTargetArray
);

walmartSearch.init();
targetSearch.init();
