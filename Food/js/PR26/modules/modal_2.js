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

export default modal;
export { closeModal };
export { openModal };