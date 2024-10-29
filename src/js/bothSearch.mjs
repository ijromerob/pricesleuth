export function combinedSearchButtonHTMLTemplate(json) {
  const key = Object.keys(json)[0];
  return `<a href="../both/index.html?search=${key}" class="btn-old-search" id="${key}-parent">
    ${key} <button class="delete-search" id="${key}">✕</button>
  </a>`;
}

export function bothSearchButtonHTMLtemp(togetherString, separatedString) {
  return `<a href="../both/index.html?search=${togetherString}" class="btn-old-search" id="${togetherString}-parent">
    ${separatedString} <button class="delete-search" id="${togetherString}">✕</button>
  </a>`;
}
