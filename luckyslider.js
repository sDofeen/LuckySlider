/**
 * luckyslider
 *
 * Copyright 2016, sDofeen
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function($) {
    $.fn.luckySlider = function(options) {
        return init(this, options);

        function init($ls, options) {
            var luckyslider = {},
                settings = $.extend({
                    start: 1,
                    nav: true,
                    dots: true,
                    cycle: true,
                    swipe: true,
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

                $ls.find('._ls__nav ._ls__nav-prev').on('click', function() {
                    change('prev');
                });

                $ls.find('._ls__nav ._ls__nav-next').on('click', function() {
                    change('next');
                });
            }

            if (settings.dots) {
                $ls.append('<div class="_ls__dots"></div>');

                for (var i = 0; i < items; i++) {
                    $ls.find('._ls__dots').append('<a class="_ls__dots-item" data-dot="' + Number(i + 1) + '" href="javascript:void(0);"></a>')
                }

                $ls.find('._ls__dots-item').on('click', function() {
                    change('id', $(this).data('dot'));
                });
            }

            if (settings.auto) {
                setInterval(function() {
                    change('next');
                }, settings.timeout);
            }

            if (settings.swipe) {
                $ls.on('swiperight', function() {
                    change('prev');
                });

                $ls.on('swipeleft', function() {
                    change('next');
                });
            }

            function setActive() {
                $ls.find('._ls__list-item[data-item="' + active + '"]').addClass('_ls-active');

                if (settings.dots) {
                    $ls.find('._ls__dots-item[data-dot="' + active + '"]').addClass('_ls-active');
                }

                if (!settings.cycle) {
                    checkNav();
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

            function beforeChange() {
                var $items = $ls.find('._ls__list-item'),
                    $dots = $ls.find('._ls__dots-item');

                $items.removeClass('_ls-active');
                $dots.removeClass('_ls-active');

                if (settings.beforeChange && $.isFunction(settings.beforeChange)) {
                    settings.beforeChange.call();
                }
            }

            function afterChange() {
                setActive();

                if (settings.afterChange && $.isFunction(settings.afterChange)) {
                    settings.afterChange.call();
                }
            }

            function change(type, id) {
                if (type === 'id' && id >= 1 && id <= items && id !== active) {
                    beforeChange();
                    active = id;
                    afterChange();
                } else if (type === 'prev') {
                    if (active === 1) {
                        if (settings.cycle) {
                            beforeChange();
                            active = items;
                            afterChange();
                        }
                    } else {
                        beforeChange();
                        active--;
                        afterChange();
                    }
                } else if (type === 'next') {
                    if (active === items) {
                        if (settings.cycle) {
                            beforeChange();
                            active = 1;
                            afterChange();
                        }
                    } else {
                        beforeChange();
                        active++;
                        afterChange();
                    }
                }
            }

            setActive();

            luckyslider.getActive = function() {
                return active;
            };

            luckyslider.setActive = function(id) {
                if ($.isNumeric(id)) {
                    change('id', id);
                }
            };

            luckyslider.prev = function() {
                change('prev');
            };

            luckyslider.next = function() {
                change('next');
            };

            return luckyslider;
        }
    }
})(jQuery);