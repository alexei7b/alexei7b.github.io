// 3 в файле форм делаем експорт этих двух ф-ций
import { closeModal, openModal } from "./modal_2";
import { postData } from "../services/services";

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

            postData('http://localhost:3000/requests', json)
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
        openModal('.modal', timeModalId);

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
            closeModal('.modal');
        }, 3000);
    }
}

export default form;