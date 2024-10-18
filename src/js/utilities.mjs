/**
 * Load Template function: fetches and returns the template as text
 * @param {string} path is the path for the template that want's to be fetched
 * @returns
 */
async function loadTemplate(path) {
  try {
    const response = await fetch(path);
    if (response.ok) {
      const template = await response.text();
      return template;
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * This function loads the header, footer and navigation
 * it uses render with template to enforce this
 */
async function loadHeaderFooterNav() {
  // loads the html contained in these files and translates them into string
  const footerTemplate = await loadTemplate('../partials/footer.html');
  const headerTemplate = await loadTemplate('../partials/header.html');
  const navigationTemplate = await loadTemplate('../partials/navigation.html');

  // Selects in the index element the places where I want to render the partials
  const footerElement = document.querySelector('#footerPartial');
  const headerElement = document.querySelector('#headerPartial');
  const navigationElement = document.querySelector('#navigationPartial');

  renderWithTemplate(footerTemplate, footerElement);
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(navigationTemplate, navigationElement);
}

/**
 * renderWithTemplate takes an html(string template) and then renders it with insertAdjacentHTML
 * @param {*} template this is the template or string that will be used to be rendered inside of the parent element
 * @param {*} parentElement this is the element where the template will be rendered
 * @param {*} position this is how it will be rendered. after begin means inside of the element.
 */
function renderWithTemplate(template, parentElement, position = 'afterbegin') {
  parentElement.insertAdjacentHTML(position, template);
}

export { loadHeaderFooterNav, renderWithTemplate };
