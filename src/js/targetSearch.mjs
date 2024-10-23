import { renderWithTemplate, convertToJson } from './utilities.mjs';

const baseTargetURL = import.meta.env.TARGET_URL;
export default class TargetSearch {
  constructor(listElement) {
    this.listElement = listElement;
  }

  async getSearchData(searchElement) {
    const response = await fetch(baseTargetURL + `${searchElement}`);
    const data = await convertToJson(response);
    return data;
  }
}
