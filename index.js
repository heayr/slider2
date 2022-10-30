const pictures = [
{
    title: 'ROSTOV-ON-DON, ADMIRAL',
    url: 'https://live.staticflickr.com/65535/52455223307_0c634eb532_z.jpg'
},
{
    title: 'SOCHI THIEVES',
    url: 'https://live.staticflickr.com/65535/52456194925_047e5736a1_z.jpg'
},
{
    title: 'Rostov-on-Don Patriotic',
    url: 'https://live.staticflickr.com/65535/52456194895_72161f89a4_z.jpg'
}
];



// инкапсулируем инитСлайдер чтобы сохранить универсальность и относить к одной сущности
function initSlider(options) {
console.log('everything is ok');
options = options || {
titles: false,
dots: true
};
const sliderPictures = document.querySelector('.slider__images');
const sliderArrows = document.querySelector('.arrows');
const sliderDots = document.querySelector('.slider__dots');
let sliderLinks = document.querySelector('.project__right-block-list');

if (!pictures || !pictures.length) return;

initPictures();
initArrows();


if (options.dots) {
    initDots();
};

if (options.titles){
    initLinks();

};



function initPictures() {
    pictures.forEach((image, index) => {
        let imageDiv = `<div class='image n${index} ${index === 0? 'active' : ''}'
         style='background-image:url(${pictures[index].url});' data-index='${index}'></div> `;
        sliderPictures.innerHTML += imageDiv;
    });
}

function initArrows() {
    sliderArrows.querySelectorAll('.arrow_button').forEach(arrow => {
        arrow.addEventListener('click', function(){

            let curNumber = +sliderPictures.querySelector('.active').dataset.index;
            let nextNum;
            if (arrow.classList.contains('left')){
                nextNum = curNumber === 0? pictures.length - 1 : curNumber - 1;
            } else {
                nextNum = curNumber === pictures.length - 1? 0 : curNumber + 1;
            }
            moveSlider(nextNum);
        });
    });
}

function initDots() {
    pictures.forEach((image, index) => {
        let dot = `<div class='dot n${index} ${index === 0? 'active' : ''}' data-index='${index}'></div>`
        sliderDots.innerHTML += dot; 
    });

    sliderDots.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', function(){
            moveSlider(this.dataset.index);
            sliderDots.querySelector('.active').classList.remove('active');
            this.classList.add('active');
    })
    })
};

function initLinks() {
    console.log('alive');
    pictures.forEach((title, index) => {
    let linkDiv =`<li class='project__right_link n${index} ${index === 0? 'active' : ''}'
     data-index='${index}' >${pictures[index].title}</li>`;
    sliderLinks.innerHTML += linkDiv;
    });
    sliderLinks.querySelectorAll('.project__right_link').forEach(linkDiv => {
        linkDiv.addEventListener('click', function(){
            moveSlider(this.dataset.index)
        })
    })
}



function moveSlider(num) {
    sliderPictures.querySelector('.active').classList.remove('active');
    sliderPictures.querySelector(".n" + num).classList.add("active");
    if (options.dots) {
        sliderDots.querySelector(".active").classList.remove("active");
        sliderDots.querySelector(".n" + num).classList.add("active");
      }
      if (options.titles) {
        sliderLinks.querySelector(".active").classList.remove("active");
        sliderLinks.querySelector(".n" + num).classList.add("active");
      }
    };
}

let sliderOptions = {
    titles: true,
    dots: true
}

document.addEventListener('DOMContentLoaded', () => {
    initSlider(sliderOptions);
});
// document.addEventListener('DOMContentLoaded', initSlider);