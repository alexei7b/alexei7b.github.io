const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu__close');
overlay = document.querySelector('.menu__overlay');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});
closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});
overlay.addEventListener('click', () => {
    menu.classList.remove('active');
})

const counters = document.querySelectorAll('.skills__ratings-counter'),
    lines = document.querySelectorAll('.skills__ratings-line span');


counters.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
});



emailjs.init({
    publicKey: "QiNsWYQ7gNsdDV_YL",
});


const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(
        "service_3py76bg", // Service ID
        "template_ejohnmj",
        this
    )
        .then(() => {
            alert("Message sent!");
            form.reset();
        })
        .catch((error) => {
            alert("Error");
            console.log(error);
        });

});