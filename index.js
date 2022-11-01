// можно добавлять / убавлять любое количество элементов в массиве. Отрисовано будет всё.

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

    // Проверка есть ли картинки внутри массива, если нет, то вернётся return, на этом функция завершится
    if (!pictures || !pictures.length) return;

    initPictures();
    initArrows();

    // добил опциональное включение
    if (options.dots) {
        initDots();
    };

    // добил опциональное включение
    if (options.titles) {
        initLinks();

    };


    // функция подключения картинок из массива с созданием в html картинки с уникальным номером и индексом
    function initPictures() {
        pictures.forEach((image, index) => {
            let imageDiv = `<div class='image n${index} ${index === 0 ? 'active' : ''}'
         style='background-image:url(${pictures[index].url});' data-index='${index}'></div> `;
            sliderPictures.innerHTML += imageDiv;
        });
    };

    // функция для стрелок, вешает обработчик сразу на все стрелки внутри дива
    function initArrows() {
        sliderArrows.querySelectorAll('.arrow_button').forEach(arrow => {
            arrow.addEventListener('click', function () {

                let curNumber = +sliderPictures.querySelector('.active').dataset.index;
                let nextNum;
                if (arrow.classList.contains('left')) {
                    nextNum = curNumber === 0 ? pictures.length - 1 : curNumber - 1;
                } else {
                    nextNum = curNumber === pictures.length - 1 ? 0 : curNumber + 1;
                }
                moveSlider(nextNum);
            });
        });
    };

    // функция для точек, вешает обработчик сразу на все точки внутри дива, и генирирует столько же точек, сколько есть в массиве 
    function initDots() {
        pictures.forEach((image, index) => {
            let dot = `<div class='dot n${index} ${index === 0 ? 'active' : ''}' data-index='${index}'></div>`
            sliderDots.innerHTML += dot;
        });

        sliderDots.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', function () {
                moveSlider(this.dataset.index);
                sliderDots.querySelector('.active').classList.remove('active');
                this.classList.add('active');
            })
        })
    };

    // функция для ссылки, вешает обработчик сразу на все ссылки внутри дива, и генирирует столько же ссылок с тайтлами, сколько есть в массиве 
    function initLinks() {
        pictures.forEach((title, index) => {
            let linkDiv = `<li class='project__right_link n${index} ${index === 0 ? 'active' : ''}'
     data-index='${index}' >${pictures[index].title}</li>`;
            sliderLinks.innerHTML += linkDiv;
        });
        sliderLinks.querySelectorAll('.project__right_link').forEach(linkDiv => {
            linkDiv.addEventListener('click', function () {
                moveSlider(this.dataset.index)
            })
        })
    }


    // добавляем / убираем классы для отображения, выбранного элемента.
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
// включаем / выключаем работу опционных функций в коде
let sliderOptions = {
    titles: true,
    dots: true
}
// подлючаем в обработчик оциональную функцию, без этого включение / выключение работать не будет.
document.addEventListener('DOMContentLoaded', () => {
    initSlider(sliderOptions);
});

// просто запустит код, как он написан
// document.addEventListener('DOMContentLoaded', initSlider);