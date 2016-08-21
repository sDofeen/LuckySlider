/**
 * LuckySlider v1.0
 * http://sdofeen.com
 *
 * Copyright 2016, sDofeen
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
;(function($) {
    $.fn.luckySlider = function(options) {
        return this.each(function(index, item) {
            init($(item), options);
        });

        function init($ls, options) {
            var settings = $.extend({
                    start: 1,
                    nav: true,
                    dots: true,
                    cycle: true,
                    auto: false,
                    timeout: 3000
                }, options),
                active = settings.start,
                items = $ls.children().length;

            $ls.addClass('_ls').children().addClass('_ls__item').each(function(index, item) {
                $(item).attr('data-item', Number(index + 1));
            });

            if (settings.nav) {
                $ls.append('<a class="_ls__prev" href="javascript:void(0);"></a>');
                $ls.append('<a class="_ls__next" href="javascript:void(0);"></a>');

                $ls.find('._ls__prev, ._ls__next').on('click', change);
            }

            if (settings.dots) {
                $ls.append('<div class="_ls__dots"></div>');

                for (var i = 0; i < items; i++) {
                    $ls.find('._ls__dots').append('<a class="_ls__dots-item" data-dot="' + Number(i + 1) + '" href="javascript:void(0);"></a>')
                }

                $ls.find('._ls__dots-item').on('click', change);
            }

            if (settings.auto) {
                setInterval(function() {
                    change($ls.find('._ls__next'));
                }, settings.timeout);
            }

            setActive();

            if (!settings.cycle) {
                checkNav();
            }

            function setActive() {
                $ls.find('._ls__item[data-item="' + active + '"]').addClass('_ls__active');

                if (settings.dots) {
                    $ls.find('._ls__dots-item[data-dot="' + active + '"]').addClass('_ls__active');
                }
            }

            function change() {
                var $el = $(this),
                    $items = $ls.children(),
                    $dots = $ls.find('._ls__dots-item'),
                    isDot = $el.hasClass('_ls__dots-item'),
                    isPrev = $el.hasClass('_ls__prev');

                if ($el.hasClass('_ls__disabled') || $el.hasClass('_ls__active')) {
                    return false;
                }

                $items.removeClass('_ls__active');
                $dots.removeClass('_ls__active');

                if (isDot) {
                    active = $el.data('dot');
                } else if (isPrev) {
                    if (active === 1) {
                        if (settings.cycle) {
                            active = items;
                        }
                    } else {
                        active--;
                    }
                } else {
                    if (active === items) {
                        if (settings.cycle) {
                            active = 1;
                        }
                    } else {
                        active++;
                    }
                }

                setActive();

                if (!settings.cycle) {
                    checkNav();
                }
            }

            function checkNav() {
                $ls.find('._ls__prev').removeClass('_ls__disabled');
                $ls.find('._ls__next').removeClass('_ls__disabled');

                if (active === 1) {
                    $ls.find('._ls__prev').addClass('_ls__disabled');
                }

                if (active === items) {
                    $ls.find('._ls__next').addClass('_ls__disabled');
                }
            }
        }
    }
})(jQuery);