---
title: codifica in virgola fissa e mobile
date: 2016-01-12

layout: post
category : infob
tags : ['virgola fissa', 'virgola mobile', 'algebra di boole']
---

Slides sull'[algebra di Boole](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/le_algebra_logica.pdf).

Esercizi visti oggi a lezione:

Metodi per la virgola fissa
===========================

Di seguito, viene convertito il numero -123.21 in virgola fissa
complemento a due, con due metodi:

-   Metodo tradizionale.
-   Metodo del fattore di scala.

La conversione verra' effettuata usando 8 bit come parte intera (in
complemento a 2) e 6 bit come parte decimale.

Metodo tradizionale:
--------------------

Conversione tradizionale di -123.21 in virgola fissa con 8 bit parte
intera e 6 decimale:

-   Converto -123 (valore assoluto e poi opposto in C2):

        123:2 (resto) 1
         61:2 (resto) 1
         30:2 (resto) 0
         15:2 (resto) 1
          7:2 (resto) 1
          3:2 (resto) 1
          1:2 (resto) 1
          0

    -   123 = 1111011 (binario naturale)
    -   +123 = 01111011 (complemento a 2 positivo)
    -   -123 = **10000101** (risultato dell'inversione di 01111011 e
        della somma di 1)
-   Converto -0.21 (valore assoluto e poi opposto in C2):

         0,21 x 2 = 0,42
         0,42 x 2 = 0,84
         0,84 x 2 = 1,68
         0,68 x 2 = 1,36
         0,36 x 2 = 0,72
         0,72 x 2 = 1,44
         0,44 x 2 = 0,88
         0,88 x 2 = 1,76
         0,76 x 2 = 1,52
         0,52 x 2 = 1,04
         0,04 x 2 = 0,08
         0,08 x 2 = 0,16
         ......

    -   0,21 = ,001101 (valore frazionario approssimato su 6
        bit, approssimato)

    -   prima di calcolare il valore negativo bisogna estendere il segno
        di ,001101 (indicato con le parentesi):

    -   (0),001101 = 0.21 su 7 bit in C2 (il primo bit e' il peso di
        -2\^0 e rappresenta, di fatto, il suo segno)

    -   e calcolare l'opposto come se fosse un numero C2 tradizionale:

    -   (1),110010 + (0),000001 = **(1),110011** (valore di -0,21 su 7
        bit, approssimato)

-   Per fare la somma di -0.21 e -123 bisogna estendere il segno di
    -0.21 (su 14 bit): (11111111),110011

-   La somma finale di -0.21 e -123 (su 14 bit):

	    -0.21 = (11111111), 110011
	    -123  =  10000101 , 000000
	    ~~~~~~~~~~~~~~~~~~~~~~~~~~
	    10000100 , 110011

-   Risultato: **10000100,110011**

Metodo del fattore di scala
---------------------------

Conversione di -123.21 in virgola fissa con 8 bit parte intera e 6
decimale:

-   -123.21 x 64 = - 7885,44

-   Converto prima il valore assoluto 7885 in binario e poi lo nego:

        7885:2 (resto) 1
        3942:2 (resto) 0
        1971:2 (resto) 1
        985 :2 (resto) 1
        492 :2 (resto) 0
        246 :2 (resto) 0
        123 :2 (resto) 1
        61  :2 (resto) 1
        30  :2 (resto) 0
        15  :2 (resto) 1
        7   :2 (resto) 1
        3   :2 (resto) 1
        1   :2 (resto) 1
        0

    -   7885 = 01111011001101
    -   -7885 = 10000100110010 + 1 = **10000100110011**
-   **Conclusione**: approssimazione migliore possibile su 14 bit di
    -123,21:

**10000100,110011**

-   **Controllo**, quanto vale 10000100,110011:

    -   -128+4 = -124
    -   1/2+1/4+1/32+1/64 = 0,796875
    -   -124+0,796875 = **-123.203125**
    -   Errore di approssimazione: 0.007

