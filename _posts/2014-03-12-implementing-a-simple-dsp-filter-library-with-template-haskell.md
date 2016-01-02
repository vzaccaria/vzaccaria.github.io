---
title: A simple DSP filter with Template Haskell
date: 2014-03-12 15:25:50

layout: post
category : blog 
tags : ["haskell", "digital signal processing"] 
description : Check out how you can write a reusable finite impulse response filter in Template Haskell. Since it allows to manipulate the syntax tree at compile time, you will get constant propagation and other optimizations for free on the structure of your FIR filter.
---

*Note: This is part 2 of small tutorial on Template Haskell I wrote on my blog; the tutorial is composed of [part1](http://www.vittoriozaccaria.net/blog/2014/02/24/towards-template-programming-with-haskell.html), [part 2](http://www.vittoriozaccaria.net/blog/2014/03/12/implementing-a-simple-dsp-filter-library-with-template-haskell.html) and [part 3](http://www.vittoriozaccaria.net/blog/2014/03/21/symbolically-optimize-dsp-filters-with-template-haskell.html)*.

[In a previous post](http://www.vittoriozaccaria.net/blog/2014/02/24/towards-template-programming-with-haskell.html) I've summed up the basic steps to programmatically create a simple Haskell program using [Template Haskell](http://www.haskell.org/haskellwiki/Template_Haskell). 

In this post, I'll show how you can write a reusable [*finite impulse response filter*](http://en.wikipedia.org/wiki/Finite_impulse_response) in Template Haskell. 

__Question__: 

> But why do I have to symbolically generate the FIR filter with Template Haskell? What's the difference with respect to a pure definition in plain Haskell?

__Answer__:

> Template Haskell allows to generate code at compile time. This means that, if the coefficients of the filter are known at compile time, the code of the filter will be automatically optimized by the Haskell compiler. So, you will get constant propagation and other optimizations for free.

Pre-requirements
================================

Check out the pre-requirements from [my previous post](http://www.vittoriozaccaria.net/blog/2014/02/24/towards-template-programming-with-haskell.html).


FIR filter definition
================================

Given an input array \\(x\\) and an array of \\(N+1\\) coefficients \\(c\\), 
we define the output \\(y\\) of the FIR filter as follows:

\begin{equation}
y\_n = \sum\_{i=0}^{N} c\_i * x\_{n-i}
\end{equation}


In the following paragraphs, `x`,`y` and `c` will be treated as Haskell lists.
Let's focus now on the computation of a single sample of \\(y\\); we want to write a function that given:

* a list of coefficients `c` and 
* the AST of the input list `x`

returns the AST for computing `y`. The function has the following name and type:

    flt0 :: [Rational] -> ( Q Exp -> Q Exp )

where `[Rational]` represents the type of the coefficient list while the return type:

    ( Q Exp -> Q Exp )

means that we are returning a function from AST to AST. An example invocation of the latter can be the following:

    (flt0 [0, 1]) [| x |] 

where `[| x |]` is the Template Haskell notation for the AST associated with the input list `x`. This should generate an AST representing the following expression[^1] :

    (0%0) * x!!0 + (1%1) * x!!1

where the coefficients `[0,1]` have been used to unroll the convolution implied by the filter definition. Instead, `[| x |]` is effectively treated as a list by using the indexing operator `!!`.

Let's write our filter generator.
================================

We define the top-level function `flt0` as

    module Filt where 

    flt0 c = \x -> dotv (c) x (length c) 0

where 

* `c` is the coefficient list
* `x` is the AST of the input signal
* `dotv` is a recursive function that produces the AST of the dot product between `c` and `x`. 
* The third parameter to `dotv` represents the overall number of coefficients to be consumed 
* The fourth parameter to `dotv` is the starting index within `x` to be considered for the product.

The Dot Product
===============

The dot product is defined as follows:

    dotv :: [Rational] -> Q Exp -> Int -> Int -> Q Exp 
    dotv c x n m = 
        let coeff = head c
            p = [| coeff * ($x !! m) |]
            in  if n == 1
                then p
                else [| $p + $(Filt.dotv (tail c) x (n-1) (m+1)) |]

If the coefficient list is composed of one element, the function will return the AST of `coeff * $x !! m` where `$x` will splice the AST of the input signal.
Instead, if we have a number of coefficients greater than one, we will concatenate the AST of `coeff * $x !! m` to the dot product between the remaining part of the coefficients `tail c` and the remaining part of the input vector.

Using the filter generator
==========================

To use our filter generator, we need to define another module (let's call it Main):

    module Main where

    import Language.Haskell.TH.Syntax
    import Language.Haskell.TH.Ppr
    import Language.Haskell.TH
    import Filt

we define the AST of a lambda function as follows:

    myfilter = [| \x -> $(Filt.flt0 [0, 1] [| x |]) |]

If we print the code of this filter:

    printCode :: Q Exp -> IO ()
    printCode ast = runQ ast >>= putStrLn . pprint

    main = printCode $ myfilter

we get effectively:

    \x_0 -> ((0 % 1) GHC.Num.* (x_0 GHC.List.!! 0)) GHC.Num.+ ((1 % 1) GHC.Num.* (x_0 GHC.List.!! 1))

which is the unfolded Haskell definition of the original filter.

Bonus: symbolic filter concatenation
============

As the parameter `x` is defined generically as an AST, it can be the one generated by another call of `flt0`. This means that we can generate symbolically also a sequence of chained filters:

    myfilter2 = [| \x -> $(Filt.flt0 [2, 3] $ Filt.flt0 [0, 1] [| x |]) |]

Where a filter with coefficients [2, 3] is chained with the previous one, yielding:

    \x_0 -> ((2 % 1) GHC.Num.* ((((0 % 1) GHC.Num.* (x_0 GHC.List.!! 0)) GHC.Num.+ ((1 % 1) GHC.Num.* (x_0 GHC.List.!! 1))) GHC.List.!! 0)) GHC.Num.+ ((3 % 1) GHC.Num.* ((((0 % 1) GHC.Num.* (x_0 GHC.List.!! 0)) GHC.Num.+ ((1 % 1) GHC.Num.* (x_0 GHC.List.!! 1))) GHC.List.!! 1))

Where to go from here
==================

In the next post, we will see how to programmatically simplify these expressions to yield more efficient filters by applying general and domain specific optimizations. 


[^1]: I simplified the operators representation by removing `GHC.List` and `GHC.Num`.