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

export default slides;