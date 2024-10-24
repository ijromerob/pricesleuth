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
