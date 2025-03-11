import Header from './components/Header.js';
import PlusButton from './components/button/PlusButton.js';
import RestaurantAddModal from './components/modal/RestaurantAddModal.js';
import RestaurantList from './components/restaurant/RestaurantList.js';
import { $ } from './util/selector.js';

addEventListener('load', () => {
  renderHeader();
  renderRestaurantList();
  renderModal();
});

const renderHeader = () => {
  const body = $('body');
  const header = Header({ title: '점심 뭐 먹지', right: PlusButton() });
  body.prepend(header);
};

const renderRestaurantList = () => {
  const main = $('main');
  main.appendChild(RestaurantList());
};

const renderModal = () => {
  const main = $('main');
  const modal = RestaurantAddModal();

  main.appendChild(modal.modal);

  const plusButton = $('.gnb__button');
  plusButton.addEventListener('click', () => modal.open());
};
