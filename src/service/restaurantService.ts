import { getLocalStorage, removeItemFromLocalStorage, setLocalStorage } from '../util/localStorage';
import { Restaurant } from '../type';

const RESTAURANT_KEY = 'restaurantData';

export async function getAllRestaurants(): Promise<Restaurant[]> {
  return getLocalStorage<Restaurant[]>(RESTAURANT_KEY, []);
}

export async function addRestaurant(newRestaurant: Restaurant): Promise<void> {
  const storedRestaurants = await getAllRestaurants();
  storedRestaurants.push(newRestaurant);
  setLocalStorage(RESTAURANT_KEY, storedRestaurants);
}

export async function removeRestaurant(id: number): Promise<void> {
  removeItemFromLocalStorage<Restaurant>(RESTAURANT_KEY, (restaurant) => restaurant.id !== id);
}
