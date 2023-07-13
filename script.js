'use strict';

/////////////////////////////////////// 
console.log("hello");
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const learnMore = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');
const cookieMessage = document.createElement('div');
cookieMessage.classList.add('cookie-message');
const nav = document.querySelector('.nav');
///model 
const openModal = function(e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// cookie message 🍪

cookieMessage.innerHTML = 'We use cookies for improve functionality. <button class="btn btn--close-cookie">Got it</button>';
cookieMessage.style.backgroundColor = '#3d3c37';
cookieMessage.style.width = '120%';

cookieMessage.style.height = Number.parseFloat(getComputedStyle(cookieMessage).height, 10) + 30 + 'px';

header.append(cookieMessage);
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  cookieMessage.remove();
})
////
/*
document.documentElement.style.setProperty('--color-primary','orangered');
//attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.src);
// logo.setAttribute('hello','world');
// console.log(logo.hello);
// console.log(logo.getAttribute('hello'));
console.log(logo.getAttribute('src'))

const link = document.querySelector('.twitter-link');
console.log(link.href)
*/

// smooth scrolling 📜

learnMore.addEventListener('click', function(e) {
  /*
  const s1Coords = section1.getBoundingClientRect();
  console.log(s1Coords);
  console.log(e.target.getBoundingClientRect());
console.log(window.pageXOffset,window.pageYOffset);
console.log(document.documentElement.clientHeight,document.documentElement.clientWidth)

//scrolling
window.scrollTo({
  left:s1Coords.left + window.pageOffset,
  top:s1Coords.top + window.pageYOffset,
  behavior : 'smooth'})
  */

  //modern way
  section1.scrollIntoView({ behavior: 'smooth' });

})

/// page navigation 🧭
//using event delegation
document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//tab 

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
// console.log(tabsContainer)

tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked)
  if (!clicked) return;
  //active tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));

  tabsContent.forEach(content => content.classList.remove('operations__content--active'))

  clicked.classList.add('operations__tab--active');
  //Active content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})
/// nav hover

const mouseHandle = function(e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    })
    logo.style.opacity = this;
  }
}
nav.addEventListener('mouseover', mouseHandle.bind(0.5))

nav.addEventListener('mouseout', mouseHandle.bind(1));

// sticky navbar

// old method //
// const initialCoords = section1.getBoundingClientRect();

// // console.log(initialCoords)

// window.addEventListener('scroll',function(e){
//   console.log(window.scrollY);
//   if(window.scrollY > initialCoords.top){
//     nav.classList.add('sticky');
//   }else{
//     nav.classList.remove('sticky');
//   }
// });
// using intersection API 🧩
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);
const callback = function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
    }
  })
}
const options = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
}
const observerHeader = new IntersectionObserver(callback, options);
observerHeader.observe(header);

//fade reveal sections 🏴‍☠️
const allSections = document.querySelectorAll('.section');

const secobs = function([entry], sectionObserver) {
  // console.log(entry);
  // console.log(entry.target);
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden')
  sectionObserver.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(secobs, {
  root: null,
  threshold: 0.10
});

allSections.forEach(function(section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})

// lazy loading 🦥
const images = document.querySelectorAll('img[data-src]');
const imgobs = function([entry], observer) {
  // console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img')
  });
  observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(imgobs, {
  root: null,
  threshold: 0,
  rootMargin: '500px'
})

images.forEach(img => imgObserver.observe(img));

// slider component
const slider = function(){
const slides = document.querySelectorAll('.slide');
// console.log(slides)
let currentSlide = 0;
const maxSlide = slides.length;
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');

// slides.forEach((slide, index) => {
//   console.log("hello")
//   console.log(index, slide)
//   slide.style.transform = `translateX(${index * 100}%)`
// });
// dots working

const createDots = function(){
  slides.forEach((slide,index)=>{
return dotsContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${index}"></button>`)})
}


// activate dots

const activeDot = function(slide){
document.querySelectorAll('.dots__dot').forEach(dot =>dot.classList.remove('dots__dot--active'));
  
document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}

// go to slide functions

const goToSlide = function(curSlide){
  slides.forEach((slide, index) => slide.style.transform = `translateX(${(index-curSlide) * 100}%)`);
  // console.log(curSlide);
}

const nextSlide = function(){
  if(currentSlide === maxSlide - 1){
    currentSlide = 0;
  }else{
  currentSlide++;
  }
  goToSlide(currentSlide);
  activeDot(currentSlide);
}

const prevSlide = function(){
  if(currentSlide === 0){
    currentSlide = maxSlide - 1;
  }else{
  currentSlide--;
  }
  goToSlide(currentSlide);
    activeDot(currentSlide);
}

//implementing slide button
const init = function(){
createDots();
goToSlide(0);
activeDot(0);
}
init();
btnRight.addEventListener('click',nextSlide);
btnLeft.addEventListener('click',prevSlide);

document.addEventListener('keydown',function(e){
  if(e.key === 'ArrowLeft') prevSlide();
  if(e.key === 'ArrowRight') nextSlide();
});


dotsContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    const {slide} =  e.target.dataset;
    // console.log(slide);
    goToSlide(slide);
      activeDot(slide);
  }
});
}
slider();

document.addEventListener('DOMContentLoaded',function(e){
  console.log('html and js loaded!!');
});

window.addEventListener('load',function(e){
  console.log('window loaded successfully!!');
})
// window.addEventListener('beforeunload',function(e){

//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// })