/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/PR25/modules/calculator.js":
/*!***************************************!*\
  !*** ./js/PR25/modules/calculator.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);
        document.querySelector(parentSelector).addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
                ratio = e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', ratio);
            } else {
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', sex);
            }

            elements.forEach(elem => {
                elem.classList.remove(activeClass);
            });
            e.target.classList.add(activeClass);
            calcTotal();
        })
    }

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDinamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', sex);
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', ratio);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
        });

    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/PR25/modules/cards.js":
/*!**********************************!*\
  !*** ./js/PR25/modules/cards.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/PR25/services/services.js");


function cards() {
    class menuCARD {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.transfer = 27;
            this.parent = document.querySelector(parentSelector);
            this.changeToUAH();
            this.classes = classes;
        }
        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        render() {
            const elements = document.createElement('div');
            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                elements.classList.add(this.classes);
            } else {
                this.classes.forEach(className => elements.classList.add(className));
            }

            elements.innerHTML = `
                     
                        <img src="${this.src}" alt="${this.alt}">
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.descr}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                            <div class="menu__item-cost">Цена:</div>
                            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                        </div>
        
            `;

            this.parent.append(elements);
        }
    }



    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new menuCARD(img, altimg, title, descr, price, '.menu .container').render();;
            });
        })

    // axios('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({ img, altimg, title, descr, price }) => {
    //             new menuCARD(img, altimg, title, descr, price, '.menu .container').render();;
    //         });
    //     });


    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         createCart(data);
    //     });

    // function createCart(data) {
    //     data.forEach(({ img, altimg, title, descr, price }) => {
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //         <img src="${img}" alt="${altimg}">
    //         <h3 class="menu__item-subtitle">${title}</h3>
    //         <div class="menu__item-descr">${descr}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена</div>
    //             <div class="menu__item-total">${price}</div>
    //         </div>
    //     `;

    //         document.querySelector('.menu .container').append(element);
    //     })
    // }


    // const div = new menuCARD(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     '9',
    //     '.menu .container'

    // );
    // div.render();


    // // еще один элемент альтернативным синтаксисом
    // new menuCARD(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     ' В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     '18',
    //     '.menu .container'
    // ).render();


    // new menuCARD(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     '9',
    //     '.menu .container'
    // ).render();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/PR25/modules/form_2.js":
/*!***********************************!*\
  !*** ./js/PR25/modules/form_2.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal_2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal_2 */ "./js/PR25/modules/modal_2.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/PR25/services/services.js");
// 3 в файле форм делаем експорт этих двух ф-ций



function form(formSelector, timeModalId) {
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'We will call you soon',
        failure: 'Error'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    // const postData = async (url, data) => {
    //     const res = await fetch(url, {
    //         method: 'POST',
    //         Headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: data
    //     });
    //     return await res.json();
    // }



    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display : block;
                margin : 0 auto;
            `;

            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');
            const formData = new FormData(form);
            const obj = {};
            formData.forEach((value, key) => {
                obj[key] = value;
            });
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });

        })
    }

    function showThanksModal(message) {
        const prev = document.querySelector('.modal__dialog');
        prev.classList.add('hide');
        (0,_modal_2__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', timeModalId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>   <!-- (копируем крестик прямо из верстки - это спец символ)данный крестик не будет реагировать на изначально подвешенные события т.к. это динамически создаваемый элемент (на динамически создаваемые элементы обрботчики событий не вешаются), поэтому на нужно делегировать событие и подправить функционал для modalCloseBtn, что бы он работал со всеми кнопками даже теми которые создаются динамически 
            <!--2-->
            <div class="modal__title">${message}</div>
        </div>
        `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prev.classList.add('show');
            prev.classList.remove('hide');
            (0,_modal_2__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 3000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/PR25/modules/modal_2.js":
/*!************************************!*\
  !*** ./js/PR25/modules/modal_2.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
// 1 - в файле modal.js выносим эти две ф-ции вверх за ф-цию modal
// 2 - в низу делаем именнованный експорт этих двух ф-ций, 
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';


}
function openModal(modalSelector, timeModalId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(timeModalId);
    if (timeModalId) {
        clearInterval(timeModalId);
    }
}

function modal(triggerSelector, modalSelector, timeModalId) {
    const modalTrigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);



    modalTrigger.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, timeModalId));
    });

    // dataCloseBtn.addEventListener('click', closeModal);


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            console.log(e.target);
            closeModal(modalSelector);
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    // window.addEventListener('scroll', showModalByScroll);

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, timeModalId);

            window.removeEventListener('scroll', showModalByScroll);
        }
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/PR25/modules/slides.js":
/*!***********************************!*\
  !*** ./js/PR25/modules/slides.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slides({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
    let slideIndex = 1;
    let offset = 0;

    const slides = document.querySelectorAll(slide),
        next = document.querySelector(nextArrow),
        prev = document.querySelector(prevArrow);
    const total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter);
    const slidesWrapper = document.querySelector(wrapper),
        slideInner = document.querySelector(field),
        slideWidth = window.getComputedStyle(slidesWrapper).width;
        const slider = document.querySelector(container);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slideInner.style.width = 100 * slides.length + '%';
    slideInner.style.display = 'flex';
    slideInner.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => slide.style.width = slideWidth);


    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(slideWidth) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(slideWidth);
        }

        slideInner.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        dots.forEach(dot => {
            dot.style.opacity = '.5';
        });
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(slideWidth) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(slideWidth);
        }

        slideInner.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        dots.forEach(dot => {
            dot.style.opacity = '.5';
        });
        dots[slideIndex - 1].style.opacity = 1;
    });


    // slider 

    
    const dots = [];
    slider.style.position = 'relative';
    const indicators = document.createElement('ol');

    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);

        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);

        dots.push(dot);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;

            offset = deleteNotDigits(slideWidth) * (slideTo - 1);

            slideInner.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }
            dots.forEach(dot => {
                dot.style.opacity = '.5';
            });
            dots[slideIndex - 1].style.opacity = 1;
        })
    });

    // function currentSlider() {
    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    //     dots.forEach(dot => {
    //         dot.style.opacity = '.5';
    //     });
    //     dots[slideIndex - 1].style.opacity = 1;
    // }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slides);

/***/ }),

