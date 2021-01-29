function checkPagePosition() {
    let activeLink = document.querySelector('.main-nav__link.active');
    let activeIndicator = document.querySelector('.active-indicator');
    let activeLinkWidth = activeLink.offsetWidth;
    let activeLinkPosition = activeLink.getBoundingClientRect();

    console.log(activeLinkPosition);

    gsap.to(activeIndicator, {
        duration: 0,
        width: activeLinkWidth,
        left: activeLinkPosition.left,
    });
}

// —————————————————————————————————————————————————————
// Check browser & and inform user if it is out of date
// —————————————————————————————————————————————————————
var $buoop = {
    required: {
        e: -6,
        f: -6,
        o: -6,
        s: -4,
        c: -6
    },
    insecure: true,
    api: 2019.11
};

function $buo_f() {
    var e = document.createElement("script");
    e.src = "//browser-update.org/update.min.js";
    document.body.appendChild(e);
};
try {
    document.addEventListener("DOMContentLoaded", $buo_f, false)
} catch (e) {
    window.attachEvent("onload", $buo_f)
}



// —————————————————————————————————————————————————————
// add class to target users with js or no js
// —————————————————————————————————————————————————————
document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");


// —————————————————————————————————————————————————————
// is touch device
// —————————————————————————————————————————————————————
function is_touch_device() {
    var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    var mq = function (query) {
        return window.matchMedia(query).matches;
    }
    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
        return true;
    }
    var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
}

// —————————————————————————————————————————————————————
// is keyboard user
// —————————————————————————————————————————————————————
(function () {
    'use strict';

    function keyboardFocus (e) {
        if (e.keyCode !== 9) {
            return;
        }

        switch (e.target.nodeName.toLowerCase()) {
            case 'input':
            case 'select':
            case 'textarea':
                break;
            default:
                document.documentElement.classList.add('keyboard-focus');
                document.removeEventListener('keydown', keyboardFocus, false);
        }
    }

    document.addEventListener('keydown', keyboardFocus, false);
})();

// Remember to minimize this file before putting into production site



$(document).ready(function () {
    // —————————————————————————————————————————
    // L O C O M O T I V E
    // —————————————————————————————————————————
    scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        smoothMobile: true
    });
    scroll.init();

    // —————————————————————————————————————————————————————
    // scroll events 
    // —————————————————————————————————————————————————————
    $(window).scroll(function () {

    });

    // —————————————————————————————————————————————————————
    // site navigation
    // —————————————————————————————————————————————————————
    checkPagePosition();

    $('.main-nav__link').click(function(){
        // proper classes
        $('.main-nav__link').removeClass('active');
        $(this).addClass('active');

        checkPagePosition();
    });




    // —————————————————————————————————————————————————————
    // search dropdown
    // —————————————————————————————————————————————————————
    var clicked = false;
    
    $('#toggleSearch').click(function() {
        toggleBtnClick();
    });  
    
    $('#searchClose').click(function() {
        toggleBtnClick();
    });
    
    function toggleBtnClick() {
        if (clicked) {
            $('#searchContainer').addClass('search--hide');
            clicked = false;
        } else {
            $('#searchContainer').removeClass('search--hide');
            clicked = true;
            $('#s').focus();
        }
    }

    // —————————————————————————————————————————
    // Home logo color change
    // —————————————————————————————————————————
    window.onscroll = function () {
        let scrollPosition = window.pageYOffset;
        let pageHeight = window.innerHeight - 60;

        if (scrollPosition > pageHeight) {
            gsap.to(".dark-header", {
                opacity: 1,
                duration: 0,
                display: "inline-block"
            });
            gsap.to(".light-header", {
                opacity: 0,
                duration: 0,
                display: "none"
            });
        } else if (scrollPosition < pageHeight) {
            gsap.to(".dark-header", {
                opacity: 0,
                duration: 0,
                display: "none"
            });
            gsap.to(".light-header", {
                opacity: 1,
                duration: 0,
                display: "inline-block"
            });
        }
    };

    // —————————————————————————————————————————————————————
    // work slider
    // —————————————————————————————————————————————————————
    $('.work__slider').flickity({
        cellSelector: '.work__slider__cell',
        contain: false,
        initialIndex: 2,
        wrapAround: true,
        adaptiveHeight: true,
        percentPosition: false,
        prevNextButtons: false,
        pageDots: false,
      });


    // —————————————————————————————————————————————————————
    // mobile navigation starter
    // —————————————————————————————————————————————————————
    // set vars to "nav is closed"
    var clickedNav = false;
    
    // --------------------------------- toggleNav Function
    function toggleNav() {
        // if var is true (nav is open), then close the nav and reset the var to false (nav is closed)
        if (!clickedNav) {
            TweenMax.to( $('#navContainer'), 1, {
                ease: Elastic.easeOut.config(1, 0.75),
                top: "0"
            });
            clickedNav = false;
        }
    }
    
    // if the nav button is clicked, execute function
    jQuery('#toggleNav').click(function () {
        toggleNav();
    });
    
    // --------------------------------- closeNav Function
    function closeNav() {
        clickedSubNav = false;
        // close main nav
        TweenMax.to( $('#navContainer'), .75, {
            ease: Elastic.easeIn.config(1, 0.75),
            top: "-100vh"
        });
        // reset the var to false/closed
        clickedSubNav = false;
    }
    
    // if the close (x) button is clicked, execute the function
    jQuery('#closeNav').click(function () {
        closeNav();
    });




}); // end document.ready