import Header from './components/Header.js';
import PlusButton from './components/button/PlusButton.js';
import RestaurantAddModal from './components/modal/RestaurantAddModal.js';
import RestaurantIcon from './components/restaurant/RestaurantIcon.js';
import RestaurantItem from './components/restaurant/RestaurantItem.js';
import RestaurantList from './components/restaurant/RestaurantList.js';
import { $ } from './util/selector.js';
import DropdownContainer, { filterAndSortRestaurants } from './components/dropdown/DropdownContainer.js';
import Tab from './components/tab/Tab.js';
import modalInstance from '../src/components/Modal.js';

addEventListener('load', () => {
  renderHeader();
  renderTab();
  renderFilter();

  renderRestaurantList();
  renderModal();
});

const renderHeader = () => {
  const body = $('body');
  const header = Header({ title: '점심 뭐 먹지', right: PlusButton() });
  body.prepend(header);
};

const renderTab = () => {
  const main = $('main');

  main.prepend(Tab());
};
const renderRestaurantList = async () => {
  const main = $('main');
  const restaurants = await filterAndSortRestaurants();

  main.appendChild(RestaurantList({ restaurants }));
};

const renderFilter = (): void => {
  const main = $('main');
  main.appendChild(DropdownContainer());
};

const renderModal = () => {
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const { name, distance, description, category, link } = Object.fromEntries(formData.entries());
    const item = RestaurantItem({
      name,
      distance,
      description,
      icon: RestaurantIcon({ src: `images/category-${category}.png`, alt: category }),
      link,
      category
    });

    document.querySelector('.restaurant-list')?.appendChild(item);

    form.reset();
  };

  const plusButton = $('.gnb__button');
  plusButton.addEventListener('click', () => modalInstance.open(RestaurantAddModal({ onSubmit: handleSubmit })));
};
