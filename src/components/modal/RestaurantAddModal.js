import createDOMElement from '../../util/createDomElement.js';
import { $ } from '../../util/selector.js';
import Modal from '../Modal.js';
import RestaurantIcon from '../restaurant/RestaurantIcon.js';
import RestaurantItem from '../restaurant/RestaurantItem.js';
import RestaurantAddModalForm from './RestaurantAddModalForm.js';

function RestaurantAddModal() {
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
            handleSubmit(e);
            modal.close();
          }
        })
      ]
    })
  });

  return modal;
}

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { name, distance, description, category } = Object.fromEntries(formData.entries());

  const item = RestaurantItem({
    name,
    distance,
    description,
    icon: RestaurantIcon({ src: `images/category-${category}.png`, alt: category })
  });

  $('.restaurant-list').appendChild(item);

  e.target.reset();
};

export default RestaurantAddModal;
