import createDOMElement from '../../util/createDomElement.js';

function PlusButton() {
  return createDOMElement({
    tag: 'button',
    type: 'button',
    className: 'gnb__button',
    'aria-label': '음식점 추가',
    children: [
      createDOMElement({
        tag: 'img',
        src: 'images/add-button.png',
        alt: '음식점 추가'
      })
    ]
  });
}

export default PlusButton;
