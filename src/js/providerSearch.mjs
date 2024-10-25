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
      renderListWithTemplate(this.htmlTemplate, this.listElement, arrayData);
    }
  }
  // async getImportantData(url, options) {
  //   try {
  //     const response = await fetch(url, options);
  //     const result = await convertToJson(response);
  //     console.log(result);
  //     return result;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

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
