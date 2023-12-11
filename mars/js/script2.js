'use strict';


const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const adv = document.querySelectorAll('.promo__adv img');
const genre = document.querySelector('.promo__genre');
const poster = document.querySelector('.promo__bg');

adv.forEach(function (item) {
    item.remove();
})

genre.textContent = 'Драма';


poster.style.backgroundImage = 'url("img/bg.jpg")';