const inputs = document.querySelectorAll(".input-field");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

// const btn =document.querySelector(".button");
// const feedback = document.querySelector(".feedback-container");
//   btn.addEventListener("click", () => {
//   feedback.innerHTML = `<h1>Thank you for your feedback </h1>`;
// });