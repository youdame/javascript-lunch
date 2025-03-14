const FAVORITE_KEY = 'favoriteRestaurants';
const DATA_URL = '/data/restaurants.json';
const RESTAURANT_KEY = 'restaurantData';

// ✅ 음식점 데이터 타입 정의
interface Restaurant {
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

// ✅ JSON에서 초기 데이터를 가져오는 함수
async function loadInitialRestaurants(): Promise<Restaurant[]> {
  try {
    const response = await fetch(DATA_URL);
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

// ✅ JSON에서 초기 즐겨찾기 데이터를 가져오는 함수
async function loadInitialFavorites(): Promise<string[]> {
  const restaurants = await loadInitialRestaurants();
  return restaurants.filter((restaurant) => restaurant.isFavorite).map((restaurant) => restaurant.name);
}

// ✅ 로컬스토리지에서 즐겨찾기 목록 가져오기 (없으면 JSON 초기값 반영)
export async function getFavoriteRestaurants(): Promise<string[]> {
  const storedFavorites = localStorage.getItem(FAVORITE_KEY);
  if (storedFavorites) return JSON.parse(storedFavorites);

  const initialFavorites = await loadInitialFavorites();
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(initialFavorites));
  return initialFavorites;
}

// ✅ 음식점이 즐겨찾기에 있는지 확인하는 함수
export async function isRestaurantFavorite(name: string): Promise<boolean> {
  const favorites = await getFavoriteRestaurants();
  return favorites.includes(name);
}

// ✅ 즐겨찾기 상태를 토글하는 함수
export async function updateFavoriteStatus(name: string): Promise<boolean> {
  const favorites = await getFavoriteRestaurants();
  const updatedFavorites = favorites.includes(name) ? favorites.filter((fav) => fav !== name) : [...favorites, name];

  localStorage.setItem(FAVORITE_KEY, JSON.stringify(updatedFavorites));
  return updatedFavorites.includes(name);
}
