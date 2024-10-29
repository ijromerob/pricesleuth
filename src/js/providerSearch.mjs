import {
  renderListWithTemplate,
  convertToJson,
  getFromLocalStorage,
  setToLocalStorage,
} from './utilities.mjs';

export default class providerSearch {
  constructor(
    listElement,
    searchURL,
    htmlTemplate,
    extractArrayFn,
    host,
    company = null,
    searchButtonTemplate = null
  ) {
    this.company = company;
    this.listElement = listElement;
    this.searchURL = searchURL;
    this.htmlTemplate = htmlTemplate;
    this.extractArrayFn = extractArrayFn;
    this.host = host;
    this.searchButtonTemplate = searchButtonTemplate;
    this.searchHistory = getFromLocalStorage(this.company) || { searches: [] };
  }

  async searchData(searchElement) {
    this.listElement.innerHTML = '<h2>Loading...</h2>';
    const urlAPI = this.searchURL + searchElement;
    const key = import.meta.env.VITE_RAPID_API_KEY;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': key,
        'x-rapidapi-host': this.host,
      },
    };

    const jsonData = await this.getImportantData(urlAPI, options);
    if (jsonData) {
      this.listElement.innerHTML = '';
      let arrayData = this.extractArrayFn(jsonData);
      this.searchHistory.searches.push({ [searchElement]: arrayData });
      setToLocalStorage(this.searchHistory, this.company);
      renderListWithTemplate(this.htmlTemplate, this.listElement, arrayData);
    }
  }

  async getImportantData(url, options) {
    try {
      const response = await fetch(url, options);

      console.log('Fetch Response Status:', response.status);
      console.log('Response Headers:', response.headers);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await convertToJson(response);
      console.log('Result from convertToJson:', result);

      if (!result) {
        console.warn('Warning: No data returned from convertToJson');
        this.listElement.innerHTML = '';
        this.listElement.innerHTML =
          '<h2>This is embarrassing but the API did not retrieve anything</h2>';
        return null;
      }

      return result;
    } catch (error) {
      console.error('Error in getImportantData:', error);
      throw error;
    }
  }

  renderSearchPage(id) {
    const listOfSearches = this.searchHistory.searches;
    let searchToRender;
    for (let i = 0; i < listOfSearches.length; i++) {
      if (Object.keys(listOfSearches[i]) == id) {
        searchToRender = listOfSearches[i];
      }
    }
    if (searchToRender) {
      renderListWithTemplate(
        this.htmlTemplate,
        this.listElement,
        searchToRender[id],
        'afterbegin',
        true
      );
    } else {
      window.location.assign('index.html');
    }
  }

  deletePreviousSearch(id) {
    const newSearches = this.searchHistory.searches.filter(
      (search) => Object.keys(search)[0] !== id
    );
    this.searchHistory.searches = newSearches;
    setToLocalStorage(this.searchHistory, this.company);
  }

  init() {
    if (this.searchHistory.searches.length > 0) {
      const lastSearch =
        this.searchHistory.searches[this.searchHistory.searches.length - 1];
      const lastSearchName = Object.keys(lastSearch)[0];
      const array = lastSearch[lastSearchName];
      renderListWithTemplate(
        this.searchButtonTemplate,
        this.listElement,
        this.searchHistory.searches,
        'beforebegin',
        true
      );

      renderListWithTemplate(this.htmlTemplate, this.listElement, array);
    }
  }
  initCombined() {
    if (this.searchHistory.searches.length > 0) {
      const lastSearch =
        this.searchHistory.searches[this.searchHistory.searches.length - 1];
      const lastSearchName = Object.keys(lastSearch)[0];
      const array = lastSearch[lastSearchName];
      renderListWithTemplate(this.htmlTemplate, this.listElement, array);
    }
  }
}
