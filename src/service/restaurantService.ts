import { getLocalStorage, setLocalStorage, removeItemFromLocalStorage } from '../util/localStorage';
import { Restaurant } from '../type';
import { FAVORITE_KEY, RESTAURANT_KEY } from '../components/constant/localStorage';
const DATA_URL = 'data/restaurants.json';

async function loadInitialRestaurants(): Promise<Restaurant[]> {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error('네트워크 오류 발생');
    return await response.json();
  } catch (error) {
    console.error('❌ 초기 음식점 데이터를 불러오는 데 실패했습니다:', error);
    return [];
  }
}

export async function getAllRestaurants(): Promise<Restaurant[]> {
  let restaurants = getLocalStorage<Restaurant[]>(RESTAURANT_KEY, []);

  if (restaurants.length === 0) {
    restaurants = await loadInitialRestaurants();
    setLocalStorage(RESTAURANT_KEY, restaurants);
  }

  return restaurants;
}

export async function addRestaurant(newRestaurant: Restaurant): Promise<void> {
  const storedRestaurants = await getAllRestaurants();
  storedRestaurants.push(newRestaurant);
  setLocalStorage(RESTAURANT_KEY, storedRestaurants);
}

export async function removeRestaurant(id: number): Promise<void> {
  removeItemFromLocalStorage<Restaurant>(RESTAURANT_KEY, (restaurant) => restaurant.id !== id);

  removeItemFromLocalStorage<number>(FAVORITE_KEY, (favId) => favId !== id);

  const restaurantItem = document.querySelector(`.restaurant[data-id="${id}"]`);
  if (restaurantItem) {
    restaurantItem.remove();
  }
}
