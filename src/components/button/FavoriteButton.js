import { updateFavoriteStatus, isRestaurantFavorite } from '../../favorite.ts';
import createDOMElement from '../../util/createDomElement.js';
import { $ } from '../../util/selector.js';
import { filterAndSortRestaurants } from '../dropdown/DropdownContainer.ts';
import RestaurantList from '../restaurant/RestaurantList.js';

function FavoriteButton({ name }) {
  console.log(`🎯 FavoriteButton 렌더링: ${name}`);

  const imgElement = createDOMElement({
    tag: 'img',
    className: 'favorite-icon',
    src: 'images/favorite-icon-lined.png',
    alt: '즐겨찾기',
    onClick: async (event) => {
      console.log(`⭐ ${name} 클릭됨`);
      await toggleFavoriteIcon(event, name);
    }
  });

  // ✅ 좋아요 상태 업데이트 함수
  async function updateFavoriteIcon() {
    const isFavorite = await isRestaurantFavorite(name);
    console.log(`📌 좋아요 상태 업데이트 (${name}): ${isFavorite}`);
    imgElement.src = isFavorite ? 'images/favorite-icon-filled.png' : 'images/favorite-icon-lined.png';
  }

  // ✅ 초기 좋아요 상태 반영
  updateFavoriteIcon();

  return createDOMElement({
    tag: 'div',
    className: 'restaurant__star',
    children: [imgElement],
    updateFavoriteIcon // ✅ updateFavoriteIcon을 함수로 전달
  });
}

export default FavoriteButton;

// ✅ 좋아요 상태를 변경한 후 리스트 & 모달 UI 업데이트
async function toggleFavoriteIcon(event, name) {
  event.stopPropagation(); // 모달 열림 방지

  await updateFavoriteStatus(name);

  // ✅ 리스트 전체를 다시 렌더링해서 UI 반영
  renderRestaurantList();

  // ✅ 현재 열려 있는 모달 내부 버튼도 업데이트
  updateModalFavoriteIcon(name);
}

// ✅ 모달 내부 좋아요 아이콘을 업데이트하는 함수
async function updateModalFavoriteIcon(name) {
  const modalFavoriteIcon = $('.modal .favorite-icon'); // 모달 내부의 좋아요 버튼 찾기
  if (!modalFavoriteIcon) {
    return;
  }

  const isFavorite = await isRestaurantFavorite(name);
  modalFavoriteIcon.src = isFavorite ? 'images/favorite-icon-filled.png' : 'images/favorite-icon-lined.png';

  console.log(`🔄 모달 내 좋아요 버튼 업데이트: ${isFavorite ? '❤️' : '🤍'}`);
}

// ✅ 음식점 리스트를 다시 렌더링하는 함수
export async function renderRestaurantList() {
  console.log('🔄 리스트 다시 렌더링 중...');

  const restaurantListContainer = $('.restaurant-list-container');
  if (!restaurantListContainer) {
    console.error('❌ restaurant-list-container가 없음');
    return;
  }

  // ✅ 기존 리스트 삭제
  restaurantListContainer.innerHTML = '';

  // ✅ 새 음식점 데이터 가져오기
  const restaurants = await filterAndSortRestaurants();

  // ✅ 새로운 리스트 생성 및 추가
  const newList = RestaurantList({ restaurants });
  restaurantListContainer.appendChild(newList);

  console.log('✅ 리스트 업데이트 완료');
}
