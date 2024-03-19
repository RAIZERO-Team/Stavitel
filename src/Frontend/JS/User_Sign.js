const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach(inp =>{
    inp.addEventListener("focus", () => {
        inp.classList.add("active");
    });
inp.addEventListener("blur", () => {
inp.classList.remove("active");
});
inp.addEventListener("blur",() => {
    if(inp.value != "") return;
    inp.classList.remove("active");
});
});

// =============  Button to switch on sign in & sign up =============
toggle_btn.forEach(btn =>{
btn.addEventListener("click",() =>{
    main.classList.toggle("sign-in-mode");
});
});

function moveSlider(){
    let index = this.dataset.value;
    let currentImage = document.querySelector(`.img-${index}`);
    images.forEach(img => img.classList.remove("show"));
    currentImage.classList.add("show")
    bullets.forEach(bull => bull.classList.remove("active"));
    this.classList.add("active");
}
bullets.forEach(bullet => {
    bullet.addEventListener("click", moveSlider);
});
