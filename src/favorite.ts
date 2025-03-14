const FAVORITE_KEY = 'favoriteRestaurants';
const DATA_URL = '/data/restaurants.json';
const RESTAURANT_KEY = 'restaurantData';

interface Restaurant {
  id: number;
  name: string;
  distance: number;
  description: string;
  icon: {
    src: string;
    alt: string;
  };
  category: string;
  link: string;
  isFavorite: boolean;
}

async function loadInitialRestaurants(): Promise<Restaurant[]> {
  try {
    const response = await fetch(DATA_URL);
    console.log(response);
    if (!response.ok) throw new Error('네트워크 오류 발생');
    return await response.json();
  } catch (error) {
    console.error('초기 음식점 데이터를 불러오는 데 실패했습니다:', error);
    return [];
  }
}

export async function getAllRestaurants(): Promise<Restaurant[]> {
  try {
    const storedRestaurants = localStorage.getItem(RESTAURANT_KEY);
    if (storedRestaurants) return JSON.parse(storedRestaurants) || [];

    const initialRestaurants = await loadInitialRestaurants();

    localStorage.setItem(RESTAURANT_KEY, JSON.stringify(initialRestaurants));
    return initialRestaurants;
  } catch (error) {
    console.error('음식점 데이터를 불러오는 중 오류 발생:', error);
    return [];
  }
}

export async function getFavoriteRestaurants(): Promise<Restaurant[]> {
  const storedFavorites = localStorage.getItem(FAVORITE_KEY);
  if (!storedFavorites) return [];

  const favoriteIds: number[] = JSON.parse(storedFavorites) || [];
  const allRestaurants = await getAllRestaurants();

  return allRestaurants.filter((restaurant) => favoriteIds.includes(restaurant.id));
}

export async function isRestaurantFavorite(id: number): Promise<boolean> {
  const favorites = await getFavoriteRestaurants();
  return favorites.some((restaurant) => restaurant.id === id);
}

export async function updateFavoriteStatus(id: number): Promise<boolean> {
  const storedFavorites: number[] = JSON.parse(localStorage.getItem(FAVORITE_KEY) || '[]');

  const isFavorite = storedFavorites.includes(id);

  const updatedFavorites: number[] = isFavorite
    ? storedFavorites.filter((favId: number) => favId !== id)
    : [...storedFavorites, id];

  localStorage.setItem(FAVORITE_KEY, JSON.stringify(updatedFavorites));

  return !isFavorite;
}

export async function removeRestaurant(id: number) {
  let allRestaurants = await getAllRestaurants();
  allRestaurants = allRestaurants.filter((restaurant) => restaurant.id !== id);
  localStorage.setItem('restaurantData', JSON.stringify(allRestaurants));

  let favoriteRestaurants = await getFavoriteRestaurants();
  favoriteRestaurants = favoriteRestaurants.filter((restaurant) => restaurant.id !== id);
  localStorage.setItem('favoriteRestaurants', JSON.stringify(favoriteRestaurants));

  const restaurantItem = document.querySelector(`.restaurant[data-id="${id}"]`);
  if (restaurantItem) {
    restaurantItem.remove();
  }
}
