var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _Modal_instances, createModal_fn, handleEscKey_fn;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const createDOMElement = ({ tag, children, ...props }) => {
  if (!tag) {
    throw new Error("Tag is required");
  }
  const element = document.createElement(tag);
  Object.entries(props).forEach(([key, value]) => {
    if (key.startsWith("on") && typeof value === "function") {
      const eventName = key.slice(2).toLowerCase();
      element.addEventListener(eventName, value);
    } else if (key === "attributes" && typeof value === "object") {
      Object.entries(value).forEach(([attrName, attrValue]) => {
        element.setAttribute(attrName, attrValue);
      });
    } else {
      element[key] = value;
    }
  });
  if (children) {
    children.forEach((child) => {
      element.appendChild(child);
    });
  }
  return element;
};
function Header({ title, right }) {
  return createDOMElement({
    tag: "header",
    className: "gnb",
    children: [
      createDOMElement({
        tag: "h1",
        className: "gnb__title text-title",
        textContent: title
      }),
      right
    ]
  });
}
function PlusButton() {
  return createDOMElement({
    tag: "button",
    type: "button",
    className: "gnb__button",
    "aria-label": "음식점 추가",
    children: [
      createDOMElement({
        tag: "img",
        src: "images/add-button.png",
        alt: "음식점 추가"
      })
    ]
  });
}
const lockScroll = () => {
  const body = document.body;
  body.style.overflow = "hidden";
};
const unlockScroll = () => {
  const body = document.body;
  body.style.overflow = "auto";
};
function $(selector) {
  return document.querySelector(selector);
}
function $all(selector) {
  return document.querySelectorAll(selector);
}
class Modal {
  constructor() {
    __privateAdd(this, _Modal_instances);
    this.modal = $(".modal") || __privateMethod(this, _Modal_instances, createModal_fn).call(this);
    this.content = this.modal.querySelector(".modal-content");
    this.handleEscKey = __privateMethod(this, _Modal_instances, handleEscKey_fn).bind(this);
  }
  open(content) {
    this.content.innerHTML = "";
    this.content.appendChild(content);
    this.modal.classList.add("modal--open");
    lockScroll();
    document.addEventListener("keydown", this.handleEscKey);
  }
  close() {
    this.modal.classList.remove("modal--open");
    unlockScroll();
    document.removeEventListener("keydown", this.handleEscKey);
    this.content.innerHTML = "";
  }
}
_Modal_instances = new WeakSet();
createModal_fn = function() {
  const modal = createDOMElement({
    tag: "div",
    className: "modal",
    children: [
      createDOMElement({
        tag: "div",
        className: "modal-backdrop",
        onClick: () => this.close()
      }),
      createDOMElement({
        tag: "div",
        className: "modal-content"
      })
    ]
  });
  document.body.appendChild(modal);
  return modal;
};
handleEscKey_fn = function(event) {
  if (event.key === "Escape") {
    this.close();
  }
};
const modalInstance = new Modal();
const CATEGORY_OPTIONS$1 = [
  { value: "", option: "선택해 주세요" },
  { value: "korean", option: "한식" },
  { value: "chinese", option: "중식" },
  { value: "japanese", option: "일식" },
  { value: "western", option: "양식" },
  { value: "asian", option: "아시안" },
  { value: "etc", option: "기타" }
];
const DISTANCE_OPTIONS = [
  { value: "", option: "선택해 주세요" },
  { value: "5", option: "5분 내" },
  { value: "10", option: "10분 내" },
  { value: "15", option: "15분 내" },
  { value: "20", option: "20분 내" },
  { value: "30", option: "30분 내" }
];
function ActionButton({ text, ...attribute }) {
  return createDOMElement({
    tag: "button",
    className: "button button--secondary text-caption",
    textContent: text,
    ...attribute
  });
}
function CTAButton({ text, ...attribute }) {
  return createDOMElement({
    tag: "button",
    className: "button button--primary text-caption",
    textContent: text,
    ...attribute
  });
}
function Root({ label, input, caption }) {
  return createDOMElement({
    tag: "div",
    className: "form-item form-item--required",
    children: [label, input, caption].filter(Boolean)
  });
}
function Label({ text, className, ...attribute }) {
  return createDOMElement({
    tag: "label",
    textContent: text,
    className: `${className} text-caption`,
    ...attribute
  });
}
function Select({ options, ...attribute }) {
  return createDOMElement({
    tag: "select",
    children: options.map(
      ({ value, option }) => createDOMElement({
        tag: "option",
        value,
        textContent: option
      })
    ),
    ...attribute
  });
}
function Input({ ...attribute }) {
  return createDOMElement({
    tag: "input",
    ...attribute
  });
}
function TextArea({ ...attribute }) {
  return createDOMElement({
    tag: "textarea",
    ...attribute
  });
}
function Caption({ text }) {
  return createDOMElement({
    tag: "span",
    className: "help-text text-caption",
    textContent: text
  });
}
const InputBox = { Root, Label, Select, Input, TextArea, Caption };
function RestaurantAddModalForm({ onClose, onSubmit }) {
  const CancelButton = ActionButton({ text: "취소하기", type: "button", onClick: onClose });
  const AddButton = CTAButton({ text: "추가하기", type: "submit" });
  return createDOMElement({
    tag: "form",
    onSubmit,
    children: [
      InputBox.Root({
        label: InputBox.Label({ text: "카테고리", for: "category", className: "label-required" }),
        input: InputBox.Select({
          name: "category",
          id: "category",
          options: CATEGORY_OPTIONS$1,
          required: true
        })
      }),
      InputBox.Root({
        label: InputBox.Label({ text: "이름", for: "name", className: "label-required" }),
        input: InputBox.Input({ type: "text", name: "name", id: "name", required: true })
      }),
      InputBox.Root({
        label: InputBox.Label({ text: "거리(도보 이동 시간)", for: "distance", className: "label-required" }),
        input: InputBox.Select({
          name: "distance",
          id: "distance",
          options: DISTANCE_OPTIONS,
          required: true
        })
      }),
      InputBox.Root({
        label: InputBox.Label({ text: "설명", for: "description" }),
        input: InputBox.TextArea({
          name: "description",
          id: "description",
          cols: "30",
          rows: "5"
        }),
        caption: InputBox.Caption({
          text: "메뉴 등 추가 정보를 입력해 주세요."
        })
      }),
      InputBox.Root({
        label: InputBox.Label({ text: "참고 링크" }),
        input: InputBox.Input({
          type: "text",
          name: "link",
          id: "link"
        }),
        caption: InputBox.Caption({
          text: "매장 정보를 확인할 수 있는 링크를 입력해 주세요."
        })
      }),
      createDOMElement({
        tag: "div",
        className: "button-container",
        children: [CancelButton, AddButton]
      })
    ]
  });
}
function RestaurantAddModal({ onSubmit }) {
  return createDOMElement({
    tag: "div",
    className: "modal-container",
    children: [
      createDOMElement({
        tag: "h2",
        className: "modal-title text-title",
        textContent: "새로운 음식점"
      }),
      RestaurantAddModalForm({
        onClose: () => modalInstance.close(),
        onSubmit: (e) => {
          onSubmit(e);
          modalInstance.close();
        }
      })
    ]
  });
}
function RestaurantIcon({ src, alt }) {
  return createDOMElement({
    tag: "img",
    src,
    alt,
    className: "category-icon"
  });
}
function getLocalStorage(key, defaultValue) {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : defaultValue;
}
function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function removeItemFromLocalStorage(key, filterFn) {
  const storedData = getLocalStorage(key, []);
  const updatedData = storedData.filter(filterFn);
  setLocalStorage(key, updatedData);
}
const FAVORITE_KEY = "favoriteRestaurants";
const RESTAURANT_KEY = "restaurantData";
const DATA_URL = "data/restaurants.json";
async function loadInitialRestaurants() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error("네트워크 오류 발생");
    return await response.json();
  } catch (error) {
    console.error("❌ 초기 음식점 데이터를 불러오는 데 실패했습니다:", error);
    return [];
  }
}
async function getAllRestaurants() {
  let restaurants = getLocalStorage(RESTAURANT_KEY, []);
  if (restaurants.length === 0) {
    restaurants = await loadInitialRestaurants();
    setLocalStorage(RESTAURANT_KEY, restaurants);
  }
  return restaurants;
}
async function addRestaurant(newRestaurant) {
  const storedRestaurants = await getAllRestaurants();
  storedRestaurants.push(newRestaurant);
  setLocalStorage(RESTAURANT_KEY, storedRestaurants);
}
async function removeRestaurant(id) {
  removeItemFromLocalStorage(RESTAURANT_KEY, (restaurant) => restaurant.id !== id);
  removeItemFromLocalStorage(FAVORITE_KEY, (favId) => favId !== id);
  const restaurantItem = document.querySelector(`.restaurant[data-id="${id}"]`);
  if (restaurantItem) {
    restaurantItem.remove();
  }
}
async function getFavoriteRestaurants() {
  const favoriteIds = getLocalStorage(FAVORITE_KEY, []);
  const allRestaurants = await getAllRestaurants();
  return allRestaurants.filter((restaurant) => favoriteIds.includes(restaurant.id));
}
async function isRestaurantFavorite(id) {
  const favoriteIds = getLocalStorage(FAVORITE_KEY, []);
  return favoriteIds.includes(id);
}
async function updateFavoriteStatus(id) {
  const favoriteIds = getLocalStorage(FAVORITE_KEY, []);
  const updatedFavorites = favoriteIds.includes(id) ? favoriteIds.filter((favId) => favId !== id) : [...favoriteIds, id];
  setLocalStorage(FAVORITE_KEY, updatedFavorites);
  return updatedFavorites.includes(id);
}
const IMAGE_SRC = {
  filled: "images/favorite-icon-filled.png",
  lined: "images/favorite-icon-lined.png"
};
function FavoriteButton({ id }) {
  const imgElement = createDOMElement({
    tag: "img",
    className: "favorite-icon",
    src: IMAGE_SRC.lined,
    alt: "자주가는 음식점",
    onClick: async (event) => {
      await toggleFavoriteIcon(event, id, imgElement);
    }
  });
  async function updateFavoriteIcon() {
    const isFavorite = await isRestaurantFavorite(id);
    imgElement.src = isFavorite ? IMAGE_SRC.filled : IMAGE_SRC.lined;
  }
  updateFavoriteIcon();
  return createDOMElement({
    tag: "div",
    className: "restaurant__star",
    children: [imgElement]
  });
}
async function toggleFavoriteIcon(event, id, imgElement) {
  event.stopPropagation();
  const isFavorite = await updateFavoriteStatus(id);
  imgElement.src = isFavorite ? IMAGE_SRC.filled : IMAGE_SRC.lined;
  updateSingleRestaurantItem(id);
  updateModalFavoriteIcon(id);
}
async function updateSingleRestaurantItem(id) {
  const restaurantItem = $(`.restaurant[data-id="${id}"]`);
  const imgElement = restaurantItem.querySelector(".favorite-icon");
  const isFavorite = await isRestaurantFavorite(id);
  imgElement.src = isFavorite ? IMAGE_SRC.filled : IMAGE_SRC.lined;
}
async function updateModalFavoriteIcon(id) {
  const modalFavoriteIcons = $all(".modal .favorite-icon");
  const isFavorite = await isRestaurantFavorite(id);
  modalFavoriteIcons.forEach((icon) => {
    icon.src = isFavorite ? IMAGE_SRC.filled : IMAGE_SRC.lined;
  });
}
function DetailModal({ id, name, distance, description, link, icon }) {
  return createDOMElement({
    tag: "div",
    className: "modal-container detail-modal",
    children: [
      icon,
      createDOMElement({
        tag: "h3",
        className: "restaurant__name text-subtitle",
        textContent: name
      }),
      FavoriteButton({ id }),
      createDOMElement({
        tag: "span",
        className: "restaurant__distance text-body",
        textContent: `캠퍼스부터 ${distance}분 내`
      }),
      createDOMElement({
        tag: "p",
        className: "text-body",
        textContent: description
      }),
      createDOMElement({
        tag: "a",
        className: "modal-link text-body",
        href: link,
        textContent: link,
        target: "_blank"
      }),
      createDOMElement({
        tag: "div"
      }),
      createDOMElement({
        tag: "div",
        className: "button-container",
        children: [
          ActionButton({
            text: "삭제하기",
            onClick: () => {
              removeRestaurant(id);
              modalInstance.close();
            }
          }),
          CTAButton({ text: "닫기", onClick: () => modalInstance.close() })
        ]
      })
    ]
  });
}
function RestaurantItem({ id, name, distance, description, icon, link, category }) {
  return createDOMElement({
    tag: "li",
    className: "restaurant",
    attributes: { "data-id": id },
    children: [
      createDOMElement({
        tag: "div",
        className: "restaurant__category",
        children: [icon]
      }),
      createDOMElement({
        tag: "div",
        className: "restaurant__info",
        children: [
          createDOMElement({
            tag: "h3",
            className: "restaurant__name text-subtitle",
            textContent: name
          }),
          createDOMElement({
            tag: "div",
            className: "restaurant__star",
            children: [FavoriteButton({ id })]
          }),
          createDOMElement({
            tag: "span",
            className: "restaurant__distance text-body",
            textContent: `캠퍼스부터 ${distance}분 내`
          }),
          createDOMElement({
            tag: "p",
            className: "restaurant__description text-body",
            textContent: description
          })
        ]
      })
    ],
    onClick: () => {
      modalInstance.open(DetailModal({ id, name, distance, description, link, icon }));
    }
  });
}
function RestaurantList({ restaurants }) {
  return createDOMElement({
    tag: "section",
    className: "restaurant-list-container",
    children: [
      createDOMElement({
        tag: "ul",
        className: "restaurant-list",
        children: restaurants.map(
          (restaurant) => RestaurantItem({
            ...restaurant,
            icon: RestaurantIcon({ src: restaurant.icon.src, alt: restaurant.icon.category })
          })
        )
      })
    ]
  });
}
const CATEGORY_OPTIONS = ["전체", "한식", "중식", "일식", "양식", "아시안", "기타"];
const SORT_OPTIONS = ["이름순", "거리순"];
const Dropdown = ({ id, name, className, options, onChange }) => {
  return createDOMElement({
    tag: "select",
    id,
    name,
    className,
    onChange,
    children: options.map(
      (option) => createDOMElement({
        tag: "option",
        value: option,
        textContent: option
      })
    )
  });
};
const CategoryDropdown = ({ onChange }) => {
  return Dropdown({
    id: "category-filter",
    name: "category",
    className: "restaurant-filter",
    options: CATEGORY_OPTIONS,
    onChange
  });
};
const SortingDropdown = ({ onChange }) => {
  return Dropdown({
    id: "sorting-filter",
    name: "sorting",
    className: "restaurant-filter",
    options: SORT_OPTIONS,
    onChange
  });
};
function DropdownContainer() {
  return createDOMElement({
    tag: "section",
    className: "restaurant-filter-container",
    children: [
      CategoryDropdown({
        onChange: (e) => {
          const target = e.target;
          handleCategoryChange(target.value);
        }
      }),
      SortingDropdown({
        onChange: (e) => {
          const target = e.target;
          handleSortingChange(target.value);
        }
      })
    ]
  });
}
const handleCategoryChange = (category = "전체") => {
  const sortingSelect = $("#sorting-filter");
  const sortBy = (sortingSelect == null ? void 0 : sortingSelect.value) || "이름순";
  filterAndSortRestaurants(category, sortBy);
};
const handleSortingChange = (sortBy = "이름순") => {
  const categorySelect = $("#category-filter");
  const category = (categorySelect == null ? void 0 : categorySelect.value) || "전체";
  filterAndSortRestaurants(category, sortBy);
};
const filterAndSortRestaurants = async (category, sortBy) => {
  var _a;
  const selectedCategory = category || "전체";
  const selectedSortBy = sortBy || "이름순";
  const isFavoriteTab = (_a = $(".favorite-restaurant-tab")) == null ? void 0 : _a.classList.contains("active-tab");
  const restaurants = isFavoriteTab ? await getFavoriteRestaurants() : await getAllRestaurants();
  const filteredRestaurants = restaurants.filter((restaurant) => selectedCategory === "전체" || restaurant.category === selectedCategory).sort((a, b) => selectedSortBy === "이름순" ? a.name.localeCompare(b.name) : a.distance - b.distance);
  const restaurantListContainer = $(".restaurant-list-container");
  if (restaurantListContainer) {
    restaurantListContainer.replaceWith(RestaurantList({ restaurants: filteredRestaurants }));
  }
  return filteredRestaurants;
};
function Tab() {
  const tabContainer = createDOMElement({
    tag: "div",
    className: "tab-container",
    children: [
      createDOMElement({
        tag: "div",
        className: "tab-list",
        children: [
          createDOMElement({
            tag: "button",
            className: "tab-button active-tab text-subtitle all-restaurant-tab",
            textContent: "모든 음식점",
            onClick: toggleRestaurantTab
          }),
          createDOMElement({
            tag: "button",
            className: "tab-button text-subtitle favorite-restaurant-tab",
            textContent: "자주 가는 음식점",
            onClick: toggleRestaurantTab
          }),
          createDOMElement({
            tag: "div",
            className: "tab-indicator"
          })
        ]
      })
    ]
  });
  requestAnimationFrame(setInitialIndicatorPosition);
  renderRestaurantList$1();
  return tabContainer;
}
async function toggleRestaurantTab(event) {
  const allTab = $(".all-restaurant-tab");
  const favoriteTab = $(".favorite-restaurant-tab");
  allTab.classList.remove("active-tab");
  favoriteTab.classList.remove("active-tab");
  event.target.classList.add("active-tab");
  updateIndicatorPosition(event.target);
  const isFavoriteTab = event.target.classList.contains("favorite-restaurant-tab");
  await renderRestaurantList$1(isFavoriteTab);
}
function setInitialIndicatorPosition() {
  const activeTab = $(".active-tab");
  if (activeTab) {
    updateIndicatorPosition(activeTab);
  }
}
function updateIndicatorPosition(targetTab) {
  const indicator = $(".tab-indicator");
  const tabRect = targetTab.getBoundingClientRect();
  const tabListRect = $(".tab-list").getBoundingClientRect();
  indicator.style.width = `${tabRect.width}px`;
  indicator.style.transform = `translateX(${tabRect.left - tabListRect.left}px)`;
}
async function renderRestaurantList$1(showFavorites = false) {
  const restaurantListContainer = $(".restaurant-list-container");
  if (!restaurantListContainer) {
    return;
  }
  restaurantListContainer.innerHTML = "";
  const restaurants = showFavorites ? await getFavoriteRestaurants() : await getAllRestaurants();
  const newList = RestaurantList({ restaurants });
  restaurantListContainer.appendChild(newList);
}
addEventListener("load", () => {
  renderHeader();
  renderTab();
  renderFilter();
  renderRestaurantList();
  renderModal();
});
const renderHeader = () => {
  const body = $("body");
  const header = Header({ title: "점심 뭐 먹지", right: PlusButton() });
  body.prepend(header);
};
const renderTab = () => {
  const main = $("main");
  main.prepend(Tab());
};
const renderRestaurantList = async () => {
  const main = $("main");
  const restaurantListContainer = $(".restaurant-list-container");
  if (restaurantListContainer) {
    restaurantListContainer.remove();
  }
  const restaurants = await filterAndSortRestaurants();
  const newList = RestaurantList({ restaurants });
  main.appendChild(newList);
};
const renderFilter = () => {
  const main = $("main");
  main.appendChild(DropdownContainer());
};
const renderModal = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newRestaurant = {
      id: Date.now(),
      name: String(formData.get("name")),
      distance: Number(formData.get("distance")),
      description: String(formData.get("description")),
      category: String(formData.get("category")),
      link: String(formData.get("link")),
      icon: {
        src: `images/category-${String(formData.get("category"))}.png`,
        alt: String(formData.get("category"))
      },
      isFavorite: false
    };
    await addRestaurant(newRestaurant);
    await renderRestaurantList();
    form.reset();
  };
  const plusButton = $(".gnb__button");
  plusButton.addEventListener("click", () => modalInstance.open(RestaurantAddModal({ onSubmit: handleSubmit })));
};
