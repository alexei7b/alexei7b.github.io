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
        // добавим дополнительные переменные 
        addForm = document.querySelector('form.add'),  // наша фарма
        addInput = addForm.querySelector('.adding__input'),  // инпут куда вводим фильм
        checkbox = addForm.querySelector('[type="checkbox"]');  // чек бокс
    const genre2 = document.getElementsByClassName('promo__genre');



    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const newFilm = addInput.value;
        const favorite = checkbox.checked;


        movieDB.movies.push(newFilm);
        // применим  созданные нами ф-ции в addEventListener
        // 5 - 
        sortArr(movieDB.movies);
        // 6- 
        createMovieList(movieDB.movies, movieList);

        // 7 - очищаем форму, что исчезли данные
        event.target.reset();

    });

    // 1 - 
    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };



    // 2 - 
    const makeChanges = () => {
        genre.textContent = 'драма';

        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };

    // 3 - 
    const sortArr = (arr) => {
        arr.sort();
    };



    function createMovieList(films, parent) {

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

    // 4- вызовем ф-ции
    deleteAdv(adv);
    makeChanges();
    sortArr(movieDB.movies);


    createMovieList(movieDB.movies, movieList);
});