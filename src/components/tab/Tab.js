import createDOMElement from '../../util/createDomElement.js';
import { $ } from '../../util/selector.js';

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

  return tabContainer;
}

export default Tab;

function toggleRestaurantTab(event) {
  const allTab = $('.all-restaurant-tab');
  const favoriteTab = $('.favorite-restaurant-tab');

  allTab.classList.remove('active-tab');
  favoriteTab.classList.remove('active-tab');

  event.target.classList.add('active-tab');

  updateIndicatorPosition(event.target);
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
