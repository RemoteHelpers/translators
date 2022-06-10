'use strict';

document.addEventListener("DOMContentLoaded", function (event) {
  const swiper = new Swiper('.mySwiper', {
    navigation: {
      nextEl: '.next_swiper_btn',
      prevEl: '.prev_swiper_btn',
    },
    // loop: true,
    // autoplay: {
    //   delay: 2000,
    // },
    breakpoints: {
      0: {
        enabled: true,
        slidesPerView: 1.5,
        speed: 500,
      },
      768: {
        speed: 500,
        slidesPerView: 2.5,
      }
    }
  });


  // Полифил для forEach (для старых браузеров)
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

  // Реализация custom dropdown
  document.querySelectorAll('.dropdown').forEach(function (dropdownWrapper) {


    const dropdownBtn = dropdownWrapper.querySelector('.dropdown_button'),
      dropdownList = dropdownWrapper.querySelector('.industry_dropdown_list'),
      dropdownListItem = dropdownList.querySelectorAll('.industry_dropdown_item'),
      dropdownInputHidden = dropdownWrapper.querySelector('.dropdown_input_hidden'),
      dropdownArrow = dropdownWrapper.querySelectorAll('.dropdown_arrow_down');

    dropdownWrapper.addEventListener('click', function (event) {
      event.preventDefault();
    })

    dropdownBtn.addEventListener('click', function () {
      dropdownList.classList.toggle('industry_dropdown_list-visible');
      dropdownArrow.forEach(function (item) {
        item.classList.toggle('rotate_arrow');
      })
      if (dropdownBtn.innerText !== 'Industry' || dropdownBtn.innerText !== 'Country') {
        dropdownBtn.style.color = '#000';
      }
    })


    dropdownListItem.forEach(function (listItem) {
      listItem.addEventListener('click', function (e) {
        e.stopPropagation();
        dropdownBtn.innerText = this.innerText;
        dropdownList.classList.remove('industry_dropdown_list-visible');
        dropdownInputHidden.value = this.dataset.value;
        dropdownArrow.forEach(function (item) {
          item.classList.remove('rotate_arrow');
        })
      })
    })

    document.addEventListener('click', function (e) {
      if (e.target !== dropdownBtn) {
        dropdownList.classList.remove('industry_dropdown_list-visible');
        dropdownArrow.forEach(function (item) {
          item.classList.remove('rotate_arrow');
        })
      }
    })

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' || e.key === 'Escape') {
        dropdownList.classList.remove('industry_dropdown_list-visible');
        dropdownArrow.forEach(function (item) {
          item.classList.remove('rotate_arrow');
        })
      }
    })
  });


  // active card
  const firstCard = document.querySelector('.first_mobile_card_wrapper'),
    secondCard = document.querySelector('.second_mobile_card_wrapper');


  firstCard.addEventListener('click', function () {
    firstCard.classList.toggle('active_card');
  });
  secondCard.addEventListener('click', function () {
    secondCard.classList.toggle('active_card');
  });


  // sending form data
  const form = document.querySelector('#form');

  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();
    let error = formValidate(form);
    let formData = new FormData(form);

    if (error === 0) {
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        let result = await response.json();
      } else {
        document.location.replace('thank-you-page');
      }
    } else {
      // alert('Заполните поля!')
    }

  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
      let input = formReq[index];
      formRemoveError(input)

      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
        formAddError(input);
        error++;
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }
  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }



    // video modal

    const videoBtn = document.querySelector('.watch_video'),
          videoModal = document.querySelector('.video_modal'),
          closeModal = document.querySelector('.video_modal_close');


    videoBtn.addEventListener('click', () => {
      videoModal.classList.add('video_modal_active')
    }) 

    closeModal.addEventListener('click', () => {
      videoModal.classList.remove('video_modal_active')
    })
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        videoModal.classList.remove('video_modal_active')
      }
    })










});




