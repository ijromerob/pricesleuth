import {
  getParams,
  loadHeaderFooterNav,
  renderWithTemplate,
} from './utilities.mjs';
import providerSearch from './providerSearch.mjs';
import {
  targetProductCardTemplate,
  extractTargetArray,
  targetSearchButtonHTMLTemplate,
  targetSearchButtonHTMLtemp,
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
  host,
  'target',
  targetSearchButtonHTMLTemplate
);

const searchForm = document.querySelector('.searchElements');
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchValue = document.querySelector('.search-input').value;
  const searchQuery = searchValue.trim().split(' ').join('+');
  renderWithTemplate(
    targetSearchButtonHTMLtemp(searchQuery, searchValue),
    productsHTMLElement,
    'beforebegin'
  );
  targetSearch.searchData(searchQuery);
});

targetSearch.init();

const deleteSearch = document.querySelectorAll('.delete-search');

if (deleteSearch.length > 0) {
  for (let i = 0; i < deleteSearch.length; i++) {
    deleteSearch[i].addEventListener('click', (event) => {
      event.preventDefault();
      const searchId = deleteSearch[i].id;
      const parentId = `${searchId}-parent`;
      document.getElementById(parentId).remove();
      targetSearch.deletePreviousSearch(searchId);
      location.reload();
    });
  }
}

const parameter = getParams('search');
if (parameter) {
  targetSearch.renderSearchPage(parameter);
}
