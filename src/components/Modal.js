import createDOMElement from '../util/createDomElement.js';
import { lockScroll, unlockScroll } from '../util/scroll.js';

function Modal({ content }) {
  const modal = createDOMElement({
    tag: 'div',
    className: 'modal',
    children: [
      createDOMElement({
        tag: 'div',
        className: 'modal-backdrop'
      }),
      content
    ]
  });

  function open() {
    modal.classList.add('modal--open');
    lockScroll();
    document.addEventListener('keydown', handleEscKey);
  }

  function close() {
    modal.classList.remove('modal--open');
    unlockScroll();
    document.removeEventListener('keydown', handleEscKey);
  }

  function handleEscKey(event) {
    if (event.key === 'Escape') {
      close();
    }
  }

  modal.querySelector('.modal-backdrop').addEventListener('click', close);

  return { modal, open, close };
}

export default Modal;
