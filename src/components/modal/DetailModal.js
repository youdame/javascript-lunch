import ActionButton from '../button/ActionButton.js';
import CTAButton from '../button/CTAButton.js';
import createDOMElement from '../../util/createDomElement.js';
import Modal from '../Modal.js';
// import { toggleFavoriteIcon } from '../restaurant/RestaurantItem.js';
function DetailModal({ name, distance, description, link, icon }) {
  return createDOMElement({
    tag: 'div',
    className: 'modal-container detail-modal',
    children: [
      icon,
      createDOMElement({
        tag: 'h3',
        className: 'restaurant__name text-subtitle',
        textContent: name
      }),
      createDOMElement({
        tag: 'button-container',
        className: 'star',
        children: [
          createDOMElement({
            tag: 'img',
            className: 'favorite-icon',
            src: 'images/favorite-icon-lined.png',
            alt: '즐겨찾기'
            // onClick: toggleFavoriteIcon
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
        className: 'text-body',
        textContent: description
      }),
      createDOMElement({
        tag: 'a',
        className: 'modal-link text-body',
        href: link,
        textContent: link,
        target: '_blank'
      }),
      createDOMElement({
        tag: 'div'
      }),
      createDOMElement({
        tag: 'div',
        className: 'button-container',
        children: [
          ActionButton({
            text: '삭제하기',
            onClick: () => {
              Modal.close();
            }
          }),
          CTAButton({ text: '닫기', onClick: () => Modal.close() })
        ]
      })
    ]
  });
}

export default DetailModal;
