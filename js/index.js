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
