/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

// Возьмите свой код из предыдущей практики

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };


    const adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = document.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        // 1 -добавим дополнительные переменные 
        addForm = document.querySelector('form.add'),  // наша фарма
        addInput = addForm.querySelector('.adding__input'),  // инпут куда вводим фильм
        checkbox = addForm.querySelector('[type="checkbox"]');  // чек бокс



    // 2- Добавили EventListner
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();  // при нажатии отправить, страница не будет перезагружаться т.к. мы отменили действие по умолчанию

        const newFilm = addInput.value;
        const favorite = checkbox.checked;

        // 3- добавляем фильм в наш список
        movieDB.movies.push(newFilm);
        // 4- сортируем по алфавиту
        movieDB.movies.sort();
    });


    adv.forEach(item => {
        item.remove();
    });


    genre.textContent = 'драма';
    poster.style.backgroundImage = 'url("img/bg.jpg")';


    movieDB.movies.sort();

    // 5 create ф-цию которая будет помещать новый фильм в наш список
    function createMovieList(films, parent) {
        // films - фильмы с которыми будет работать наша ф-ция
        // parent - Блок который будет использовать эти фильмы

        // очищаем родительский элемент
        parent.innerHTML = "";


        films.forEach((film, i) => {
            // поместим фильмы в родительский элемент
            parent.innerHTML += `
            <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
            </li>
            `;
        });
    }



    // 6 вызовем ф-цию createMovieList, для создания изначального списка
    createMovieList(movieDB.movies, movieList);
});