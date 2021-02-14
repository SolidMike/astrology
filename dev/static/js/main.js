AOS.init({
    duration: 1200,
    easing: 'ease-in-out-back'
});

$(document).ready(function () {
    svg4everybody({});
});


// Полифилы

// forEach IE 11
if ('NodeList' in window && !NodeList.prototype.forEach) {
    console.info('polyfill for IE11');
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

// closest IE 11
(function () {
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();

// matches IE 11
(function () {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();

//Array.form IE 11
if (!Array.from) {
    Array.from = function (object) {
        'use strict';
        return [].slice.call(object);
    };
}

var swiperReviews = new Swiper('.reviews__slider', {
    spaceBetween: 30,
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        640: {
            slidesPerView: 2,
        },
        1051: {
            slidesPerView: 1,
            slidesPerGroup: 1,
        }
    }
});

function togglePass(event) {
    const target = event.target
    const passInput = target.nextElementSibling
    if (passInput.type === "password") {
        passInput.type = "text";
        target.classList.remove('is-active')
    } else {
        passInput.type = "password";
        target.classList.add('is-active')
    }
}

$('input[type="file"]').change(function(){
    var value = $("input[type='file']").val();
    if (value) $('.js-value').text(value + ' Загружен').css({display: 'block', margin: '0 auto'});
});

function uploadFile() {
    const uploadBtn = document.querySelectorAll('.form-cell__file-field')
    uploadBtn.forEach(function (elem) {
        elem.addEventListener('click', function () {
            this.previousElementSibling.click()
        })
    })
}
uploadFile()

//tabs
const tab = function () {
    let tabNav = document.querySelectorAll('.tabs-nav__item'), // Выбираем элементы навигации табов
        tabContent = document.querySelectorAll('.tabs-content__item'), // Выбираем самы табы
        tabName; // Переменная для имени таба

    // Проходим циклом по каждому элементу навигации и навешиваем обработчик клика, который вызывает функцию selectTabNav
    tabNav.forEach((item) => {
        item.addEventListener('click', selectTabNav)
    });

    function selectTabNav() {
        tabNav.forEach((item) => {
            // Удаляем активный класс у всех элементов навигации табов
            item.classList.remove('is-active');
            item.classList.replace('btn_default', 'btn_transparent')
        });
        this.classList.add('is-active');  // Добавляем активный укласс у элемента по которому кликнули
        this.classList.replace('btn_transparent', 'btn_default')
        tabName = this.getAttribute('data-tab-name'); // Получаем имя таба, который нам нужен
        selectTabContent(tabName); // Запускаем функцию, чтобы показать выбранный таб
    }

    function selectTabContent(tab) {
        // Проходим по всем табам и проверяем есть ли у элемента класс, равный имени таба(переменной tabName). Если есть, то добавляем класс активного таба, если нет, то удаляем этот класс
        tabContent.forEach((item) => {
            let classList = item.classList;
            classList.contains(tab) ? classList.add('is-active') : classList.remove('is-active');
        });
    }
};

tab();


//menu
const sandwichToggle = function () {
    // Выбираем элементы, которые нам нужны. В примере мы ищем элементы с классом "sandwich"
    let sandwichElements = document.querySelectorAll('.sandwich');
    // Проходим циклом по всем эдементам и на каждый элемент вешаем слушателя, который по клику будет переключать класс
    sandwichElements.forEach((item) => {
        item.addEventListener('click', showSandwichTarget);
    });

    function showSandwichTarget() {
        let targetId = this.getAttribute('data-target-id'),
            targetClassToggle = this.getAttribute('data-target-class-toggle');
        this.classList.toggle('is-active');
        if (targetId && targetClassToggle) {
            document.getElementById(targetId).classList.toggle(targetClassToggle);
        }
        $(document).mouseup(function(e)
        {
            var container = $(".nav-mobile");

            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0)
            {
                document.querySelector('.sandwich').classList.remove('is-active');
                document.getElementById(targetId).classList.remove(targetClassToggle);
            }
        });
    }
};
sandwichToggle();

const navMobile = document.querySelector('.nav-mobile')
const navHeader = document.querySelector('.header__nav')
const dropdownhHeader = document.querySelector('.header__dropdown')
const socialsHeader = document.querySelector('.header__socials')
const btnHeader = document.querySelector('.header__btn')
const topPanelHeader = document.querySelector('.header__top-panel')
const sandwich = document.querySelector('.sandwich')
//const phonesHeader = document.querySelectorAll('.contacts__item_mobile_sandwich')
const contactsHeader = document.querySelector('.header__contacts')
const loginHeader = document.querySelector('.header__login')
$(window).on("load resize", function () {
    if($(window).width() <= 1050){
        navMobile.appendChild(contactsHeader)
    } else {
        document.querySelector('.header__top-panel').prepend(contactsHeader)
    }
    if($(window).width() <= 910){
        navMobile.appendChild(navHeader)
    } else {
        document.querySelector('.header__content').appendChild(navHeader)
    }
    if($(window).width() <= 690){
        navMobile.appendChild(btnHeader)
    } else {
        document.querySelector('.header__btns').insertBefore(btnHeader, sandwich)
    }
    if($(window).width() <= 470){
        navMobile.appendChild(socialsHeader)
    } else {
        topPanelHeader.insertBefore(socialsHeader, dropdownhHeader)
    }
/*    if($(window).width() <= 500){
        navMobile.appendChild(socialsHeader)
        for (let i = 0; i < phonesHeader.length; i++) {
            navMobile.appendChild(phonesHeader[i])
        }
    } else {
        topPanelHeader.appendChild(socialsHeader)
        for (let i = 0; i < phonesHeader.length; i++) {
            contactsHeader.prepend(phonesHeader[i])
        }
    }*/
}).resize();

$(window).on("load resize", function () {
    if (this.matchMedia("(max-width: 910px)").matches) {
        const menu = $('.menu')
        const menuLink = menu.find('a')

        menuLink.on('click', function(event){
            event.preventDefault()
            if ($(this).parent().hasClass('active') && $(this).parent().children('.submenu').length > 0) {
                if ($(this).length && $(this).attr('href')) {
                    location.href = $(this).attr('href');
                }
            } else if ($(this).parent().children('.submenu').length === 0) {
                if ($(this).length && $(this).attr('href')) {
                    location.href = $(this).attr('href');
                }
            }

            $(this).closest('li').toggleClass('active')
        })
    }
})

$(function () {
    $('nav ul li a').each(function () {
        var location = window.location.href;
        var link = this.href;
        if(location == link) {
            $(this).parents('li').addClass('active');
        }
    });
});

$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() != 0) {
            $('.header').addClass('header_fixed');
        } else {
            $('.header').removeClass('header_fixed');
        }
    });
})

//fancybox modals & gallery
$(document).ready(function() {
    $(".modal-btn").fancybox();

    $('[data-fancybox="gallery"]').each(function () {
        const relValue = $(this).attr('rel')
        $('[data-fancybox="gallery"][rel="'+relValue+'"]').fancybox({})
    })
})

//btn up
$(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop()!=0) {
            $('#toTop').fadeIn(500);
        }
        else {
            $('#toTop').fadeOut(500);
        }
    });
    if ($(this).scrollTop()!=0) {
        $('#toTop').fadeIn();
    }
    else {
        $('#toTop').fadeOut();
    }
    $('#toTop').click(function() {
        $('body,html').animate({scrollTop:0},800);
    });
});

//maskedInput
$(function(){
    $('input[name="phone"]').mask("+7 (999) 999-99-99");
});

//parallax
var parallaxInstance, scene = document.getElementById('scene');
null !== scene && (parallaxInstance = new Parallax(scene));
