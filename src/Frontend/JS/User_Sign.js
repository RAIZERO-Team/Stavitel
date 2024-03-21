const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");
const indicator =document.querySelector(".indicator");
const input =document.querySelector(".input");
const week =document.querySelector(".week");
const medium =document.querySelector(".medium");
const strong =document.querySelector(".strong");
const text =document.querySelector(".text");
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
    main.classList.toggle("sign-up-mode");
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
let regExpWeek = /[a-z]/;
let regExpMedium = /\d+/;
let regExpStrong= /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;
function trigger(){
    if (input.value !=""){
        indicator.computedStyleMap.display = "block";       
        indicator.computedStyleMap.display = "flex";
         if(input.value.length <= 3 && (input.value.match(regExpWeek) || input.value.match(regExpMedium) || input.value.match(regExpStrong)))no=1;              
         if(input.value.length >= 6 && ((input.value.match(regExpWeek) && input.value.match(regExpMedium)) || input.value.match(regExpMedium) && input.value.match(regExpStrong)) || (input.value.match(regExpWeek) && input.value.match(regExpStrong)))) no=2;              
         if(input.value.length >= 6 && input.value.match(regExpWeek) && input.value.match(regExpMedium) && input.value.match(regExpStrong))no=3; 
         if(no == 1){
            week.classList.add("active");
            text.style.display = "block";
            text.textContent = "Your password is too week"
            week.classList.add("weak");
         }
    }else{
        indicator.computedStyleMap.display = "none";
        text.style.display = "none";
    }
}
bullets.forEach(bullet => {
    bullet.addEventListener("click", moveSlider);
});
