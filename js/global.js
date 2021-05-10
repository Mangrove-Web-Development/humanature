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
                let clickedHeight = $(this).find(".expander__content p").height();

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

    setTimeout(function(){
        scroll.init()
    }, 100);


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

        setTimeout(function() {
            let clickedSection = clickedLink[0].hash;
            let clickedSectionNode = $(clickedSection);
            let clickedNode = clickedSectionNode[0];

            // smooth scroll to the anchor id
            scroll.scrollTo(clickedNode, 
                options = {offset: -150}
            );

        }, 100);

        checkPagePosition();
    });



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
        prevNextButtons: false,
        pageDots: false,
    });
    
    
    
    // —————————————————————————————————————————————————————
    // A to B Lottie
    // —————————————————————————————————————————————————————
		let desktopGraphic = document.querySelector('.graphic-layer__graphic--dekstop');
		var desktopLottie = bodymovin.loadAnimation({
			container: desktopGraphic,
			path: '/js/a-to-b-desktop.json',
			renderer: 'svg',
			loop: false,
			autoplay: true,
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

        let scrollInterval = Math.round(scrollPosition % 100);

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
              checkPagePositionScrolled($(this));
            });
        }
        
    });


}); // end dom content loaded

window.addEventListener("load", function () {
    window.dispatchEvent(new Event('resize'));
});