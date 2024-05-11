const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
});

ScrollReveal().reveal(".offer__image img", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".offer__content .section__subheader", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".offer__content .section__header", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".offer__content .section__description", {
  ...scrollRevealOption,
  delay: 1500,
});
ScrollReveal().reveal(".offer__content h5, .offer__ratings", {
  ...scrollRevealOption,
  delay: 2000,
});
ScrollReveal().reveal(".offer__content .offer__btn", {
  ...scrollRevealOption,
  delay: 2500,
});

ScrollReveal().reveal(".service__card", {
  ...scrollRevealOption,
  interval: 500,
});

const clientImageArr = [
  "/assets/client-1.jpg",
  "/assets/client-2.jpg",
  "/assets/client-3.jpg",
];

const clientImage = document.querySelector(".client__image img");

function updateSwiperImage(eventName, args) {
  if (eventName === "slideChangeTransitionStart") {
    const index = args && args[0].realIndex;
    clientImage.classList.remove("show");
    clientImage.classList.add("hide");
    clientImage.addEventListener(
      "animationend",
      (e) => {
        clientImage.src = clientImageArr[index];
        clientImage.classList.remove("hide");
        clientImage.classList.add("show");
      },
      {
        once: true,
      }
    );
  }
}

const swiper = new Swiper(".swiper", {
  loop: true,

  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },

  onAny(event, ...args) {
    updateSwiperImage(event, args);
  },
});

const banner = document.querySelector(".banner__wrapper");

Array.from(banner.children).forEach((item) => {
  const duplicateNode = item.cloneNode(true);
  duplicateNode.setAttribute("aria-hidden", true);
  banner.appendChild(duplicateNode);
});
