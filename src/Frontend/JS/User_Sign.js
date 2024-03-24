const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");




inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    inp.classList.remove("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

// =============  Button to switch on sign in & sign up =============
toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

function moveSlider() {
  let index = this.dataset.value;
  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");
  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");
}

// =============  Password Strength Check =============

const indicator = document.querySelectorAll(".indicator");
const pass_input = document.querySelectorAll(".pass");
const week = document.querySelectorAll(".week");
const medium = document.querySelectorAll(".medium");
const strong = document.querySelectorAll(".strong");
const pass_text = document.querySelectorAll(".pass_text");

let regExpWeak = /[a-z]+/;
let regExpMedium = /\d+/;
let regExpStrong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;

function trigger() {
  if (pass_input.value != "") {
    // indicator.style.display = "block";
    // indicator.style.display = "flex";
    if (
      pass_input.value.length <= 3 &&
      (pass_input.value.match(regExpWeak) ||
        pass_input.value.match(regExpMedium) ||
        pass_input.value.match(regExpStrong))
    )
      no = 1;
    if (
      pass_input.value.length >= 6 &&
      ((pass_input.value.match(regExpWeak) &&
        pass_input.value.match(regExpMedium)) ||
        (pass_input.value.match(regExpMedium) &&
          pass_input.value.match(regExpStrong)) ||
        (pass_input.value.match(regExpWeak) &&
          pass_input.value.match(regExpStrong)))
    )
      no = 2;
    if (
      pass_input.value.length >= 6 &&
      pass_input.value.match(regExpWeak) &&
      pass_input.value.match(regExpMedium) &&
      pass_input.value.match(regExpStrong)
    )
      no = 3;
    if (no == 1) {
      weak.classList.add("active");
      pass_text.style.display = "block";
      pass_text.textContent = "Too Week😥";
      pass_text.classList.add("weak");
    }
    if (no == 2) {
      medium.classList.add("active");
      pass_text.textContent = "Medium🙂";
      pass_text.classList.add("medium");
    } else {
      medium.classList.remove("active");
      pass_text.classList.remove("medium");
    }
    if (no == 3) {
      weak.classList.add("active");
      medium.classList.add("active");
      strong.classList.add("active");
      pass_text.textContent = "Strong💪";
      pass_text.classList.add("strong");
    } else {
      strong.classList.remove("active");
      pass_text.classList.remove("strong");
    }
  } else {
    indicator.style.display = "none";
    pass_text.style.display = "none";
  }
}