import { getResource } from "../services/services";

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



    getResource('http://localhost:3000/menu')
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

export default cards;