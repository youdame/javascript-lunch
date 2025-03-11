import createDOMElement from '../../util/createDomElement.js';

function ActionButton({ text, ...attribute }) {
  return createDOMElement({
    tag: 'button',
    className: 'button button--secondary text-caption',
    textContent: text,
    ...attribute
  });
}

export default ActionButton;
