import createDOMElement from '../../util/createDomElement.js';
import DetailModal from '../modal/DetailModal.js';
import Modal from '../Modal.js';
function RestaurantItem({ name, distance, description, icon, link, category }) {
  return createDOMElement({
    tag: 'li',
    className: 'restaurant',
    children: [
      createDOMElement({
        tag: 'div',
        className: 'restaurant__category',
        children: [icon]
      }),
      createDOMElement({
        tag: 'div',
        className: 'restaurant__info',
        children: [
          createDOMElement({
            tag: 'h3',
            className: 'restaurant__name text-subtitle',
            textContent: name
          }),
          createDOMElement({
            tag: 'span',
            className: 'restaurant__distance text-body',
            textContent: `캠퍼스부터 ${distance}분 내`
          }),
          createDOMElement({
            tag: 'p',
            className: 'restaurant__description text-body',
            textContent: description
          })
        ]
      })
    ],
    onClick: () => {
      Modal.open(DetailModal({ name, distance, description, link, icon }));
    }
  });
}

export default RestaurantItem;
