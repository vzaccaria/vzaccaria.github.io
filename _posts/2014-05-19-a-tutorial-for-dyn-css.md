---
title: Building a neat landing page with DynCSS
date: 2014-05-19 21:51:45

layout: post
category : blog 
tags : ["CSS", "Dynamic"] 
og_image: http://www.vittoriozaccaria.net/deposit/img-dyncss.jpg
description: DynCSS is a small Javascript add-on for your web pages. It parses your CSS and converts the rules into dynamic Javascript that is executed on browser's events like scroll and resize.

---

[DynCSS](http://www.vittoriozaccaria.net/dyn-css/) is a small Javascript add-on for your web pages. It parses your CSS  and converts all the rules with prefix `-dyn-*` into dynamic Javascript that is executed on browser's events like `scroll` and `resize`. 

For example, the following CSS will center vertically `.header`, dynamically changing `margin-top` as the window is resized:

```javascript
.header {
 -dyn-margin-top: '(@win-height - @el-height)/2.0';
}
```

The dynamic action is specified with simple quotes, and it can use some placeholders to refer to dynamic properties of the current browser window; in the above example, `@win-height` is the dynamic height of the window while 
`@el-height` is the dynamic height of the current element (`.header` in this case). The overall effect is that, every time the window is resized, the `.header` will automatically recenter.

## The final product of this tutorial

The final landing page of this tutorial [can be found at this address](http://www.vittoriozaccaria.net/dyncss-example/). As you can see, it contains several effects and animations. I'll describe in the next paragraphs how I've achieved those effects.

## A word on responsiveness.

DynCSS allows to easily program responsiveness in your CSS. To do so you define a list of breakpoints and the dynamic variable to watch (which is typically the size of the window). You can do this in a `<script>` tag in your HTML; here's how you set two breakpoints at 481 and 961 on the window's width variable `@win-width`:

```html
<script> 
    window.dynCss.api.setBreakpoints([481,961],'@win-width');
</script>
```

Now, you can define how each property behaves above an below the breakpoints; for example, we can change dynamically the font size:

```css 
.header__title {
        -dyn-font-size: '@selectFrom(["3em", "4em", "5em"])';
}
```

`selectFrom` is a built-in function that returns one of the elements of the input list by using the breakpoints specified with `setBreakpoints`. Here, the font size will be 3em under 480px, 4em under 960px, and 5em above 960px.

For this tutorial we will use only one breakpoint at 480px: 

```html
<script> 
    window.dynCss.api.setBreakpoints([481],'@win-width');
</script>
```

so the `@selectFrom` will specify in an two element array the value that the property must assume above and below that breakpoint.

# Landing page above the fold.

As you 'land' to the page you will see:

* a centered header.
* a phone positioned on the bottom right.
* a chevron-like arrow pointing to the phone.
* a set of 4 scroll spies positioned vertically on the left

![](http://www.vittoriozaccaria.net/deposit/landing.png)

Let's examine the behavior of these elements.

## The header

To center the header in the page we specify how the margins should be computed given the size of the header itself:

```css
.content__page1 {
    -dyn-margin-top    : '(@win-height - @el-height)/2.0';
    -dyn-margin-bottom : '(@win-height - @el-height)/2.0';
    -dyn-margin-left   : '(@win-width - @el-width)/2.0';
    }
```

If you scroll down the page, you will see that the header will fade; this is achieved with this rule that acts dynamically on the opacity:

```css
.content__page1 {
      -dyn-opacity: '@convergeToZero({when : (@win-scrollTop - (@jq-position.top)), isHigherThan : @win-height/2})';
    }
```

Here, `@convergeToZero` is a built-in function that returns values from 0 to 1, `win-scrollTop` is the scrolling position and `jq-position.top` evaluates — with jQuery — the position of the element (implicitly equivalent to .content__page1). When the scrolling position is above the element, the opacity is 1; as the difference between the scrolling top and the element's top increases, the opacity is turned gradually down and will be set to zero when the difference is above half of the window's height.

## The phone 
The phone image will undergo several transformations; first its vertical position is going to change linearly from `@win-height`+100 to the vertical center of the window as the scroll top moves from zero to the top of the second page. 

![](http://www.vittoriozaccaria.net/deposit/phone1.png)

To do that, we set the element's position to fixed and we use the virtual property `fixed-vertical-center` that is translated dynamically into changes to the `top` and `left` properties of the element: 

```css
.phone-preview__phone {

  position: fixed;

  -dyn-fixed-vertical-center: '@morph(@transitionToOne({when : @win-scrollTop , start: 0 , stop: @pos(".content__page2").top }, .5) , @win-height + 100 , @fixedVerticalCenter(window))';

}
```

You can see above three additional built-in functions:

* `@pos(element)` evaluates the absolute position of `.content__page2` in the document.
* `@transitionToOne({when, start, stop})`, signals when the scroll top has reached the top of `.content__page2`
* `@morph(c, v1, v2)` returns a convex combination of v1 and v2 by using the value of `c`.

The overall effect is an animation controlled with the scrolling position.

Other animations of the same phone are done by manipulating its horizontal center, its opacity and its css rotation transform: 

```css
.phone-preview__phone {

  -dyn-fixed-horizontal-center: '@morph(@transitionToOne({when : @win-scrollTop , start: 0, stop: @pos(".content__page2").top }, .5) , @win-width*3/4    , @fixedHorizontalCenter(window))';

  -dyn-transform: '"rotate(#{@morph(@transitionToOne({when : @win-scrollTop , start: @pos(".content__page2").top + @win-height * .1 , stop: @pos(".content__page3").top }, 1), 0, 270)}deg) "';

  -dyn-opacity: '1-@transitionToOne({when : @win-scrollTop , start: @pos(".content__page3").top + @win-height * .1 , stop: @pos(".content__page4").top - @win-height/2 }, 1)';
}
```

Here's a snapshot of when the transform animation has kicked in:

![](http://www.vittoriozaccaria.net/deposit/phone2.png)


We also manipulate its `display` property to make it disappear when the scroll position reaches the fourth page:

```css
.phone-preview__phone {

  position: fixed;

  -dyn-display: '@if(@transitionToOne({when : @win-scrollTop , start: @pos(".content__page3").top + @win-height * .1 , stop: @pos(".content__page4").top - @win-height/2 }, 1) < 0.9, "", "none")';

}
```

here `@if(c, v1, v2)` returns `v1` if `c` is true, `v2` otherwise. The effect is that the phone will disappear when the scroll top reaches a bit less than the top of the fourth page.

## The chevron arrow
The chevron arrow is positioned very simply by setting its bottom edge to the top edge of the phone and by aligning its horizontal center with the one of the phone:

![](http://www.vittoriozaccaria.net/deposit/chevron.png)

You can also note that we disable it when the window size is less than the breakpoint that has been set at the beginning (`-dyn-display` property):

```css
.phone-preview__chevron {

  position: fixed;
  -dyn-fixed-bottom-edge: '@fixedTopEdge(".phone-preview__phone")';
  -dyn-fixed-horizontal-center: '@fixedHorizontalCenter(".phone-preview__phone")';
  -dyn-display: '@selectFrom(["none", "block"])';
}
```

## The scroll spy

The scroll spy on the left appears only on desktop browsers: 

```css
.position-spy {
  position: fixed;
  -dyn-display: '@selectFrom(["none", "block"])';
}
```

and its center is positioned at 1/6 of the window width and 1/2 of the window height:

```css
.position-spy {
  -dyn-fixed-vertical-center: '@fixedVerticalCenter(window)';
  -dyn-fixed-horizontal-center: '@win-width/6';
}
```

Each of the inner spies can be extended with an `.highlight` class that introduces a white fill into it. 

![](http://www.vittoriozaccaria.net/deposit/spies.png)

Setting of the `.highlight` class based on the scroll position is very simple using DynCSS `-dyn-set-state-(class)` virtual property.

This rule, for example, adds the `.highlight` class to `.position-spy__page1` only when the scroll position is within 90% of the first page: 

```css
.position-spy__page1 {
  -dyn-set-state-highlight: '@if(@transitionToOne({when : @win-scrollTop , start: 0, stop: @pos(".content__page2").top }, .5) < 0.9, true, false)';
}
```

# Using a preprocessor
By sprucing up a little bit the CSS I've been able to build this neat landing page with low effort. Using a CSS preprocessor you can even make it easier to realize complex and responsive pages. For example, using Less's interpolation you can write comfortably complex animations:

```css
@page2-start:           '@pos(".content__page2").top';
@trans1-limits:         'start: 0, stop: @{page2-start}';
@animationStatus1:      '@transitionToOne({when : @win-scrollTop , @{trans1-limits} }';
@convergeHorizontally:  '@morph(@{animationStatus1} , @win-width*3/4, @fixedHorizontalCenter( window ))';

.phone-preview__phone {
  -dyn-fixed-horizontal-center : '@{convergeHorizontally}';
}
```

# Wrapping up
DynCSS was born with the intention of make it easier to specify complex animations that go beyond to what it is/will be possible with CSS's `calc`. Although it is in its early infancy, I find it already very comfortable to use and I am looking forward for pull requests to the repository!
