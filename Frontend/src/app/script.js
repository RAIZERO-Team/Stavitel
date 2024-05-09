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
  

  