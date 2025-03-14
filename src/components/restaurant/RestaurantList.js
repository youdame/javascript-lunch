import createDOMElement from '../../util/createDomElement.js';
import RestaurantIcon from './RestaurantIcon.js';
import RestaurantItem from './RestaurantItem.js';

function RestaurantList({ restaurants }) {
  console.log(restaurants);
  console.log(
    restaurants.map((restaurant) => RestaurantItem({ ...restaurant, icon: RestaurantIcon(restaurant.icon) }))
  );
  return createDOMElement({
    tag: 'section',
    className: 'restaurant-list-container',
    children: [
      createDOMElement({
        tag: 'ul',
        className: 'restaurant-list',
        children: restaurants.map((restaurant) =>
          RestaurantItem({ ...restaurant, icon: RestaurantIcon(restaurant.icon) })
        )
      })
    ]
  });
}

export default RestaurantList;
