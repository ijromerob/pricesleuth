export function targetProductCardTemplate(product) {
  return `<li class="product-card target-card">
  <a class="product-link" href="${product.item.enrichment.buy_url}">
  <h4 class="product-title">${product.item.product_description.title}</h4>
  <img class="product-image" src="${product.item.enrichment.images.primary_image_url}" alt="image of ${product.item.product_description.title}" loading="lazy">
    <p class="product-price">${product.price.formatted_current_price}</p>
  </a>
</li>`;
}

export function extractTargetArray(json) {
  return json.data.search.products;
}
