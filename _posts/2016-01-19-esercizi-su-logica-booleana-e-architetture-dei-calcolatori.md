---
title: esercizi su logica booleana e architetture dei calcolatori
date: 2016-01-19

layout: post
category : infob
tags : ['tabelle della verità', 'architettura del calcolatore']
---

- [Slides sulle architetture dei calcolatori e memorie caches](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/le_arch_caches.pdf)

# Tabella della verita'

Si consideri la seguente espressione booleana:

    NOT (A AND NOT B) AND (NOT B OR C)

Si compili la seguente tabella della verita' (in cui 0 rappresenta il valore logico FALSO, 1 il valore VERO):

|  A |  B |  C | E1: A AND NOT B | NOT E1 | E2: (NOT B OR C) | Finale |
|----|----|----|-----------------|--------| ---------------- |--------|
|  0 |  0 |  0 |               0 |      1 |                1 |      1 |
|  0 |  0 |  1 |               0 |      1 |                1 |      1 |
|  0 |  1 |  0 |               0 |      1 |                0 |      0 |
|  0 |  1 |  1 |               0 |      1 |                1 |      1 |
|  1 |  0 |  0 |               1 |      0 |                1 |      0 |
|  1 |  0 |  1 |               1 |      0 |                1 |      0 |
|  1 |  1 |  0 |               0 |      1 |                0 |      0 |
|  1 |  1 |  1 |               0 |      1 |                1 |      1 |


Si consideri ora la condizione, scritta in linguaggio C, in cui `x` e `y` siano due variabili `int`:

    !( (x>3) && !(y>5) ) && ( !(y>5) || (x<2) )

ottenuta dalla prima formula sostituendo la variabile A con `x>3`, la variabile B con `y>5`, la variabile C con `x<2`.

* L'espressione è vera o falsa quando `x=1` e `y=7`?

		Per (A = 0) (B = 1) (C = 1) l'espressione e' vera.

* Se `y>5`, per quali valori di `x` l'espressione e' vera?

		Se (A = 0) (B = 1) (C = 1) oppure (A = 1) (B = 1) (C = 1) e' vera allora
		(B = 1) (C = 1) e' vera quindi,
		per (y > 5) e (x < 2) e' vera.
