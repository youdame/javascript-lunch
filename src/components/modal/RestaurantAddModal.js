import createDOMElement from '../../util/createDomElement.js';
import Modal from '../Modal.js';
import RestaurantAddModalForm from './RestaurantAddModalForm.js';

function RestaurantAddModal() {
  return Modal({
    content: createDOMElement({
      tag: 'div',
      className: 'modal-container',
      children: [
        createDOMElement({
          tag: 'h2',
          className: 'modal-title text-title',
          textContent: '새로운 음식점'
        }),
        RestaurantAddModalForm()
      ]
    })
  });
}

export default RestaurantAddModal;
