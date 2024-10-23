import { renderWithTemplate, convertToJson } from './utilities.mjs';

const baseWalmartURL = import.meta.env.WALMART_URL;
export default class providerSearch {
  constructor(listElement, searchURL, htmlTemplate) {
    this.listElement = listElement;
    this.searchURL = searchURL;
    this.htmlTemplate = htmlTemplate;
  }

  async getSearchData(searchElement) {
    const response = await fetch(this.searchURL + `${searchElement}`);
    const data = await convertToJson(response);
    return data;
  }
  async startSearching(element) {
    const products = await this.getSearchData(element).then(
      renderWithTemplate(this.htmlTemplate, this.listElement)
    );
  }
}
