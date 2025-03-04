// document.addEventListener("DOMContentLoaded", () => {
//   const addButton = document
//     .querySelector("#add-button")

//     addButton.addEventListener("click", () => {
//       const list = document.querySelector(".nickname-list");
//       const item = document.createElement("li");
//       item.innerText = "메타";
//       list.appendChild(item);
//     });
// });

addEventListener("load", () => {
  const body = document.querySelector("body");

  const header = createHeader({ title: "점심 뭐 먹지" });
  header.classList.add("gnb");
  body.prepend(header);
});

function createHeader({ title }) {
  const header = document.createElement("header");

  header.innerHTML =
    /*html*/
    ` <h1 class="gnb__title text-title">${title}</h1>
    <button type="button" class="gnb__button" aria-label="음식점 추가">
      <img src="./add-button.png" alt="음식점 추가" />
    </button>`;
  header.classList.add("gnb");

  return header;
}
