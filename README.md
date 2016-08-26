# lucky-slider
Simple slider on jQuery

before init:

```html
<div>
  <div></div>
  <div></div>
  <div></div>
</div>
```

after init:

```html
<div class="_ls">
  <div class="_ls__wrapper">
    <div class="_ls__list">
      <div class="_ls__list-item" data-item="1"></div>
      <div class="_ls__list-item" data-item="2"></div>
      <div class="_ls__list-item" data-item="3"></div>
    </div>
  
    <div class="_ls__nav">
      <a class="_ls__nav-prev" href="javascript:void(0);"></a>
      <a class="_ls__nav-next" href="javascript:void(0);"></a>
    </div>
  </div>
  
  <div class="_ls__dots">
    <a class="_ls__dots-item" data-dot="1" href="javascript:void(0);"></a>
    <a class="_ls__dots-item" data-dot="2" href="javascript:void(0);"></a>
    <a class="_ls__dots-item" data-dot="3" href="javascript:void(0);"></a>
  </div>
</div>
```

default settings

```js
    start: 1,
    nav: true,
    dots: true,
    cycle: true,
    auto: false,
    timeout: 3000
```
