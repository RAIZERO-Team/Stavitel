//alert("Welcome, we are very happy to have you visit us❤️");
class App {
    constructor() {
        this.heroImages = [...document.querySelectorAll('.hero_images img')];
        this.texts = [...document.querySelectorAll('.text__effect')];
  
        this._initialize();
        this.render();
    }
  
    _initialize() {
        this.setInitialStates();
        this.createLenis();
        this.createIntro();
        this._createHero();
        this._createTextAnimation();
        this._createPinnedSection();
        this._render();
        this.scrollText(); // اسم الدالة الجديدة لتحريك النصوص عند السكرول
    }
    
    setInitialStates() {
        gsap.set('.hero__title span, .fullwidth-image__text', {
            y: 32,
            opacity: 0
        });
  
        gsap.set('.hero_images img', {
            opacity: 1,
            y: gsap.utils.random(100, 50)
        });
  
        gsap.set('.fullwidth-image img', {
            scale: 1.3
        });
    }
  
    createLenis() {
        this.lenis = new Lenis({
            Lerp: 0.1
        });
    }
  
    createIntro() {
        const tl = gsap.timeline();
  
        tl.to('.hero__title div', {
            opacity: 1
        }).to('.hero__title span', {
            y: 0,
            opacity: 1,
            ease: 'expo.out',
            duration: 2,
            stagger: 0.04
        }, 0.5);
    }
  
    _createHero() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
  
        this.heroImages.forEach(image => {
            tl.to(image, {
                ease: 'none',
                yPercent: gsap.utils.random(-100, -50)
            }, 0);
        });
    }
  
    _createTextAnimation() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.text-block',
                start: 'top center',
                end: 'bottom top+=10%',
                scrub: true,
            }
        });
  
        this.texts.forEach((text, index) => {
            const overlay = text.querySelector('.text__overlay');
  
            tl.to(overlay, {
                scaleX: 0
            });
        });
    }
  
    _createPinnedSection() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.fullwidth-image',
                start: 'top top',
                end: '+=1500',
                scrub: true,
                pin: true
            }
        });
  
        tl.to('.fullwidth-image_overlay', {
            opacity: 0.4
        }).to('.fullwidth-image', {
            'clip-path': 'polygon(0% , 100% 0% , 100% 100% , 0% 100%)'
        }).to('.fullwidth-image img', {
            scaleX: 1
        }, 0).to('.fullwidth-image__text', {
            y: '0',
            opacity: 1
        }, 0);
    }
  
    _render(time) {
        this.lenis.raf(time);
        requestAnimationFrame(this._render.bind(this));
    }
  
    render() {}
  }
  
  new App();
  
  /*  photo  */ 
  
  /*developer*/
  
  startSlideshow();
  
  /*  scroll   */
  
  // ============== Mouse ==============
  /*const coords = { x: 0, y: 0 };
  const circles = document.querySelectorAll(".circle");
  
  const colors = [
    "#ffb56b",
    "#fdaf69",
    "#f89d63",
    "#f59761",
    "#ef865e",
    "#ec805d",
    "#e36e5c",
    "#df685c",
    "#d5585c",
    "#d1525c",
    "#c5415d",
    "#c03b5d",
    "#b22c5e",
    "#ac265e",
    "#9c155f",
    "#950f5f",
    "#830060",
    "#7c0060",
    "#680060",
    "#60005f",
    "#48005f",
    "#3d005e"
  ];
  
  circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = colors[index % colors.length];
  });
  
  window.addEventListener("mousemove", function(e){
    coords.x = e.clientX;
    coords.y = e.clientY;
    
  });
  
  function animateCircles() {
    
    let x = coords.x;
    let y = coords.y;
    
    circles.forEach(function (circle, index) {
      circle.style.left = x - 12 + "px";
      circle.style.top = y - 12 + "px";
      
      circle.style.scale = (circles.length - index) / circles.length;
      
      circle.x = x;
      circle.y = y;
      
      const nextCircle = circles[index + 1] || circles[0];
      x += (nextCircle.x - x) * 0.3;
      y += (nextCircle.y - y) * 0.3;
    });
    
    requestAnimationFrame(animateCircles);
  }
  
  animateCircles();
  
  // ============== Scrole ==============
  
  const scrollers = document.querySelectorAll(".scroller");
  
  // If a user hasn't opted in for recuded motion, then we add the animation
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
  }
  
  function addAnimation() {
    scrollers.forEach((scroller) => {
      // add data-animated="true" to every `.scroller` on the page
      scroller.setAttribute("data-animated", true);
  
      // Make an array from the elements within `.scroller-inner`
      const scrollerInner = scroller.querySelector(".scroller__inner");
      const scrollerContent = Array.from(scrollerInner.children);
  
      // For each item in the array, clone it
      // add aria-hidden to it
      // add it into the `.scroller-inner`
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  /*}*/
  