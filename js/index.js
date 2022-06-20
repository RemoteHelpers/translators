new Swiper(".swiper", {
  navigation: {
    nextEl: ".swiper-btn-next",
    prevEl: ".swiper-btn-prev",
    lockClass: "disabled",
  },
  slidesPerView: "auto",
  spaceBetween: 20,
  centeredSlides: true,
  breakpoints: {
    610: {
      centeredSlides: false,
    },
    1920: {
      spaceBetween: 40,
      centeredSlides: false,
    },
  },
});

const refs = {
  showMoreBtn: document.querySelector(".section-team .show-more-btn"),
  teamItems: document.querySelectorAll(".section-team .container > ul .item"),
  question: document.querySelectorAll(".section-question ul .item"),
  selectInput: document.querySelector("form .select-lang-container"),
  translateInput: document.querySelector("form .translated-lang-container"),
};
refs.showMoreBtn.addEventListener("click", showMoreTeam);
function showMoreTeam(e) {
  refs.teamItems.forEach(item => item.classList.add("visible"));
  hideBtn();
}
function hideBtn() {
  refs.showMoreBtn.style.display = "none";
}

refs.question.forEach(item => item.addEventListener("click", showAnswer));
function showAnswer(e) {
  if (e.currentTarget.classList.contains("answered")) {
    e.currentTarget.classList.remove("answered");
    return;
  }
  refs.question.forEach(item => {
    if (item.classList.contains("answered")) item.classList.remove("answered");
  });
  e.currentTarget.classList.add("answered");
}

refs.selectInput.addEventListener("click", openSelectMenu);
refs.translateInput.addEventListener("click", openSelectMenu);
const menu = {};
function openSelectMenu(e) {
  const { name } = e.currentTarget.dataset;
  const listRef = e.currentTarget.children[2];
  const selectedInput = e.currentTarget.children[1];
  const iconRef = e.currentTarget.children[0];
  if (e.target.nodeName === "IMG" && !menu[name]) {
    listRef.classList.add("visible");
    iconRef.classList.add("visible");
    menu[name] = true;
    return;
  }
  if (e.target.nodeName === "IMG" && menu[name]) {
    selectedInput.innerHTML = e.target.outerHTML;
    listRef.classList.remove("visible");
    iconRef.classList.remove("visible");
    menu[name] = false;
    return;
  }
  if (e.target.nodeName !== "IMG" && menu[name]) {
    listRef.classList.remove("visible");
    iconRef.classList.remove("visible");
    menu[name] = false;
    return;
  }
  listRef.classList.add("visible");
  iconRef.classList.add("visible");
  menu[name] = true;
}
