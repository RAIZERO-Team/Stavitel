const trendingSwiper = new Swiper(".trending__swiper", {
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 50,
});

const testimonialSwiper = new Swiper(".testimonial__swiper", {
  loop: true,
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
