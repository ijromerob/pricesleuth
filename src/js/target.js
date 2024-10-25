import { loadHeaderFooterNav } from './utilities.mjs';
import providerSearch from './providerSearch.mjs';
import {
  targetProductCardTemplate,
  extractTargetArray,
} from './targetSearch.mjs';
// renders the header, footer, and Nav
loadHeaderFooterNav();

const targetString =
  'https://target-com-shopping-api.p.rapidapi.com/product_search?store_id=1122&keyword=';
const host = 'target-com-shopping-api.p.rapidapi.com';

const productsHTMLElement = document.querySelector('#target-products');
const targetSearch = new providerSearch(
  productsHTMLElement,
  targetString,
  targetProductCardTemplate,
  extractTargetArray,
  host
);

const searchForm = document.querySelector('.searchElements');
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchQuery = document
    .querySelector('.search-input')
    .value.trim()
    .split(' ')
    .join('+');
  targetSearch.searchData(searchQuery);
});
