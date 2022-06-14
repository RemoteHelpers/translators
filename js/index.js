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
};

refs.showMoreBtn.addEventListener("click", showMoreTeam);

function showMoreTeam(e) {
  refs.teamItems.forEach(item => item.classList.add("visible"));
  hideBtn();
}
function hideBtn() {
  refs.showMoreBtn.style.display = "none";
}
