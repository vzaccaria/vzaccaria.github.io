---
title: Efficient DSP filters with Template Haskell
date: 2014-03-21 14:20:54

layout: post
category : blog 
tags : ["haskell", "digital signal processing"]
description : Template Haskell is a powerful tool to do general and domain specific optimizations of your code. Even if it is written in another programming language! 
---



*Note: This is part 3 of small tutorial on Template Haskell I wrote on my blog; the tutorial is composed of [part1](http://www.vittoriozaccaria.net/blog/2014/02/24/towards-template-programming-with-haskell.html), [part 2](http://www.vittoriozaccaria.net/blog/2014/03/12/implementing-a-simple-dsp-filter-library-with-template-haskell.html) and [part 3](http://www.vittoriozaccaria.net/blog/2014/03/21/symbolically-optimize-dsp-filters-with-template-haskell.html)*.

In the previous part of this tutorial, we introduced an FIR filter generator  in Template Haskell. The filter generator produces a syntactic representation of FIR Filters in the Haskell Language. An example application is the following:

```haskell 
myfilter = [| \x -> $(Filt.flt0 [0, 1] [| x |]) |]
```

which produces the following Haskell AST:

```haskell
\x_0 -> ((0 % 1) GHC.Num.* (x_0 GHC.List.!! 0)) GHC.Num.+ ((1 % 1) GHC.Num.* (x_0 GHC.List.!! 1))
```

which corresponds to the following mathematical filter:

<div>
\begin{equation}
f(x) = 0 \times x[0] + 1 \times x[1]
\end{equation}
</div>

Now this is all cool but we'd really like to optimize the above as:

<div>
\begin{equation}
f(x) = x[1]
\end{equation}
</div>

Besides, we want to be able to make more advanced optimizations. In fact,
wouldn't it be even more cool if we could optimize the concatenation of more filters? For example:

```haskell
Filt.flt0 [0, 1] $ Filt.flt0 [0, 1] [| x |]
```

produces the concatenation of two trivial 2-tap filters; the resulting Haskell program, without optimization, is[^1]:

```haskell
\x -> 0 * 0 * x !! 0 + 1 * x !! 1 !! 0 + 1 * (0 * x !! 0 + 1 * x !! 1) !! 1
```

However, one can easily see that the two filters above produce simply `x` delayed by two:

<div>
\begin{equation}
f(x) = x[2]
\end{equation}
</div>

because each of the two filters delays the input by one.

How can we achieve this by manipulating the symbolic representation of the filter in Haskell? Let's see.

Constant propagation
====================

First of all, we need to propagate away trivial constants such as multiplication by 0 and 1 and additions with 0.

To do this, we need to parse the AST looking for the above patterns. We thus write a recursive function that munches the final expression to produce an optimized one:

```haskell
constProp :: Exp -> Exp 
```

The function is defined as:

```haskell
constProp (InfixE (Just e1) op (Just e2)) 
    | (justZero e1) && (isPlus op)                     = e2
    | (justZero e2) && (isPlus op)                     = e1
    | ((justZero e1) || (justZero e2)) && (isTimes op) = zero
    | ((justOne e1)) && (isTimes op)                   = e2
    | ((justOne e2)) && (isTimes op)                   = e1
    | otherwise                      = (InfixE (Just (constProp e1)) op (Just (constProp e2)))
constProp e = e
```

where `(InfixE (Just e1) op (Just e2))` matches an infix operator `op` and two expressions `e1` and `e2`.

By pattern matching we evaluate all the optimizable cases; we use some helper functions such as `justZero`:

```haskell
justZero :: Exp -> Bool
justZero ((LitE (RationalL (0)))) = True 
justZero ((LitE (IntegerL (0)))) = True
justZero _ = False  
```

and `justOne`:

```haskell
justOne :: Exp -> Bool
justOne ((LitE (RationalL (1)))) = True 
justOne ((LitE (IntegerL (1)))) = True
justOne _ = False   
```

to make the match against literals 0 and 1 more readable. Similarly, we use `isPlus`:

```haskell
isPlus :: Exp -> Bool 
isPlus op 
    | op == (VarE '(N.+)) = True 
    | otherwise           = False
```

and `isTimes` to match against plus and times operators:

```haskell
    isTimes:: Exp -> Bool 
    isTimes op 
        | op == (VarE '(N.*)) = True 
        | otherwise           = False
```

The pattern matches in constProp are easily defined with the above helpers; for example: 

```haskell
| ((justZero e1) || (justZero e2)) && (isTimes op) = zero
```

tells that if either `e1` and `e2` are 0 and the operator is `*`, the expression can be optimized to literal `0`:

```haskell
zero :: Exp
zero = (LitE (RationalL (0)))
```

Obviously, each time we change the AST, we have to check whether new opportunities for optimization arise. Thus we have to iterate until we reach a fixed point with `until`:

```haskell
iterateConstProp:: Exp -> Exp
iterateConstProp = until (\x -> constProp x == x) constProp 
```

To apply `iterateConstProp` within the `Q` monad, we need to bind the input expression and return the result within the monad:

```haskell
simplify :: ExpQ -> ExpQ
simplify eq = do
    e <- eq 
    return (iterateConstProp e)
```

Now let's see how the concatenation of the two filters presented above is optimized:

```haskell
pipe = [| \x -> $(simplify $ Filt.flt0 [0, 1] $ Filt.flt0 [0, 1] [| x |]) |]
main = printCode $ wrappedPipe 
```


Which gives as result:
    
    \x_0 -> (x_0 GHC.List.!! 1) GHC.List.!! 1

<a href=""> 
    <img class="center" src="http://www.vittoriozaccaria.net/deposit/not-bad.jpg"></img>
</a>

Domain specific optimization
====================


To simplify further, we have to apply a domain specific optimization; in particular, we are going to look for a concatenation of delay operators `!!`, so that:

    (exp !! a) !! b => exp !! (a + b)

where `a+b` is evaluated at compile time. To achieve this, we define:

```haskell
delayOpt :: Exp -> Exp 
delayOpt (InfixE (Just e1) op (Just e2)) 
   | isDelay(op) && isDelayedSignal(e1) && isNum(e2)   = fuseDelays e1 op e2
   | otherwise = (InfixE (Just (delayOpt e1)) op (Just (delayOpt e2)))
```


This function needs to be iteratively applied together with `iterateConstProp`. The nature of this function is very similar to `iterateConstProp` in that it visits the AST tree looking for opportunities to simplify delay expressions.

As usual, we use some helper predicates; `isDelay` checks whether the top operator is a delay operator (`!!`):

```haskell
isDelay :: Exp -> Bool 
isDelay op 
    | op == (VarE '(L.!!)) = True 
    | otherwise           = False
```

`isDelayedSignal` checks whether we have a nested delay:

```haskell
isDelayedSignal:: Exp -> Bool
isDelayedSignal (InfixE (Just e1) op (Just e2))
    | isDelay(op) && isNum(e2) = True
    | otherwise = False
isDelayedSignal e = False
```

Finally, we can apply this optimization only to literal values of the coefficients so we need to define:

```haskell
isNum :: Exp -> Bool
isNum ((LitE (RationalL (a)))) = True 
isNum ((LitE (IntegerL (a)))) = True
isNum _ = False 
```


`fuseDelays` constructs a new infix AST node by collapsing the delays as described above:

```haskell
fuseDelays:: Exp -> Exp -> Exp -> Exp 
fuseDelays e1 op e2 = 
  let d = getDelayValue e1
    s = getDelayedSignal e1
    c = getNum e2
    in (InfixE (Just s) op (Just (LitE (RationalL (d + c)))))
```


where `getDelayedSignal`, `getDelayValue` and `getNum` are some helper accessors.

To use `delayOpt` we need create a `simplifyPass` that consists of the concatenation of both `iterateConstProp` and `delayOpt`:

```haskell
simplifyPass:: Exp -> Exp 
simplifyPass eq = do
    delayOpt $ iterateConstProp eq
```

finally, we need to iterate `simplifyPass` until we reach a fixed point :

```haskell
simplifyAll = until (\x -> simplifyPass x == x) simplifyPass 
```

and modify `simplify` as follows:

```haskell
simplify :: ExpQ -> ExpQ
simplify eq = do
  e <- eq 
  return (simplifyAll e)
```


If we optimize again our pipeline:

```haskell
pipe = [| \x -> $(simplify $ Filt.flt0 [0, 1] $ Filt.flt0 [0, 1] [| x |]) |]

main = printCode $ wrappedPipe 
```


Which gives as result:
    
```haskell
    \x_0 -> x_0 GHC.List.!! (2 % 1)
```

I.e., the input signal delayed by two.

<a href=""> 
    <img class="center" src="http://www.vittoriozaccaria.net/deposit/yeah.jpg"></img>
</a>




[^1]: with some sugar to make it more digestible. 

