import { renderListWithTemplate, convertToJson } from './utilities.mjs';

export default class providerSearch {
  constructor(
    listElement,
    searchURL,
    htmlTemplate,
    extractArrayFn,
    host = null
  ) {
    this.listElement = listElement;
    this.searchURL = searchURL;
    this.htmlTemplate = htmlTemplate;
    this.extractArrayFn = extractArrayFn;
    this.host = host;
  }

  async searchData(searchElement) {
    this.listElement.innerHTML = '';
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
      let arrayData = this.extractArrayFn(jsonData);
      renderListWithTemplate(this.htmlTemplate, this.listElement, arrayData);
    }
  }
  async getImportantData(url, options) {
    try {
      const response = await fetch(url, options);
      const result = await convertToJson(response);
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  }
  async getData() {
    const response = await fetch(this.searchURL);
    const data = await convertToJson(response);
    return data;
  }
  async init() {
    const jsonData = await this.getData();
    if (jsonData) {
      let arrayData = this.extractArrayFn(jsonData);
      renderListWithTemplate(this.htmlTemplate, this.listElement, arrayData);
    }
  }
}
