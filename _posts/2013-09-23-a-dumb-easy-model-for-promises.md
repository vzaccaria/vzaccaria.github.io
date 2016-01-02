---
title: A dumb easy model for promises
date: 2013-09-23 16:43:56

layout: post
category : blog 
tags : ["promises", "concurrent", "asynchronous", "javascript"] 
description : Update - Promises are significantly taking ground as a programming construct for asynchronous systems such as web applications. In this post I'll describe how Petri Nets can be used to efficiently model them.
og_image : deposit/returned_promise1.png
---

*April 2nd, 2014: the post has been edited to fix some errors that were present in the original article. Thanks to @steve for having pointed that out*.

[Promises](http://en.wikipedia.org/wiki/Futures_and_promises) are significantly taking ground as a programming construct for asynchronous systems such as web applications. In its simplest form, a *promise* represents the state of the result of some future computation.

I was introduced recently to this construct when studying [jQuery](http://api.jquery.com/promise/) and [AngularJS](http://angularjs.org/). At the beginning, I was not able to wrap my head around it. While I understood the basic callback mechanism — allowing to be notified when the computation is finished — I struggled a lot capturing the efficiency with which promises allow to easily *compose* asynchronous programs.

## Enter Petri nets
[Petri nets](http://en.wikipedia.org/wiki/Petri_net) have helped me a lot while creating an easy mental/visual model of promises (and their composition patterns). 

In this post, I will refer to the ["Promises/A+"](http://promises-aplus.github.io/promises-spec/) specification. I assume you have already some basic knowledge of it — especially of the special cases. Besides, I will not indulge in any mathematical notation of Petri Nets here. If you are interested, I've put some suggested reading link at the end of this post.

## Basic form of promise

A promise is an object that has a `then` method[^1]:

    promise.then(onFulfilled, onRejected)

`then` is used to specify two callbacks — `onFulfilled` and `onRejected` — that are mutually executed when the state of the promise is resolved to either *fulfilled* or *rejected*.

In a Petri net, the promise state is represented by a **token** — black disk — that is positioned on a **place**. In the following figure, the token is on the *pending* place:

![](http://www.vittoriozaccaria.net/deposit/pending1.png)

The token can move to another place when the **transition** events — black squares — fire. Transitions can fire only when they are enabled, i.e., only when a predetermined number of tokens (**weight**) is positioned on their input places. Without any particular specification, the weight corresponds to the number of input places. The number of marks emitted into a place, when not explicitly shown, is 1.

When the promise is resolved, the output transition from the pending place is fired. If the promise is fulfilled, the marker 'moves' to the fulfilled state:

![](http://www.vittoriozaccaria.net/deposit/fulfilled1.png)

Similarly, the token moves to the rejected place if the promise has been rejected. So far so good.

## Producing a new promise

As shown above, the `then` method returns a new promise:

    p2 = p1.then(onFulfilled, onRejected)

Let's see, with our new visual model, how the execution of the methods is synchronized with the promise itself:

![](http://www.vittoriozaccaria.net/deposit/then1.png)

Once `p1` is fullfilled, the transition event `onFulfilled` is fired — i.e., the callback `onFulfilled` is invoked. If the callback (being it `onFulfilled` or `onReject`) returns a value, `p2` will be fulfilled with that value.

On the other hand, if either callback throws an exception, `p2` is going to be rejected. So listen, if you want to escalate an error when the first promise is rejected, **throw an exception in your `onRejected` callback**!

## Creating synchronization points with promises

Here I think that the real power of promises is unleashed. If your callbacks — `onFulfilled` or `onRejected` — return a promise (let's call it `R`) you can make sure that `p2` is resolved only when both `p1` and `R` have been resolved; in fact [according to the specification](http://promises-aplus.github.io/promises-spec/#point-52):

> If either onFulfilled or onRejected returns a promise (call it returnedPromise), promise2 must assume the state of returnedPromise.

This Petri net allows to understand very well what's going on:

![](http://www.vittoriozaccaria.net/deposit/returned_promise1.png)

Petri nets allow to model these synchronization points very easily. This is done by forcing the number of tokens that can enable a place transition. In fact, the transition of 1 token to the `p2-fullfilled` place can only be fired when there are two tokens on the input of the commanding transition.

## Cheat sheet

I am astonished about how Petri nets allow us to think in a very clear way about how we structure our promise chain. I hope this can be useful for you as it was for me. 

You can download the visual cheat sheet for Petri Nets for promises [from this address](http://www.vittoriozaccaria.net/deposit/promises_cheat_sheet1.pdf) [pdf].



## Suggested readings

* T. Murata — Petri Nets: Properties, Analysis and Applications - 1989, [Available at this address](http://embedded.eecs.berkeley.edu/Respep/Research/hsc/class.F03/ee249/discussionpapers/PetriNets.pdf).

 
[^1]: We are not going to deal with how this object is generated. We assume that some computation has started and an object representing its future value has been created.  