-   Il risultato e' **identico** a quello trovato col
    metodo tradizionale. 

Virgola fissa
=============

Si definisca il numero minimo di bit per rappresentare in virgola fissa
C2 i seguenti numeri e si ricavi la codifica equivalente:

-   2
-   0.25
-   -2
-   -2.25

**Soluzione**:

| Numero (decimale) | bit minimi                                      |  Codifica binaria del numero|
|:-----------------:|-------------------------------------------------|----------------------------:|
|         2         | 3 (3 per parte intera, 0 per parte frazionaria) |                          010|
|        0.25       | 3 (1 per parte intera, 2 per parte frazionaria) |                         0.01|
|         -2        | 2 (2 per parte intera, 0 per parte frazionaria) |                           10|
|       -2.25       | 5 (3 per parte intera, 2 per parte frazionaria) |                       101.11|

*Nota: il punto nella codifica serve a separare la rappresentazione in
parte intera e frazionaria*



## Codifica di 0.2

Si rappresenti il numero 0.2 e si stabilisca se tale rappresentazione è
esatta e, nel caso non lo fosse spiegare il perche':

**Spazio soluzione:**

Se calcoliamo la codifica manualmente:

    0.2 x 2 = 0.4
    0.4 x 2 = 0.8
    0.8 x 2 = 1.6
    0.6 x 2 = 1.2
    0.2 x 2 = 0.4 <- uguale alla prima moltiplicazione

Notiamo che non arriveremo mai ad una rappresentazione esatta del
numero. Esso sara' infatti rappresentato da una sequenza infinita di

    001100110011001100110011..


Virgola mobile
==============

1.  Si determini la codifica del valore 8.0 secondo lo Standard IEEE
    754-1985 a precisione singola, riportando i calcoli effettuati.
2.  Si determini la codifica del valore 0.4 secondo lo stesso standard,
    sempre riportando i calcoli effettuati.
3.  Si consideri il seguente programma in linguaggio C e si indichi
    l'effetto della sua esecuzione, motivando adeguatamente la risposta.


``` c
#include <stdio.h>

int main() {
    float f;
    int i;

    f = 0.4;

    for (i = 1; i < 20; i++)
        f = f + 0.4;

    printf("\n\nIl numero 0.4 * 20 ");
    if (f != 8.0) printf("non ");
    printf("e' uguale a %f\n\n", 8.0);

    return 0;
}
```


**Soluzione**

La rappresentazione di 8 è:

    0 10000010 00000000000000000000000

Si noti che la rappresentazione è esatta, nel senso che non sono state
introdotte approssimazioni. La rappresentazione di 0.4 è periodica:

    0 01111101 10011001100110011001100

Si noti che la rappresentazione è approssimata, per via del fatto che la
parte frazionaria è periodica. In conclusione, viene visualizzata la
scritta

    Il numero 0.4 * 20 non e' uguale a 8.0

a causa degli errori che si accumulano durante le operazioni di somma,
poiché l'addendo è rappresentato in modo approssimato, e la somma viene
confrontata col numero 8.0 che invece è rappresentato in modo esatto.

Virgola mobile
==============

Dati i seguenti due numeri in codifica IEEE 754 (virgola mobile, il bit
più a sinistra è ovviamente il bit di segno)

    A = 00111111100100000000000000000000

    B = 10111110000100000000000000000000

Calcolare a quanto equivale la divisione A/B (in decimale)

**Soluzione**

I numeri si differenziano solo per esponente e segno. Si puo' calcolare
la divisione prendendo in considerazione solo gli esponenti:

    A = - B*2^3

Quindi:

    A/B = -8

Si puo' anche notare che:

    A =      (1+2^(-3))        =   1.125
    B = -1 * (1+2^(-3))*2^(-3) = - 0.140625
