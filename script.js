'use strict';

///////////////////////////////////////
// Modal window

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
    '.btn--show-modal-window',
);
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModalWindow = function (e) {
    e.preventDefault();
    modalWindow.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
    modalWindow.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModalWindow.forEach(e => {
    e.addEventListener('click', openModalWindow);
});

// for (let i = 0; i < btnsOpenModalWindow.length; i++)
//     btnsOpenModalWindow[i].addEventListener('click', openModalWindow);

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
        closeModalWindow();
    }
});

// Smooth page navigation

btnScrollTo.addEventListener('click', function (e) {
    section1.scrollIntoView({ behavior: 'smooth' });
});

// document.querySelectorAll('.nav__link').forEach(function (htmlElement) {
//     htmlElement.addEventListener('click', function (e) {
//         e.preventDefault();
//         const href = this.getAttribute('href');
//         document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
//     });
// });

// 1. Add Event Listener for Parent
document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();
    // 2. Find target element
    if (e.target.classList.contains('nav__link')) {
        const href = e.target.getAttribute('href');
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
});

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
    const clickedButton = e.target.closest('.operations__tab');
    if (!clickedButton) return;

    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    clickedButton.classList.add('operations__tab--active');

    tabContents.forEach(tab =>
        tab.classList.remove('operations__content--active'),
    );
    document
        .querySelector(`.operations__content--${clickedButton.dataset.tab}`)
        .classList.add('operations__content--active');
});

const navLinksHoverAnimation = function (e, opacity) {
    if (e.target.classList.contains('nav__link')) {
        const linkOver = e.target;
        const siblingLinks = linkOver
            .closest('.nav__links')
            .querySelectorAll('.nav__link');
        const logo = linkOver.closest('.nav').querySelector('img');
        const logoText = linkOver.closest('.nav').querySelector('.nav__text');
        siblingLinks.forEach(function (e) {
            if (e !== linkOver) e.style.opacity = opacity;
        });
        logo.style.opacity = opacity;
        logoText.style.opacity = opacity;
    }
};

const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', function (e) {
    navLinksHoverAnimation(e, 0.4);
});

nav.addEventListener('mouseout', function (e) {
    navLinksHoverAnimation(e, 1);
});

// Sticky navigation - Intersection Observer API
const header = document.querySelector('.header');
const navHight = nav.getBoundingClientRect().height;
const getStickyNav = function (entries) {
    const entry = entries[0];

    if (!entry.isIntersecting) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
};

const headerObserver = new IntersectionObserver(getStickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHight}px`,
});
headerObserver.observe(header);

// Appearance of parts of the sites

const allSections = document.querySelectorAll('.section');

const appearanceSection = function (entries, observer) {
    const entry = entries[0];
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    sectionObserver.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(appearanceSection, {
    root: null,
    threshold: 0.2,
});

allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});

// Lazy loading for images
const lazyImages = document.querySelectorAll('img[data-src]');

const loadImages = function (entries, observer) {
    const entry = entries[0];

    if (!entry.isIntersecting) return;

    // Change low image to high image
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
};

const lazyImagesObserver = new IntersectionObserver(loadImages, {
    root: null,
    threshold: 0.7,
});

lazyImages.forEach(image => lazyImagesObserver.observe(image));

// Create slider
let currentSlide = 0;

const slides = document.querySelectorAll('.slide');

const slidesNumber = slides.length;

const slide = document.querySelector('.slider');

const btnSliderLeft = document.querySelector('.slider__btn--left');
const btnSliderRight = document.querySelector('.slider__btn--right');

const dotsContainer = document.querySelector('.dots');

const createDots = function () {
    slides.forEach(function (_, index) {
        dotsContainer.insertAdjacentHTML(
            'beforeend',
            `
        <button class="dots__dot" data-slide="${index}"></button>
        `,
        );
    });
};
createDots();

const activateCurrentDot = function (slide) {
    document
        .querySelectorAll('.dots__dot')
        .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add('dots__dot--active');
};
activateCurrentDot(0);

const moveToSlide = function (slide) {
    slides.forEach(
        (s, index) =>
            (s.style.transform = `translateX(${(index - slide) * 100}%)`),
    );
};

moveToSlide(0);

const nextSlides = function () {
    if (slidesNumber - 1 === currentSlide) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    moveToSlide(currentSlide);
    activateCurrentDot(currentSlide);
};

const previousSlides = function () {
    if (currentSlide === 0) {
        currentSlide = slidesNumber - 1;
    } else {
        currentSlide--;
    }
    moveToSlide(currentSlide);
    activateCurrentDot(currentSlide);
};

btnSliderRight.addEventListener('click', nextSlides);
btnSliderLeft.addEventListener('click', previousSlides);

document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') {
        nextSlides();
    } else if (e.key === 'ArrowLeft') {
        previousSlides();
    }
});

dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
        const slide = e.target.dataset.slide;
        moveToSlide(slide);
        activateCurrentDot(slide);
    }
});

// Всплытие диалогового окна подтверждения выхода и перезагрузки
window.addEventListener('beforeunload', function (e) {
    e.preventDefault;
    e.returnValue = '';
});
