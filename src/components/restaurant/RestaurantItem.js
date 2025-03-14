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
            tag: 'button-container',
            className: 'restaurant__star',
            children: [
              createDOMElement({
                tag: 'img',
                className: 'favorite-icon',
                src: 'images/favorite-icon-lined.png',
                alt: '즐겨찾기',
                onClick: toggleFavoriteIcon
              })
            ]
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

function toggleFavoriteIcon(event) {
  event.stopPropagation();
  const icon = event.target;
  const isFavorite = icon.src.includes('favorite-icon-filled.png');
  icon.src = isFavorite ? 'images/favorite-icon-lined.png' : 'images/favorite-icon-filled.png';
}
