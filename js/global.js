function checkPagePosition() {
    let activeLink = document.querySelector('.main-nav__link.active');
    let activeIndicator = document.querySelector('.active-indicator');
    let activeLinkWidth = activeLink.offsetWidth;
    let activeLinkPosition = activeLink.getBoundingClientRect();

    gsap.to(activeIndicator, {
        duration: 0,
        width: activeLinkWidth,
        left: activeLinkPosition.left,
    });
}

// —————————————————————————————————————————
// Set nav highlight
// http://jsfiddle.net/bfd7w/2/
// —————————————————————————————————————————
function checkPagePositionScrolled(el) {
    var topOfObject = el.offset().top;
    var bottomOfWindow = $(window).scrollTop() + window.innerHeight;
    let currentSection = el.attr('id');
    if (bottomOfWindow >= topOfObject) {
        if (currentSection != undefined) {
            $('.main-nav__link').removeClass('active');
            $('.' + currentSection).addClass('active');
        }
    }

    checkPagePosition();
};


// —————————————————————————————————————————————————————
// add class to target users with js or no js
// —————————————————————————————————————————————————————
document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");

function a11yClick(event) {
    // —————————————————————————————————————————
    // Accessible Click function
    // —————————————————————————————————————————
    if (event.type === "click") {
        return true;
    } else if (event.type === "keypress") {
        var code = event.charCode || event.keyCode;
        if (code === 32 || code === 13) {
            return true;
        }
    } else {
        return false;
    }
};

// —————————————————————————————————————————————————————
// is keyboard user
// —————————————————————————————————————————————————————
(function () {
    'use strict';

    function keyboardFocus(e) {
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

function accordion() {
    let expanderContainer = document.querySelectorAll(".expander");
    if (expanderContainer) {
        $(".expander").on("click keypress", function (event) {
            if (a11yClick(event) === true) {
                $(this).find(".expander__content").toggleClass("visible");
                let clickedHeight = $(this).find(".expander__content__wrapper").height();

                gsap.to($(this).find(".expander__content"), {
                    duration: .5,
                    height: 0,
                    easing: Power4.easeOut,
                });
                gsap.to($(this).find(".expander__content.visible"), {
                    duration: .5,
                    height: clickedHeight,
                    easing: Power4.easeOut,
                });

                $(this).find(".expander__content").prev('h5').toggleClass("open");
            }
        });
    }
}

// Remember to minimize this file before putting into production site
document.addEventListener("DOMContentLoaded", function (event) {
    accordion();

    // —————————————————————————————————————————————————————
    // work slider
    // —————————————————————————————————————————————————————
    $('.work__slider').flickity({
        cellSelector: '.work__slider__cell',
        contain: false,
        initialIndex: 2,
        wrapAround: false,
        adaptiveHeight: true,
        percentPosition: false,
        prevNextButtons: true,
        pageDots: false,
        arrowShape: "M100 50V43.5185H23.22L54.72 9.07408L45 0L0 50L45 100L54.72 90.9259L23.22 56.4815H100V50Z",
    });

}); // end dom content loaded

window.addEventListener("load", function () {
    window.dispatchEvent(new Event('resize'));
});

if (window.inEditorMode) {
    // do not load locomotive scroll and other scroll events
} else {

    document.addEventListener("DOMContentLoaded", function (event) {


        // —————————————————————————————————————————————————————
        // site navigation
        // —————————————————————————————————————————————————————
        checkPagePosition();

        $('.main-nav__link').on('click', function (event) {
            event.preventDefault();

            // proper classes
            $('.main-nav__link').removeClass('active');
            $(this).addClass('active');

            let clickedLink = $(this);

            setTimeout(function () {
                let clickedSection = clickedLink[0].hash;
                let clickedSectionNode = $(clickedSection);
                let clickedNode = clickedSectionNode[0];

                // smooth scroll to the anchor id
                scroll.scrollTo(clickedNode,
                    options = { offset: -150 }
                );

            }, 100);

            checkPagePosition();
        });
        
        $('.back-to-top').on('click', function (event) {
            let clickedNode = document.getElementById("contentStart");
            
            setTimeout(function () {
                // smooth scroll to the top of the page
                scroll.scrollTo(clickedNode);
            }, 100);

            checkPagePosition();
        });

        // —————————————————————————————————————————
        // L O C O M O T I V E
        // —————————————————————————————————————————
        const scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            smartphone: {
                smooth: true
            },
            tablet: {
                smooth: true
            },
            reloadOnContextChange: true,
            lerp: 0.13
        });
        scroll.destroy()

        setTimeout(function () {
            scroll.init()
            $('body').removeClass('stop-scrolling');
        }, 1000);


        // —————————————————————————————————————————————————————
        // A to B Lottie
        // —————————————————————————————————————————————————————
        let desktopGraphic = document.querySelector('.graphic-layer__graphic--dekstop');
        var desktopLottie = bodymovin.loadAnimation({
            container: desktopGraphic,
            path: '/js/IllustrationHumanature.json', //used to be '/js/a-to-b-desktop.json'
            renderer: 'svg',
            loop: false,
            autoplay: false,
        });

        let mobileGraphic = document.querySelector('.graphic-layer__graphic--mobile');
        var mobileLottie = bodymovin.loadAnimation({
            container: mobileGraphic,
            path: '/js/IllustrationHumanatureMobile.json', //used to be '/js/a-to-b-mobile.json'
            renderer: 'svg',
            loop: false,
            autoplay: false,
        });

        //  $(".slider").mousemove(function (e) {
        // 		dragCursorLottie.setDirection(1);
        // 		dragCursorLottie.play();
        // 		handleMouseMove(e);
        // 	});

        // —————————————————————————————————————————————————————
        // scroll events 
        // —————————————————————————————————————————————————————
        scroll.on('scroll', (position) => {
            // —————————————————————————————————————————
            // Home logo color change
            // —————————————————————————————————————————
            let pageHeight = window.innerHeight - 40;
            let scrollPosition = scroll.scroll.instance.scroll.y;

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

            let scrollInterval = Math.round(scrollPosition % 80);

            if (scrollInterval == 0) {
                // —————————————————————————————————————————
                // Navigation active class change
                // —————————————————————————————————————————   
                $('section').each(function () {
                    checkPagePositionScrolled($(this));
                });

                // —————————————————————————————————————————
                // A to B Graphic
                // —————————————————————————————————————————  
                $('.graphic-layer').each(function () {
                    var topOfObject = $(this).offset().top;
                    var bottomOfWindow = $(window).scrollTop() + window.innerHeight;
                    if (bottomOfWindow >= topOfObject) {
                        desktopLottie.play();
                        mobileLottie.play();
                    }
                });
            }

        });

        // 2022 force ALL ScrollTriggers to recalculate their positions
        // ScrollTrigger.refresh();

    }); // end dom content loaded

}