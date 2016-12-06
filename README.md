# LuckySlider
Simple and easy slider based on jQuery

Settings:

```js
    start: 1, // an element that will be active after initialization
    nav: true, // show prev & next navigation elements
    dots: true, // show navigation dots
    cycle: true, // cycle slider
    auto: false, // auto change
    timeout: 3000, // auto change timeout
    beforeChange: function(){}, // custom function that is called before the change
    afterChange: function(){}, // custom function that is called after the change
```


Example:

```js
$('.element').luckySlider({
    start: 1,
    nav: true,
    dots: true,
    cycle: true,
    auto: false,
    timeout: 3000,
    beforeChange: function() {
        console.log('Here you can use your function');
    },
    afterChange: function() {
        console.log('Here you can use your function');
    }
});
```


HTML before init:

```html
<div>
  <div></div>
  <div></div>
  <div></div>
</div>
```


HTML after init:

```html
<div class="_ls">
  <div class="_ls__wrapper">
    <div class="_ls__list">
      <div class="_ls__list-item _ls-active" data-item="1"></div>
      <div class="_ls__list-item" data-item="2"></div>
      <div class="_ls__list-item" data-item="3"></div>
    </div>
  
    <div class="_ls__nav">
      <a class="_ls__nav-prev" href="javascript:void(0);"></a>
      <a class="_ls__nav-next" href="javascript:void(0);"></a>
    </div>
  </div>
  
  <div class="_ls__dots">
    <a class="_ls__dots-item _ls-active" data-dot="1" href="javascript:void(0);"></a>
    <a class="_ls__dots-item" data-dot="2" href="javascript:void(0);"></a>
    <a class="_ls__dots-item" data-dot="3" href="javascript:void(0);"></a>
  </div>
</div>
```
