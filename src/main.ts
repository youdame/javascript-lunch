import Header from './components/Header.js';
import PlusButton from './components/button/PlusButton.js';
import RestaurantAddModal from './components/modal/RestaurantAddModal.js';
import RestaurantIcon from './components/restaurant/RestaurantIcon.js';
import RestaurantItem from './components/restaurant/RestaurantItem.js';
import RestaurantList from './components/restaurant/RestaurantList.js';
import { $ } from './util/selector.js';
import DropdownContainer, { filterAndSortRestaurants } from './components/Dropdown/DropdownContainer.js';

addEventListener('load', () => {
  renderHeader();
  renderFilter();
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

  main.appendChild(RestaurantList({ restaurants: filterAndSortRestaurants() }));
};

const renderModal = () => {
  const main = $('main');

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const { name, distance, description, category } = Object.fromEntries(formData.entries());
    const item = RestaurantItem({
      name,
      distance,
      description,
      icon: RestaurantIcon({ src: `images/category-${category}.png`, alt: category })
    });

    document.querySelector('.restaurant-list')?.appendChild(item);

    form.reset();
  };
  const modal = RestaurantAddModal({ onSubmit: handleSubmit });

  main.appendChild(modal.modal);

  const plusButton = $('.gnb__button');
  plusButton.addEventListener('click', () => modal.open());
};

const renderFilter = (): void => {
  const main = $('main');
  main.prepend(DropdownContainer());
};