/***/ "./js/PR25/modules/tabs.js":
/*!*********************************!*\
  !*** ./js/PR25/modules/tabs.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabContentSelector, tabParentSelector, activeClsass) {

    const tabs = document.querySelectorAll(tabsSelector),
        tabContent = document.querySelectorAll(tabContentSelector),
        tabParent = document.querySelector(tabParentSelector);

    function hideTabContent() {
        tabContent.forEach(item => {
            // item.style.display = 'none';
            item.classList.remove('show', 'fade');
            item.classList.add('hide');
        });
        tabs.forEach(item => {
            item.classList.remove('activeClsass');
        });
    }
    function showTabContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('activeClsass');
    }

    hideTabContent();
    showTabContent();

    tabParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/PR25/modules/timer.js":
/*!**********************************!*\
  !*** ./js/PR25/modules/timer.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadLine) {


    function getZero(num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function getRemainingTime(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date);
        let days, hours, minutes, seconds;
        if (t < 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor(t / (1000 * 60 * 60) % 24);
            minutes = Math.floor(t / (1000 * 60) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }


        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function setClock(selector, endTime) {
        const total = document.querySelector(selector);
        const days = total.querySelector('#days');
        const hours = total.querySelector('#hours');
        const minutes = total.querySelector('#minutes');
        const seconds = total.querySelector('#seconds');

        const timerID = setInterval(updateClock, 1000);

        updateClock();
        function updateClock() {
            const t = getRemainingTime(endTime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t < 0) {
                clearInterval(timerID);
            }

        }

    }
    setClock(id, deadLine);
    console.log(getRemainingTime(deadLine));
    console.log('hello');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/PR25/services/services.js":
/*!**************************************!*\
  !*** ./js/PR25/services/services.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }
    return await res.json();
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./js/PR25/PR25.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/PR25/modules/tabs.js");
/* harmony import */ var _modules_modal_2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal_2 */ "./js/PR25/modules/modal_2.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/PR25/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/PR25/modules/cards.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calculator */ "./js/PR25/modules/calculator.js");
/* harmony import */ var _modules_form_2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/form_2 */ "./js/PR25/modules/form_2.js");
/* harmony import */ var _modules_slides__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slides */ "./js/PR25/modules/slides.js");
// 1 Меняем старый синтаксис на новый из стандарта ES6











document.addEventListener('DOMContentLoaded', () => {

    const timeModalId = setTimeout(() => (0,_modules_modal_2__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', timeModalId), 3000);


    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal_2__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', timeModalId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2024-11-30');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_form_2__WEBPACK_IMPORTED_MODULE_5__["default"])('form', timeModalId);
    // slides({
    //     container: '.offer__slider',
    //     nextArrow: '.offer__slider-next',
    //     prevArrow: '.offer__slider-prev',
    //     totalCounter: '#total',
    //     currentCounter: '#current',
    //     wrapper: '.offer__slider-wrapper',
    //     field: '.offer__slider-inner'

    // });
    (0,_modules_slides__WEBPACK_IMPORTED_MODULE_6__["default"])({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });



    // 1 Меняем старый синтаксис на новый из стандарта ES6

    // Далее фиксим баги у нас есть в файле form.js обращение к ф-циям openModal, closeModal
    // 1 - в файле modal.js выносим эти две ф-ции вверх за ф-цию modal
    // 2 - в низу делаем именнованный експорт этих двух ф-ций, 
    // export { closeModal };
    // export { openModal };

    // 3 в файле форм делаем импорт этих двух ф-ций
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
    // нам лучше всего взять и создать его в основном файле (srcipt.js) для нас сейчас это PR25.js
    // вырезаем эту часть 
    // const timeModalId = setTimeout(openModal, 4000);
    //  вставляем его сюда вверху и модифицируем в стрелочную ф-цию
    // const timeModalId = setTimeout(() => openModal('.modal', timeModalId), 3000);

    // также в вызов самого modal, передадим timeModalId
    // modal('[data-modal]', '.modal', timeModalId);

    // 12 Импортируем в гл. файл ф-цию openModal
    // import { openModal } from './modules/modal_2';


    // 13 В файле form_2.js модифицируем наши ф-цию openModal  передавая ей аргумент
    // timeModalId т.к. этот аргумент тоже передается в ф-цию опен котор. вызывается внутри ф-ции form
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
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map