import createDOMElement from '../util/createDomElement.js';

function Header({ title, right }) {
  return createDOMElement({
    tag: 'header',
    className: 'gnb',
    children: [
      createDOMElement({
        tag: 'h1',
        className: 'gnb__title text-title',
        textContent: title
      }),
      right
    ]
  });
}

export default Header;
