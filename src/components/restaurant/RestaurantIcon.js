import createDOMElement from '../../util/createDomElement.js';

function RestaurantIcon({ src, alt }) {
  return createDOMElement({
    tag: 'img',
    src,
    alt,
    className: 'category-icon'
  });
}

export default RestaurantIcon;
