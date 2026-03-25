
// 5) Фильмы должны быть отсортированы по алфавиту 
// При удаления элементов из списка, сортировка теряется, для этого добавим ф-цию sort в нашу ф-цию createMovieList

//4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
// "Добавляем любимый фильм"
// Это работа с нашими checkbox (переменная favorite)

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




    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;



        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            // если галочка нажата (true) выведем  в консоль

            if (favorite) {
                console.log('Любимый фильм');
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
        // 1 - помещаем ф-цию sort  в наш createMovieList
        sortArr(films);

        films.forEach((film, i) => {

            parent.innerHTML += `
            <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
            </li>
            `;
        });




        document.querySelectorAll('.delete').forEach((btn, i) => {

            btn.addEventListener('click', () => {

                btn.parentElement.remove();

                movieDB.movies.splice(i, 1);

                // Используем рекурсию для того что бы нумерация заново перестраивалась, после удаления элемента
                // за это у нас отвечает ф-ция createMovieList
                createMovieList(films, parent);
            });
        });
    }



    deleteAdv(adv);
    makeChanges();



    createMovieList(movieDB.movies, movieList);
});