export function targetProductCardTemplate(product) {
  return `<li class="product-card target-card">
  <a class="product-link" href="${product.item.enrichment.buy_url}">
  <h4 class="product-title">${product.item.product_description.title}</h4>
  <img class="product-image" src="${product.item.enrichment.images.primary_image_url}" alt="image of ${product.item.product_description.title}" loading="lazy">
    ${product.price ? `<p class="product-price">${product.price.current_retail ? `$${product.price.current_retail}` : `${product.price.formatted_current_price}`}</p>` : ''}
  </a>
</li>`;
}

export function extractTargetArray(json) {
  return json.data.search.products;
}

export function targetSearchButtonHTMLTemplate(json) {
  const key = Object.keys(json)[0];
  return `<a href="../target/index.html?search=${key}" class="btn-old-search" id="${key}-parent">
    ${key} <button class="delete-search" id="${key}">✕</button>
  </a>`;
}

export function targetSearchButtonHTMLtemp(togetherString, separatedString) {
  return `<a href="../target/index.html?search=${togetherString}" class="btn-old-search" id="${togetherString}-parent">
    ${separatedString} <button class="delete-search" id="${togetherString}">✕</button>
  </a>`;
}
