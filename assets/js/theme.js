/* global Pace, ScrollMagic, Linear */

(function ($) {
    "use strict";

    const $document = $(document), $window = $(window), $htmlBody = $('html, body'), $body = $('body'),
        $navbar = $('.navbar'), $navbarCollapse = $('.navbar-collapse'), $pageScrollLink = $('.page-scroll'),
        $scrollToTop = $('.scroll-to-top'), $galleryGrid = $('.gallery-grid'),
        $accordionEducation = $('#accordion-education'), $accordionWork = $('#accordion-work'), navHeight = 80,
        navHeightShrink = 66;

    /** Detect mobile device */
    const isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        }, BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        }, iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        }, Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        }, Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        }, any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };


    /*
    * Window load
    */

    $window.on('load', function () {

        /** Bootstrap scrollspy */
        const ww = Math.max($window.width(), window.innerWidth);
        $body.scrollspy({
            target: '#navigation', offset: ww >= 992 ? navHeightShrink : navHeight
        });


        /** Sticky menu */
        if (isMobile.any()) {
            $navbar.addClass('is-mobile');
        }

        if (!$navbar.hasClass('is-mobile') && ww >= 992) {
            $navbar.sticky({topSpacing: 0});
        }


        /** Gallery - Filter */
        if ($.fn.imagesLoaded && $.fn.isotope) {
            $galleryGrid.isotope();
        }
    });

    /*
    * Document ready
    */

    $document.ready(function () {
        const ww = Math.max($window.width(), window.innerWidth);

        /*
        * Window scroll
        */

        $window.on('scroll', function () {

            if ($document.scrollTop() > navHeight) {

                /** Shrink navigation */
                $navbar.addClass('shrink');

                /** Scroll to top */
                $scrollToTop.fadeIn();
            } else {

                /** Shrink navigation */
                $navbar.removeClass('shrink');

                /** Scroll to top */
                $scrollToTop.fadeOut();
            }
        });


        /*
        * Window resize
        */

        $window.on('resize', function () {

            /** Bootstrap scrollspy */
            const dataScrollSpy = $body.data('bs.scrollspy'), ww = Math.max($window.width(), window.innerWidth),
                offset = ww >= 992 ? navHeightShrink : navHeight;

            dataScrollSpy._config.offset = offset;
            $body.data('bs.scrollspy', dataScrollSpy);
            $body.scrollspy('refresh');


            /** Sticky menu */
            $navbar.unstick();
            if (!$navbar.hasClass('is-mobile') && ww >= 992) {
                $navbar.sticky({topSpacing: 0});
            }


            /** Accordion collapse */
            if (ww < 768) {
                $accordionEducation.find('.collapse').collapse('show');
                $accordionWork.find('.collapse').collapse('show');
            } else {
                $accordionEducation.find('.collapse').not(':first').collapse('hide');
                $accordionWork.find('.collapse').not(':first').collapse('hide');
            }
        });


        /** Page scroll */
        $pageScrollLink.on('click', function (e) {
            var anchor = $(this), target = anchor.attr('href');
            pageScroll(target);
            e.preventDefault();
        });

        function pageScroll(target) {
            var ww = Math.max($window.width(), window.innerWidth), offset = ww >= 992 ? navHeightShrink : navHeight;

            $htmlBody.stop().animate({
                scrollTop: $(target).offset().top - (offset - 1)
            }, 1000, 'easeInOutExpo');

            // Automatically retract the navigation after clicking on one of the menu items.
            $navbarCollapse.collapse('hide');
        }


        /** BG Parallax */
        if (typeof ScrollMagic !== 'undefined') {
            const selector = '.home-bg-parallax';

            // Init controller
            const controller = new ScrollMagic.Controller({
                globalSceneOptions: {
                    triggerHook: 'onEnter', duration: '200%'
                }
            });

            // Build scenes
            new ScrollMagic.Scene({triggerElement: selector})
                .setTween(selector + ' > .bg-parallax', {y: '80%', ease: Linear.easeNone})
                .addTo(controller);
        }


        /** BG Slideshow */
        if ($.fn.flexslider) {
            const $bgSlideshow = $('.bg-slideshow-wrapper');
            $bgSlideshow.flexslider({
                selector: '.slides > .bg-cover',
                easing: 'linear',
                slideshowSpeed: 3700,
                controlNav: false,
                directionNav: false,
                keyboard: false,
                pauseOnAction: true,
                touch: false
            });
        }

        /** BG Slider */
        if ($.fn.flickity) {
            const $bgSlider = $('#home').find('.carousel-custom');
            $bgSlider.flickity({
                cellSelector: '.carousel-cell',
                cellAlign: 'left',
                contain: true,
                prevNextButtons: false,
                pageDots: true,
                draggable: false,
                autoPlay: 3700,
                imagesLoaded: true,
                pauseAutoPlayOnHover: false
            });

            const flkty = $bgSlider.data('flickity');
            $bgSlider.find('.flickity-page-dots').on('mouseleave', function () {
                flkty.playPlayer();
            });
        }


        /** Animated typing */
        if ($.fn.typed) {
            const $typedStrings = $('.typed-strings');
            $typedStrings.typed({
                strings: ['DevOps', 'Node.js', 'Java', 'PHP', 'SQL', 'PL/SQL', 'C#',],
                typeSpeed: 100,
                loop: true,
                showCursor: true
            });
        }


        /** Gallery - Magnific popup */
        if ($.fn.magnificPopup) {
            $galleryGrid.magnificPopup({
                delegate: 'a.zoom', type: 'image', mainClass: 'mfp-fade', gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 2],
                    tPrev: 'Previous',
                    tNext: 'Next',
                    tCounter: '<span class="mfp-counter-curr">%curr%</span> of <span class="mfp-counter-total">%total%</span>'
                }
            });
        }


        /** Gallery - Filter */
        if ($.fn.imagesLoaded && $.fn.isotope) {
            const $gridSelectors = $('.gallery-filter').find('a');
            $gridSelectors.on('click', function (e) {
                $gridSelectors.removeClass('disabled');
                $(this).addClass('disabled');

                const selector = $(this).attr('data-filter');
                $galleryGrid.isotope({
                    filter: selector
                });
                e.preventDefault();
            });
        }


        /** Accordion collapse */
        if (ww < 768) {
            $accordionEducation.find('.collapse').collapse('show');
            $accordionWork.find('.collapse').collapse('show');
        } else {
            $accordionEducation.find('.collapse').not(':first').collapse('hide');
            $accordionWork.find('.collapse').not(':first').collapse('hide');
        }


        /** Chart - Bar */
        const $chartBar = $('.chart-bar'), $chartBarItem = $chartBar.find('.item-progress');

        $chartBar.one('inview', function (isInView) {
            if (isInView) {
                $chartBarItem.each(function () {
                    $(this).css('width', $(this).data('percent') + '%');
                    $(this).next().css('right', 100 - $(this).data('percent') + '%');
                });
            }
        });


        /** Chart - Circle */
        const $chartCircle = $('.chart-circle').find('.chart'), $chartCircleItem = $chartCircle.find('.item-progress');

        $chartCircle.one('inview', function (isInView) {
            if (isInView) {
                $chartCircleItem.each(function () {
                    $(this).css('height', $(this).data('percent') + '%');
                });
            }
        });


        /** Chart - Column */
        const $chartColumn = $('.chart-column').find('.chart'), $chartColumnItem = $chartColumn.find('.item-progress');

        $chartColumnItem.each(function () {
            $(this).css('height', $(this).data('percent') + '%');
        });


        /** Flexslider  - References */
        const $flexsliderReferences = $('#flexslider-references'),
            $flexPrev = $flexsliderReferences.find('a.flex-prev'),
            $flexNext = $flexsliderReferences.find('a.flex-next');

        $flexsliderReferences.flexslider({
            selector: '.slides > .item',
            manualControls: '.flex-control-nav li',
            directionNav: false,
            slideshowSpeed: 4000,
            after: function (slider) {
                if (!slider.playing) {
                    slider.play();
                }
            }
        });

        $flexPrev.on('click', function (e) {
            $flexsliderReferences.flexslider('prev');
            e.preventDefault();
        });

        $flexNext.on('click', function (e) {
            $flexsliderReferences.flexslider('next');
            e.preventDefault();
        });


        /** Counter number */
        const $timer = $('.timer');
        $timer.one('inview', function (isInView) {
            if (isInView) {
                $(this).countTo();
            }
        });


        /** Form - Custom */
        if ($.fn.select2) {
            const $selectForm = $('.select2');
            $selectForm.select2({
                containerCssClass: 'select2-container-custom',
                dropdownCssClass: 'select2-dropdown-custom',
                width: '100%'
            });
        }

        /** Pageclip **/
        const invalidClassName = 'invalid';
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(function (input) {
            // Add a css class on submit when the input is invalid.
            input.addEventListener('invalid', function () {
                input.classList.add(invalidClassName)
            })

            // Remove the class when the input becomes valid.
            // 'input' will fire each time the user types
            input.addEventListener('input', function () {
                const pattern = /\b(hack(?:ed|ing|er|s|t)|breach(?:ed|ing)?|compromis(?:ed|ing)|intrud(?:ed|ing|er|e)|unauthorized)\b/i;
                if (pattern.test(input.value)) {
                    const videoId = "dQw4w9WgXcQ";

                    const gonna = document.createElement("div");
                    gonna.setAttribute("id", "player")

                    // Create a new div element to contain the iframe
                    const never = document.createElement("div");
                    never.setAttribute("id", "never")
                    never.style.position = "fixed";
                    never.style.top = "0";
                    never.style.left = "0";
                    never.style.width = "100%";
                    never.style.height = "100%";
                    never.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                    never.style.zIndex = "9999";
                    never.appendChild(gonna);
                    document.body.appendChild(never);

                    const give = new YT.Player('player', {
                        height: never.clientHeight,
                        width: never.clientWidth,
                        videoId: videoId,
                        playerVars: {
                            'autoplay': 1,
                            'controls': 0,
                            'disablekb': 1,
                            'enablejsapi': 1,
                            'loop': 1,
                            'modestbranding': 1,
                            'origin': 'https://www.filipemmendes.com/',
                            'playsinline': 0,
                            'rel': 0,
                            'widget_referrer': 'https://www.filipemmendes.com/'
                        },
                        events: {
                            'onReady': onPlayerReady,
                            'onStateChange': onPlayerStateChange
                        }
                    });

                    function onPlayerReady(event) {
                        give.playVideo();
                        document.querySelector('.ytp-chrome-top-buttons').style.display = 'none';
                        document.querySelector('._hj_feedback_container').style.display = 'none';
                        document.querySelectorAll('.ytp-ce-element').forEach(element => {
                            element.style.zIndex = "-1";
                        })
                    }

                    function onPlayerStateChange(event) {
                        if (event.data !== YT.PlayerState.PLAYING) {
                            give.playVideo();
                            document.querySelector('.ytp-chrome-top-buttons').style.display = 'none';
                            document.querySelector('._hj_feedback_container').style.display = 'none';
                            document.querySelectorAll('.ytp-ce-element').forEach(element => {
                                element.style.zIndex = "-1";
                            })

                        }
                    }
                }
                if (input.validity.valid) {
                    input.classList.remove(invalidClassName)
                }
            })
        })
        const form = document.querySelector('.pageclip-form');
        Pageclip.form(form, {
            onSubmit: function (event) {
            }, onResponse: function (error, response) {
            }, successTemplate: '<span>Obrigado!</span>'
        })

    });
})(jQuery);
