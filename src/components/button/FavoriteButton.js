import { updateFavoriteStatus } from '../../favorite.ts';
import createDOMElement from '../../util/createDomElement.js';

function FavoriteButton(restaurantName, isFavorite) {
  const imgElement = createDOMElement({
    tag: 'img',
    className: 'favorite-icon',
    src: isFavorite ? 'images/favorite-icon-filled.png' : 'images/favorite-icon-lined.png',
    alt: '즐겨찾기',
    onClick: (event) => toggleFavoriteIcon(event, restaurantName, imgElement)
  });

  return createDOMElement({
    tag: 'div',
    className: 'restaurant__star',
    children: [imgElement]
  });
}

export default FavoriteButton;

async function toggleFavoriteIcon(event, restaurantName, imgElement) {
  event.stopPropagation();

  const isFavorite = await updateFavoriteStatus(restaurantName);

  imgElement.src = isFavorite ? 'images/favorite-icon-filled.png' : 'images/favorite-icon-lined.png';
}
