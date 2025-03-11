import createDOMElement from '../util/createDomElement.js';
import { lockScroll, unlockScroll } from '../util/scroll.js';

class Modal {
  constructor({ content }) {
    this.modal = createDOMElement({
      tag: 'div',
      className: 'modal',
      children: [
        createDOMElement({
          tag: 'div',
          className: 'modal-backdrop',
          onclick: () => this.close()
        }),
        content
      ]
    });

    document.body.appendChild(this.modal);
    this.handleEscKey = this.#handleEscKey.bind(this);
  }

  open() {
    this.modal.classList.add('modal--open');
    lockScroll();
    document.addEventListener('keydown', this.#handleEscKey);
  }

  close() {
    this.modal.classList.remove('modal--open');
    unlockScroll();
    document.removeEventListener('keydown', this.#handleEscKey);
  }

  #handleEscKey(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  destroy() {
    this.close();
    this.modal.remove();
  }
}

export default Modal;
