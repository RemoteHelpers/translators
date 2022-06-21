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
  selectInput: document.querySelector('div[data-name="select-lang"]'),
  translateInput: document.querySelector('div[data-name="translated-lang"]'),
  anchorLinks: document.querySelectorAll('a[href="#section-main-form"]'),
  selectPackage: document.getElementById("choose-package"),
  heroForm: document.getElementById("hero-form"),
  packageForm: document.getElementById("package-form"),
  mainForm: document.getElementById("main-form"),
};
refs.anchorLinks.forEach(item => item.addEventListener("click", transferData));
function transferData(e) {
  refs.selectPackage.value = e.currentTarget.dataset.package;
}
refs.showMoreBtn.addEventListener("click", showMoreTeam);
function showMoreTeam(e) {
  refs.teamItems.forEach(item => item.classList.add("visible"));
  hideBtn();
}
function hideBtn() {
  refs.showMoreBtn.style.display = "none";
}
console.log(refs.anchorLinks);
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

refs.heroForm.addEventListener("submit", onSubmitForm);
refs.packageForm.addEventListener("submit", onSubmitForm);
refs.mainForm.addEventListener("submit", onSubmitForm);
function onSubmitForm(e) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  formData.set("global_company_name", "Remote Helpers");
  formData.set("project_company", "trn-s.com");
  switch (e.target.id) {
    case "hero-form":
      formData.set("client_name", "fast-lead");
      formData.set("note", "-");
      break;
    case "package-form":
      formData.set("note", "Personal Package");
      break;
    default:
      const refLang = document.querySelectorAll(".js-target");
      formData.set(
        "note",
        `Package: ${
          !formData.get("package") ? "-" : formData.get("package")
        }; Translation: ${refLang[0].firstElementChild.alt} to ${
          refLang[1].firstElementChild.alt
        }`,
      );
      formData.delete("package");
      formData.delete("agreement");
  }
  addUserData(formData)
    .then(data => {
      console.log(data);
    })
    .catch(error => console.log(error.message));
  e.target.reset();
}
const url = "https://crm-s.com/api/v1/leads-public";
async function addUserData(userData) {
  const response = await fetch(url, {
    method: "POST",
    body: userData,
  });
  return response.json();
}
