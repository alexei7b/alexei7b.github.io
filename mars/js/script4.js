
// 3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)
// У наших елементов списка на старнице есть корзинка при наведении на элемент (class = "delete")
// Вешаем на него обработчик события (клик), на каждый элемент, и указываем если пользователь кликает на нее, то мы удаляем родительский эелемент у корзинки
// Затем вырезать этот элемент из базы данных, метод - splice
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
        addForm = document.querySelector('form.add'),  // наша фарма
        addInput = addForm.querySelector('.adding__input'),  // инпут куда вводим фильм
        checkbox = addForm.querySelector('[type="checkbox"]');  // чек бокс
    const genre2 = document.getElementsByClassName('promo__genre');



    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        // 1 - создадим условие (что бы не было возможности вводить пустую строку)
        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }
            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);

            createMovieList(movieDB.movies, movieList);
        }





        event.target.reset();

    });


    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };




    const makeChanges = () => {
        genre.textContent = 'драма';

        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };


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



        // 1 - получим все корзинки и тут же переберем их т.к. мы их не будем переиспользовать, можно это сделалть тут же
        document.querySelectorAll('.delete').forEach((btn, i) => {
            // i - нумерация нам нужна т.к. нужно знать элементы по порядку
            // вешаем обработчик события и внутри callback функция
            btn.addEventListener('click', () => {
                // обращаемся к родительскому элементу
                btn.parentElement.remove();
                // удалим его из базы данных
                movieDB.movies.splice(i, 1);  // аргумент i отвечает за конкретный элемент, 1 - отвечает за кол-во удаляемых элементов
            });
        });
    }



    deleteAdv(adv);
    makeChanges();
    sortArr(movieDB.movies);


    createMovieList(movieDB.movies, movieList);
});