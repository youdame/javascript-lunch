import createDOMElement from '../../util/createDomElement.js';
import { $ } from '../../util/selector.js';
import { getAllRestaurants, getFavoriteRestaurants } from '../../favorite.ts';
import RestaurantList from '../restaurant/RestaurantList.js';

function Tab() {
  const tabContainer = createDOMElement({
    tag: 'div',
    className: 'tab-container',
    children: [
      createDOMElement({
        tag: 'div',
        className: 'tab-list',
        children: [
          createDOMElement({
            tag: 'button',
            className: 'tab-button active-tab text-subtitle all-restaurant-tab',
            textContent: '모든 음식점',
            onClick: toggleRestaurantTab
          }),
          createDOMElement({
            tag: 'button',
            className: 'tab-button text-subtitle favorite-restaurant-tab',
            textContent: '자주 가는 음식점',
            onClick: toggleRestaurantTab
          }),
          createDOMElement({
            tag: 'div',
            className: 'tab-indicator'
          })
        ]
      })
    ]
  });

  requestAnimationFrame(setInitialIndicatorPosition);
  renderRestaurantList(); // 초기 리스트 렌더링

  return tabContainer;
}

export default Tab;

async function toggleRestaurantTab(event) {
  const allTab = $('.all-restaurant-tab');
  const favoriteTab = $('.favorite-restaurant-tab');

  allTab.classList.remove('active-tab');
  favoriteTab.classList.remove('active-tab');

  event.target.classList.add('active-tab');
  updateIndicatorPosition(event.target);

  const isFavoriteTab = event.target.classList.contains('favorite-restaurant-tab');
  await renderRestaurantList(isFavoriteTab);
}

function setInitialIndicatorPosition() {
  const activeTab = $('.active-tab');
  if (activeTab) {
    updateIndicatorPosition(activeTab);
  }
}

function updateIndicatorPosition(targetTab) {
  const indicator = $('.tab-indicator');
  const tabRect = targetTab.getBoundingClientRect();
  const tabListRect = $('.tab-list').getBoundingClientRect();

  indicator.style.width = `${tabRect.width}px`;
  indicator.style.transform = `translateX(${tabRect.left - tabListRect.left}px)`;
}

async function renderRestaurantList(showFavorites = false) {
  const restaurantListContainer = $('.restaurant-list-container');
  if (!restaurantListContainer) {
    return;
  }

  restaurantListContainer.innerHTML = '';

  const restaurants = showFavorites ? await getFavoriteRestaurants() : await getAllRestaurants();

  const newList = RestaurantList({ restaurants });
  restaurantListContainer.appendChild(newList);
}
