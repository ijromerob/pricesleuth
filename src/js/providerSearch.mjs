import { renderListWithTemplate, convertToJson } from './utilities.mjs';

const baseWalmartURL = import.meta.env.WALMART_URL;
export default class providerSearch {
  constructor(listElement, searchURL, htmlTemplate, extractArrayFn) {
    this.listElement = listElement;
    this.searchURL = searchURL;
    this.htmlTemplate = htmlTemplate;
    this.extractArrayFn = extractArrayFn;
  }

  async getSearchData(searchElement) {
    const response = await fetch(this.searchURL + `${searchElement}`);
    const data = await convertToJson(response);
    return data;
  }
  async startSearching(element) {
    const products = await this.getSearchData(element).then();
  }
  async getData() {
    const response = await fetch(this.searchURL);
    const data = await convertToJson(response);
    console.log(data);
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
