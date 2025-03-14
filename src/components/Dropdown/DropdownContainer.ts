import createDOMElement from '../../util/createDomElement.js';
import { $ } from '../../util/selector.js';
import CategoryDropdown from './CategoryDropdown.js';
import SortingDropdown from './SortingDropdown.js';
import restaurantsData from '../../../public/data/restaurants.json';
import RestaurantList from '../restaurant/RestaurantList.js';
import { CategoryOption, SortOption } from './type.ts';

function DropdownContainer() {
  return createDOMElement({
    tag: 'section',
    className: 'restaurant-filter-container',
    children: [
      CategoryDropdown({
        onChange: (e: Event) => {
          const target = e.target as HTMLSelectElement;
          handleCategoryChange(target.value);
        }
      }),
      SortingDropdown({
        onChange: (e: Event) => {
          const target = e.target as HTMLSelectElement;
          handleSortingChange(target.value);
        }
      })
    ]
  });
}

const handleCategoryChange = (category: CategoryOption = '전체'): void => {
  const sortingSelect = $('#sorting-filter') as HTMLSelectElement;
  const sortBy = sortingSelect?.value || '이름순';
  filterAndSortRestaurants(category, sortBy);
};

const handleSortingChange = (sortBy: SortOption = '이름순'): void => {
  const categorySelect = $('#category-filter') as HTMLSelectElement;
  const category = categorySelect?.value || '전체';
  filterAndSortRestaurants(category, sortBy);
};

export const filterAndSortRestaurants = (category?: CategoryOption, sortBy?: SortOption) => {
  const selectedCategory = category || '전체';
  const selectedSortBy = sortBy || '이름순';

  const filteredRestaurants = restaurantsData
    .filter((restaurant) => selectedCategory === '전체' || restaurant.category === selectedCategory)
    .sort((a, b) => (selectedSortBy === '이름순' ? a.name.localeCompare(b.name) : a.distance - b.distance));

  const restaurantListContainer = $('.restaurant-list-container');
  if (restaurantListContainer) {
    restaurantListContainer.replaceWith(RestaurantList({ restaurants: filteredRestaurants }));
  }
  return filteredRestaurants;
};

export default DropdownContainer;
