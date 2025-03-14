import { getLocalStorage, setLocalStorage } from '../util/localStorage';
import { getAllRestaurants } from './restaurantService';
import { Restaurant } from '../type';
import { FAVORITE_KEY } from '../components/constant/localStorage';

export async function getFavoriteRestaurants(): Promise<Restaurant[]> {
  const favoriteIds = getLocalStorage<number[]>(FAVORITE_KEY, []);
  const allRestaurants = await getAllRestaurants();
  return allRestaurants.filter((restaurant) => favoriteIds.includes(restaurant.id));
}

export async function isRestaurantFavorite(id: number): Promise<boolean> {
  const favoriteIds = getLocalStorage<number[]>(FAVORITE_KEY, []);
  return favoriteIds.includes(id);
}

export async function updateFavoriteStatus(id: number): Promise<boolean> {
  const favoriteIds = getLocalStorage<number[]>(FAVORITE_KEY, []);
  const updatedFavorites = favoriteIds.includes(id)
    ? favoriteIds.filter((favId) => favId !== id)
    : [...favoriteIds, id];

  setLocalStorage(FAVORITE_KEY, updatedFavorites);
  return updatedFavorites.includes(id);
}
