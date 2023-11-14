$(document).ready(function () {


    $('.carousel__inner').slick({
        speed: 1200,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: false,
                    dots: true
                }
            }
        ]


    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab-active)', function () {
        $(this)
            .addClass('catalog__tab-active').siblings().removeClass('catalog__tab-active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content-active').eq($(this).index()).addClass('catalog__content-active');
    });

    // $('.catalog-item__link').each(function (i) {
    //     $(this).on("click", function (e) {
    //         e.preventDefault();
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
    //     })
    // });

    // $('.catalog-item__back').each(function (i) {
    //     $(this).on("click", function (e) {
    //         e.preventDefault();
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
    //     })
    // });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on("click", function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
            })
        });
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');


    // Modal

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });
    // $('.button__mini').on('click', function () {
    //     $('.overlay, #order').fadeIn('slow');
    // });
    $('.button__mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });


    // validation forms

    // $('#consultation-form').validate({
    //     rules: {
    //         // simple rule, converted to {required:true}
    //         name: {
    //             required: true,
    //             minlength: 5
    //         },
    //         phone: "required",

    //         // compound rule
    //         email: {
    //             required: true,
    //             email: true
    //         }
    //     },
    //     messages: {
    //         name: {
    //             required: "Please specify your name",
    //             minlength: jQuery.validator.format("At least {0} characters required!"),
    //             phone: {
    //                 required: "We need your phone number",
    //                 phone: "Your phone must have digits"
    //             },
    //             email: {
    //                 required: "We need your email address to contact you",
    //                 email: "Your email address must be in the format of name@domain.com"
    //             }
    //         }
    //     }
    // });
    // $('#consultation form').validate({
    //     rules: {
    //         // simple rule, converted to {required:true}
    //         name: {
    //             required: true,
    //             minlength: 2
    //         },
    //         phone: "required",

    //         // compound rule
    //         email: {
    //             required: true,
    //             email: true
    //         }
    //     },
    //     messages: {
    //         name: {
    //             required: "Please specify your name",
    //             minlength: jQuery.validator.format("At least {0} characters required!"),
    //             phone: {
    //                 required: "We need your phone number",
    //                 phone: "Your phone must have digits"
    //             },
    //             email: {
    //                 required: "We need your email address to contact you",
    //                 email: "Your email address must be in the format of name@domain.com"
    //             }
    //         }
    //     }
    // });
    // $('#order form').validate();

    validateForm('#consultation-form');
    validateForm('#consultation form');
    validateForm('#order form');

    function validateForm(form) {
        $(form).validate({
            rules: {
                // simple rule, converted to {required:true}
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",

                // compound rule
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Please specify your name",
                    minlength: jQuery.validator.format("At least {0} characters required!"),
                    phone: {
                        required: "We need your phone number",
                        phone: "Your phone must have digits"
                    },
                    email: {
                        required: "We need your email address to contact you",
                        email: "Your email address must be in the format of name@domain.com"
                    }
                }
            }
        });
    }

    // mask input
    $('input[name=phone]').mask("+7 (999) 999-99-99");


    //
    $('form').submit(function (e) {
        e.preventDefault();
        if (!$(this).valid()) {
            return;
        }
        $.ajax({
            type: "POST",
            url: "../mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });


    // Smooth scroll and pageup

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        }
        else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^='#']").click(function () {
        const _href = $(this).attr("href");
        $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
        return false;
    });


    new WOW().init();

});




// $(document).on("ready", function () {
//     $('.carousel__inner').slick();
// });


