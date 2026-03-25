// 1 Меняем старый синтаксис на новый из стандарта ES6


import tabs from './PR25/modules/tabs';
import modal from './PR25/modules/modal_2';
import timer from './PR25/modules/timer';
import cards from './PR25/modules/cards';
import calc from './PR25/modules/calculator';
import form from './PR25/modules/form_2';
import slides from './PR25/modules/slides';
import { openModal } from '.PR25/modules/modal_2';

document.addEventListener('DOMContentLoaded', () => {

    const timeModalId = setTimeout(() => openModal('.modal', timeModalId), 3000);


    tabs();
    modal('[data-modal]', '.modal', timeModalId);
    timer();
    cards();
    calc();
    form(timeModalId);
    slides();

    // Далее фиксим баги у нас есть в файле form.js обращение к ф-циям openModal, closeModal
    // 1 - в файле modal.js выносим эти две ф-ции вверх за ф-цию modal
    // 2 - в низу делаем именнованный експорт этих двух ф-ций, 
    // export { closeModal };
    // export { openModal };

    // 3 в файле форм делаем експорт этих двух ф-ций
    // import { closeModal, openModal } from "./modal";

    // Будет ошибка в файле modal.js т.к. в функциях openModal, closeModal, мы обращаемся к переменной modal, котор. объявленна внутри ф-ции modal и пока мы не имеем доступа к ней
    // Далее углубляемся в инкапсуляцию
    // Каждый модуль должен быть независим друг от друга. Это не значит что мы не можем вызывать один модуль внутри другого, как это сделанно в closeModal и openModal
    // Это значит что они не должны привязываться к одим и тем же сущностям, как это у нас получилось с переменной modal
    // И по мимо этого кадый модуль может быть вызван несколько раз для одних и тех же элементов (это частая практика) ведь таймеров или калькуляторов может быть несколько на странице. И все они будут использовать разные селекторы или элементы
    // В слайдере и в модальном окне мы жестко задали селекторы котор. будут использоваться на странице, но если мы захотим создать еще один слайдер, тогда нам необходимо будет дублировать код.
    // Либо мы можем создавать модули так что бы они зависили только от аргументов которые в них передаются т.е. все селекторы могут быть переданны как агрументы ф-ции slider или modal. И уже на этапе вызова ф-ции они будут срабатывать на определенных элементах на страницах 

    // 4 
    // В  modal, у нас есть два жестко забитых аргумента  ([data-modal] и .modal)
    // const modalTrigger = document.querySelectorAll('[data-modal]');
    // const modal = document.querySelector('.modal');

    //  Вместо жестко заданных аргументов, передадим в саму ф-цию два аргумента 
    // function modal(triggerSelector, modalSelector) {
    //     const modalTrigger = document.querySelectorAll(triggerSelector);
    //     const modal = document.querySelector(modalSelector);

    //     modalTrigger.forEach(item => {
    //         item.addEventListener('click', openModal);
    //     });

    // 5 
    // Передадим конкретные значения аргументов в момент вызова ф-ции
    // modal('[data-modal]', '.modal');


    // 6 
    // Тоже самое сделаем для ф-ции openModal, closeModal
    // function closeModal(modalSelector) {
    //     const modal = document.querySelector(modalSelector);  // добавим modal что бы получить элемент со страницы
    //     modal.classList.add('hide');
    //     modal.classList.remove('show');
    //     document.body.style.overflow = '';
    // }
    // теперь эта ф-ция не будет знать изначально с чем работать, только по селектору она будет определять какой то элемент и уже с ним работать
    // openModal(modalSelector), 
    // closeModal(modalSelector)

    // 7 
    // Теперь обязательно везде где вызываем эти ф-ции мы должны передать аргумент, но в коде мы вызываем openModal как ф-цию обработчик события, а они объявляются. А уже вызваются сами только после того как будет клик
    // что бы это обойти, создается стрелочная ф-ция, которая оборачивает нашу вызывающуюся ф-цию () => openModal(modalSelector)
    // modalTrigger.forEach(item => {
    //     item.addEventListener('click', () => openModal(modalSelector));
    // });


    // !!! Cложно modal_2
    // 8 Т.к. ф-ция oepnModal работает с timeModalId, нам необходимо получить его ввиде аргумента
    // function openModal(modalSelectorб timeModalId)

    // и далее мы делаем проверку, если существует timeModalId, то тогда запишим очистку нашего таймера т.к. это нам нужно не в каждом случае
    // if(timeModalId){
    //     clearInterval(timeModalId);
    // }


    // 9 
    // Т.к. timeModalId вызывается у нас не только в ф-ции openModal а и в самой ф-ции modal, нам нужно его передать в частве аргумента в саму ф-цию modal
    // function modal(triggerSelector, modalSelector, timeModalId) 

    // 10 Теперь этот timeModalId, нужно передать везде где вызывается ф-ция openModal, внутри ф-ции modal
    // () => openModal(modalSelector, timeModalId)

    // 11 Теперь главный вопрос от куда будет прихоить этот timeModalId? Т.к. он будет использоваться в файле modal.js и forms.js
    // нам лучше всего взять и создать его в основном файле (srcipt.js) для нас сейчас это PR24.js
    // вырезаем эту часть 
    // const timeModalId = setTimeout(openModal, 4000);
    //  вставляем его сюда вверху и модифицируем в стрелочную ф-цию
    // const timeModalId = setTimeout(() => openModal('.modal', timeModalId), 3000);

    // также в вызов самого modal, передадим timeModalId
    // modal('[data-modal]', '.modal', timeModalId);

    // 12 Импортируем в гл. файл ф-цию openModal
    // import { openModal } from './modules/modal_2';


    // 13 В файле form_2.js модифицируем наши ф-ции openModal и closeModal передавая им аргументы 
    // timeModalId т.к. этот аргумент тоже передается в ф-цию опен котор. вызывается внутри ф-ции form
    // передадим timeModalId в саму ф-цию form
    // function form(timeModalId)
    // form(timeModalId);


});