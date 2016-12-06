/**
 * luckyslider
 *
 * Copyright 2016, sDofeen
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function($) {
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

            $ls.addClass('_ls').children().addClass('_ls__list-item').each(function(index, item) {
                $(item).attr('data-item', Number(index + 1));
            });

            $ls.append('<div class="_ls__wrapper"></div>');
            $ls.find('._ls__wrapper').append('<div class="_ls__list"></div>');
            $ls.find('._ls__list-item').appendTo($ls.find('._ls__list'));

            if (settings.nav) {
                $ls.find('._ls__wrapper').append('<div class="_ls__nav"></div>');

                $ls.find('._ls__nav').append('<a class="_ls__nav-prev" href="javascript:void(0);"></a>');
                $ls.find('._ls__nav').append('<a class="_ls__nav-next" href="javascript:void(0);"></a>');

                $ls.find('._ls__nav ._ls__nav-prev, ._ls__nav ._ls__nav-next').on('click', change);
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
                $ls.find('._ls__list-item[data-item="' + active + '"]').addClass('_ls-active');

                if (settings.dots) {
                    $ls.find('._ls__dots-item[data-dot="' + active + '"]').addClass('_ls-active');
                }
            }

            function change() {
                if (settings.beforeChange && $.isFunction(settings.beforeChange)) {
                    settings.beforeChange.call();
                }

                var $el = $(this),
                    $items = $ls.find('._ls__list-item'),
                    $dots = $ls.find('._ls__dots-item'),
                    isDot = $el.hasClass('_ls__dots-item'),
                    isPrev = $el.hasClass('_ls__nav-prev');

                if ($el.hasClass('_ls-disabled') || $el.hasClass('_ls-active')) {
                    return false;
                }

                $items.removeClass('_ls-active');
                $dots.removeClass('_ls-active');

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

                if (settings.afterChange && $.isFunction(settings.afterChange)) {
                    settings.afterChange.call();
                }
            }

            function checkNav() {
                $ls.find('._ls__nav-prev').removeClass('_ls-disabled');
                $ls.find('._ls__nav-next').removeClass('_ls-disabled');

                if (active === 1) {
                    $ls.find('._ls__nav-prev').addClass('_ls-disabled');
                }

                if (active === items) {
                    $ls.find('._ls__nav-next').addClass('_ls-disabled');
                }
            }
        }
    }
})(jQuery);