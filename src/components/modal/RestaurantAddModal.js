import createDOMElement from '../../util/createDomElement.js';
import modalInstance from '../Modal.js'; // ✅ 하나의 모달 인스턴스를 재사용
import RestaurantAddModalForm from './RestaurantAddModalForm.js';

function RestaurantAddModal({ onSubmit }) {
  return createDOMElement({
    tag: 'div',
    className: 'modal-container',
    children: [
      createDOMElement({
        tag: 'h2',
        className: 'modal-title text-title',
        textContent: '새로운 음식점'
      }),
      RestaurantAddModalForm({
        onClose: () => modalInstance.close(),
        onSubmit: (e) => {
          onSubmit(e);
          modalInstance.close();
        }
      })
    ]
  });
}

export default RestaurantAddModal;
