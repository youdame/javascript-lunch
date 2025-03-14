import createDOMElement from '../../util/createDomElement.js';
import DetailModal from '../modal/DetailModal.js';
import Modal from '../Modal.js';
// import { updateFavoriteStatus } from '../../favorite.ts';
function RestaurantItem({ name, distance, description, icon, link, category, isFavorite = false }) {
  const FavoriteIcon = createDOMElement({
    tag: 'img',
    className: 'favorite-icon',
    src: isFavorite ? 'images/favorite-icon-filled.png' : 'images/favorite-icon-lined.png', // ✅ 초기 상태 반영
    alt: '즐겨찾기'
    // onClick: (event) => toggleFavoriteIcon(event, name, FavoriteIcon) // ✅ 아이콘 상태 업데이트
  });

  return createDOMElement({
    tag: 'li',
    className: 'restaurant',
    children: [
      createDOMElement({
        tag: 'div',
        className: 'restaurant__category'
        // children: [icon]
      }),
      createDOMElement({
        tag: 'div',
        className: 'restaurant__info',
        children: [
          createDOMElement({
            tag: 'h3',
            className: 'restaurant__name text-subtitle',
            textContent: name
          }),
          createDOMElement({
            tag: 'div',
            className: 'restaurant__star'
            // children: [FavoriteIcon] // ✅ 버튼이 아닌 이미지 자체를 추가
          }),
          createDOMElement({
            tag: 'span',
            className: 'restaurant__distance text-body',
            textContent: `캠퍼스부터 ${distance}분 내`
          }),
          createDOMElement({
            tag: 'p',
            className: 'restaurant__description text-body',
            textContent: description
          })
        ]
      })
    ],
    onClick: () => {
      Modal.open(DetailModal({ name, distance, description, link, icon }));
    }
  });
}

export default RestaurantItem;

// // ✅ 즐겨찾기 토글 함수 (비동기 처리)
// export async function toggleFavoriteIcon(event, restaurantName, imgElement) {
//   event.stopPropagation(); // 모달이 열리지 않도록 이벤트 전파 방지

//   const isFavorite = await updateFavoriteStatus(restaurantName);
//   imgElement.src = isFavorite ? 'images/favorite-icon-filled.png' : 'images/favorite-icon-lined.png';
// }
