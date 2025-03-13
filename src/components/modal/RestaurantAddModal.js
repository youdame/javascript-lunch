import createDOMElement from '../../util/createDomElement.js';
import { $ } from '../../util/selector.js';
import Modal from '../Modal.js';

import RestaurantAddModalForm from './RestaurantAddModalForm.js';

function RestaurantAddModal({ onSubmit }) {
  const modal = new Modal({
    content: createDOMElement({
      tag: 'div',
      className: 'modal-container',
      children: [
        createDOMElement({
          tag: 'h2',
          className: 'modal-title text-title',
          textContent: '새로운 음식점'
        }),
        RestaurantAddModalForm({
          onClose: () => modal.close(),
          onSubmit: (e) => {
            onSubmit(e);
            modal.close();
          }
        })
      ]
    })
  });

  return modal;
}

export default RestaurantAddModal;
