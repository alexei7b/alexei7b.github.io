// 1 Меняем старый синтаксис на новый из стандарта ES6


import tabs from './modules/tabs';
import modal from './modules/modal_2';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calculator';
import form from './modules/form_2';
import slides from './modules/slides';
import { openModal } from './modules/modal_2';

document.addEventListener('DOMContentLoaded', () => {

    const timeModalId = setTimeout(() => openModal('.modal', timeModalId), 3000);


    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', timeModalId);
    timer('.timer', '2024-11-30');
    cards();
    calc();
    form('form', timeModalId);
    // slides({
    //     container: '.offer__slider',
    //     nextArrow: '.offer__slider-next',
    //     prevArrow: '.offer__slider-prev',
    //     totalCounter: '#total',
    //     currentCounter: '#current',
    //     wrapper: '.offer__slider-wrapper',
    //     field: '.offer__slider-inner'

    // });
    slides({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });



    // 1 Меняем старый синтаксис на новый из стандарта ES6 // export default form;

    // Далее фиксим баги у нас есть в файле form.js обращение к ф-циям openModal, closeModal
    // 1 - в файле modal.js выносим эти две ф-ции вверх за ф-цию modal
    // 2 - в низу делаем именнованный експорт этих двух ф-ций, 
    // export { closeModal };
    // export { openModal };

    // 3 в файле форм (form.js) делаем импорт этих двух ф-ций
    // import { closeModal, openModal } from "./modal";

    // Будет ошибка в файле modal.js т.к. в функциях openModal, closeModal, мы обращаемся к переменной modal, котор. объявленна внутри ф-ции modal и пока мы не имеем доступа к ней
    // Далее углубляемся в инкапсуляцию
    // Каждый модуль должен быть независим друг от друга. Это не значит что мы не можем вызывать один модуль внутри другого, как это сделанно в closeModal и openModal
    // Это значит что они не должны привязываться к одим и тем же сущностям, как это у нас получилось с переменной modal
    // И по мимо этого кадый модуль может быть вызван несколько раз для одних и тех же элементов (это частая практика) ведь таймеров или калькуляторов может быть несколько на странице.
    // И все они будут использовать разные селекторы или элементы
    // В слайдере и в модальном окне мы жестко задали селекторы котор. будут использоваться на странице, но если мы захотим создать еще один слайдер, тогда нам необходимо будет дублировать код.
    // Либо мы можем создавать модули так что бы они зависили только от аргументов которые в них передаются т.е. все селекторы могут быть переданны как агрументы ф-ции slider или modal.
    // И уже на этапе вызова ф-ции они будут срабатывать на определенных элементах на страницах 

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
    // function openModal(modalSelector timeModalId)

    // и далее в ф-ции openModal мы делаем проверку, если существует timeModalId, то тогда запишим очистку нашего таймера т.к. это нам нужно не в каждом случае
    // if(timeModalId){
    //     clearInterval(timeModalId);
    // }


    // 9 
    // Т.к. timeModalId вызывается у нас не только в ф-ции openModal а и в самой ф-ции modal, нам нужно его передать в частве аргумента в саму ф-цию modal
    // function modal(triggerSelector, modalSelector, timeModalId) 

    // 10 Теперь этот timeModalId, нужно передать везде где вызывается ф-ция openModal, внутри ф-ции modal
    // () => openModal(modalSelector, timeModalId)

    // 11 Теперь главный вопрос от куда будет прихоить этот timeModalId? Т.к. он будет использоваться в файле modal.js и forms.js
    // нам лучше всего взять и создать его в основном файле (srcipt.js) для нас сейчас это PR25.js
    // вырезаем эту часть 
    // const timeModalId = setTimeout(openModal, 4000);
    //  вставляем его сюда вверху и модифицируем в стрелочную ф-цию
    // const timeModalId = setTimeout(() => openModal('.modal', timeModalId), 3000);

    // также в вызов самого modal, передадим timeModalId
    // modal('[data-modal]', '.modal', timeModalId);

    // 12 Импортируем в гл. файл ф-цию openModal
    // import { openModal } from './modules/modal_2';


    // 13 В файле form_2.js передадим агрумент timeModalId в функцию openModal. В свою очередь у нас есть ф-ция form, коротая содержит ф-цию openModal
	// а это значит что агрумент timeModalId, так же нужно передать и в ф-ию form

    // передадим timeModalId в саму ф-цию form
    // function form(timeModalId)
    // form(timeModalId);

    // 14
    //  В ф-ции form так же есть жестко заданный параметр
    //const forms = document.querySelectorAll('form');
    // Передадим этот параметр как первый аргумент в  в функцию form
    // function form(formSelector, timeModalId) {

    // form('form', timeModalId);

    // 15
    // В файле forms.js в ф-ции form мы можем встретить ф-цию postData. Она работает с сервером и в проекте она может пригодиться где угодно,
    // как и ф-ция getResource. Такие ф-ции называют сервисами  и выносят в отдельную папку и файлы
    // Внутри папки js создадим папку serivces и файл services.js
    // Вырежем ф-цию postData и вставим туда
    // Внизу файла сделаем экспорт этой ф-ции
    // И далле в файл forms_2.js мы импортируем эту ф-цию 
    // import { postData } from "../services/services";

    // 16 модуль с карточками (cards.js)
    // тут есть ф-ция getResource(), так же ее вырежем и подставим в файл services.js

    // 17 модуль tabs.js
    // Тут есть 4 параметра которые мы могли бы подставить (tabs, tabContent, tabParent и класс активности)
    // Заменим это 
    // function tabs(tabsSelector, tabContentSelector, tabParentSelector, activeClsass) {

    //     const tabs = document.querySelectorAll(tabsSelector),
    //         tabContent = document.querySelectorAll(tabContentSelector),
    //         tabParent = document.querySelector(tabParentSelector);

    // item.classList.remove('activeClsass');

    // Теперь передадим аргументы в нашу ф-ию в этом файле
    // tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');

    // ! Это не точно что будет ошибка
    // Так же в ф-ции tabs будет ошибка т.к. мы обращаемся внутри нее к такому параметру - tabheader__item
    // if (target && target.classList.contains('tabheader__item'))

    // тут есть разница в одном случае вверху мы передаем с точкой (tabsSelector) а в условии без, значит заменим на такой синтаксис
    // if (target && target.classList.contains(tabsSelector.slice(1)))  - формируем строку без первого символа


    // 18 timer
    // добавим в ф-цию setClock параметр id, и deadLine
    // setClock(id, deadLine);
    // function timer(id, deadLine){}
    // далее можно убрать переменную  const deadLine = '2024-05-11'; т.к. данный параметр будет передаваться напрямую в ф-цию в этом файле
    //  timer('.timer', '2024-11-30');   -- вызовем ф-цию

    // 19 Slider
    // Откроем slick slider, по его принципу реализуем наш слайдер 
    // Сделаем деструктуризацию объекта

    // function slides({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
    //     let slideIndex = 1;
    //     let offset = 0;

    //     const slides = document.querySelectorAll(slide),
    //         next = document.querySelector(nextArrow),
    //         prev = document.querySelector(prevArrow);
    //     const total = document.querySelector(totalCounter),
    //         current = document.querySelector(currentCounter);
    //     const slidesWrapper = document.querySelector(wrapper),
    //         slideInner = document.querySelector(field),
    //         slideWidth = window.getComputedStyle(slidesWrapper).width;
    //     const slider = document.querySelector(container);


    // slides({
    //     container: '.offer__slider',
    //     nextArrow: '.offer__slider-next',
    //     prevArrow: '.offer__slider-prev',
    //     totalCounter: '#total',
    //     currentCounter: '#current',
    //     wrapper: '.offer__slider-wrapper',
    //     field: '.offer__slider-inner'

    // });

});