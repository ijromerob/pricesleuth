export function walmartProductCardTemplate(product) {
  return `<li class="product-card walmart-card">
  <a class="product-link" href="${product.link}">
  <h4 class="product-title">${product.title}</h4>
  <img class="product-image" src="${product.image}" alt="image of ${product.title}" loading="lazy">
  ${product.outOfStock ? `<div class="out-of-stock">OUT OF STOCK</div>` : ``}
    <p class="product-price">${product.price.currentPrice}</p>
  </a>
</li>`;
}

export function extractWalmartArray(json) {
  return json.body.products;
}

export function walmartSearchButtonHTMLTemplate(json) {
  const key = Object.keys(json)[0];
  return `<a href="../walmart/index.html?search=${key}" class="btn-old-search" id="${key}-parent">
    ${key} <button class="delete-search" id="${key}">✕</button>
  </a>`;
}

export function walmartSearchButtonHTMLtemp(togetherString, separatedString) {
  return `<a href="../walmart/index.html?search=${togetherString}" class="btn-old-search" id="${togetherString}-parent">
    ${separatedString} <button class="delete-search" id="${togetherString}">✕</button>
  </a>`;
}
