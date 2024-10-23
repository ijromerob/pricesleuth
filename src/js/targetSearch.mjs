export function targetProductCardTemplate(product) {
  return `<li class="product-card">
  <a class="product-link" href="${product.parent.item.enrichment.buy_url}">
  <h4 class="product-title">${product.parent.item.product_description.title}</h4>
  <img class="product-image" src="${product.parent.item.enrichment.images.primary_image_url}" alt="image of ${product.parent.item.product_description.title}" loading="lazy">
    <p class="product-price">${product.parent.price.formatted_current_price}</p>
  </a>
</li>`;
}

export function extractTargetArray(json) {
  return json.data.search.products;
}
