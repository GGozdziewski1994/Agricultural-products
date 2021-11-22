const btnShowModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.modal__btn-close');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const btnOperations = document.querySelector('.operations');
const operationsContent = document.querySelectorAll('.operations__content');
const btnOperationsContent = document.querySelectorAll('.operations__btn');

const slides = document.querySelectorAll('.slide__img');
const btnSlideRight = document.querySelector('.slide__btn--right');
const btnSlideLeft = document.querySelector('.slide__btn--left');

const dots = document.querySelector('.dots');

const btnScrollTo = document.querySelector('.btn-scroll-to');
const section1 = document.getElementById('section-1');

const links = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');

btnShowModal.forEach(m => {
    m.addEventListener('click', function (){
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden')
    });
});

const closeModal = function() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
window.addEventListener('keydown', function(e) {
    if(e.key === 'Escape') closeModal();
});


btnOperations.addEventListener('click',function (e){
    const data = e.target.closest('.operations__btn');

    btnOperationsContent.forEach(b => b.classList.remove('operations__tab--active'));
    data.classList.add('operations__tab--active');

    operationsContent.forEach(c => c.classList.remove('operations__content--active'));
    document.querySelector(`.operations__content--${data.dataset.tab}`).classList.add('operations__content--active');
});


let currentSlide = 0;
const maxSlide = slides.length;

btnSlideRight.addEventListener('click', function(){
    if(currentSlide === maxSlide - 1) currentSlide = 0;
    else currentSlide++;

    goToSlide(currentSlide);
    addActiveDot(currentSlide);
});

btnSlideLeft.addEventListener('click', function(){
    if(currentSlide === 0) currentSlide = maxSlide - 1;
    else currentSlide--;

    goToSlide(currentSlide);
    addActiveDot(currentSlide);
});

const goToSlide = function(currentSlide) {
    slides.forEach((slide, i) => {
        slide.style.transform = `translate(${(i - currentSlide) * 100}%)`;
    });
};

const createDots = function () {
    slides.forEach((_, i) => {
        dots.insertAdjacentHTML('beforeend', `<div class="dots__dot" data-dot="${i}"></div>`);
    });
};

dots.addEventListener('click', function(e) {
    const data = e.target.closest('.dots__dot').dataset.dot;
    goToSlide(data);
    addActiveDot(data);
    currentSlide = data;
});

const addActiveDot = function(i) {
    document.querySelectorAll('.dots__dot').forEach(d => {
        d.classList.remove('dots__dot-active');
    });

    document.querySelector(`.dots__dot[data-dot='${i}']`).classList.add('dots__dot-active');
};

const init = function() {
    createDots();
    addActiveDot(currentSlide);
    goToSlide(currentSlide);
}
init();

btnScrollTo.addEventListener('click', function(){
    section1.scrollIntoView({behavior: 'smooth'});
});

const mouseEvent = function (e) {
    if(e.target.classList.contains('nav__link')) {
        const link = e.target;
        const nav = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelectorAll('.nav__logo');

        nav.forEach(el => {
            if(el !== link) el.style.opacity = this;
        });

        logo.forEach(el => {
            if(el !== link) el.style.opacity = this;
        });
    }
};

links.addEventListener('mouseover', mouseEvent.bind(0.5));
links.addEventListener('mouseout', mouseEvent.bind(1));

links.addEventListener('click', function (e) {
    e.preventDefault();

    if(e.target.classList.contains('link')) {
        const id = e.target.getAttribute('href');

        document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    }
});

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries) {
    const [entry] = entries;
    if(!entry.isIntersecting) nav.classList.add('nav__sticky');
    else nav.classList.remove('nav__sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

const allSection = document.querySelectorAll('.section');

const stickySection = function(entries, observer) {
    const [entry] = entries;

    if(!entry.isIntersecting) return;

    entry.target.classList.remove('section__hidden');
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(stickySection, {
  root: null,
  threshold: 0.2,
});

allSection.forEach(section => {
    sectionObserver.observe(section);
    section.classList.add('section__hidden');
});




