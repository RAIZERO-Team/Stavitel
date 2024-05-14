/=============== SHOW MENU ===============/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    // Validate that variables exist
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')

//=============== REMOVE MENU MOBILE ===============//
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

//=============== CHANGE BACKGROUND HEADER ===============//
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

document.addEventListener("DOMContentLoaded", function() {
    let nav = document.querySelector("nav");
    let menuBtn = document.querySelector(".menu-btn");
    let cancelBtn = document.querySelector(".cancel-btn");
    let navBar = document.querySelector(".navbar");
    let body = document.querySelector("body");

    window.onscroll = function() {
        if (document.documentElement.scrollTop > 20) {
            nav.classList.add("sticky");
        } else {
            nav.classList.remove("sticky");
        }
    };

    menuBtn.onclick = function() {
        navBar.classList.add("active");
        body.classList.add("menu-open");
    };

    cancelBtn.onclick = function() {
        navBar.classList.remove("active");
        body.classList.remove("menu-open");
    };

    document.querySelectorAll(".menu li a").forEach(link => {
        link.addEventListener("click", function() {
            navBar.classList.remove("active");
            body.classList.remove("menu-open");
        });
    });
});