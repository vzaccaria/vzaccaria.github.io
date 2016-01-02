---
category: infob
date: '2015-12-04 08:18:05'
layout: post
tags:
- linguaggio c
title: Linguaggio C, tipi e ambiente di sviluppo
---

Ecco di seguito le slides presentate oggi oggi; vi ricordo pero' che il
materiale che sarà oggetto delle prove scritte e orali di questo corso è
indicato nel [programma
dettagliato](http://www.vittoriozaccaria.net/deposit/programmaInfoB.pdf);
**quindi non è sufficiente studiare solo le slides o gli appunti della
lezione**.

-   [Slides viste a lezione](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/le_linguaggioc_1.pdf).

Abbiamo iniziato a giocare con l'ambiente Code::Blocks; ecco due guide per installarlo sulla vostra macchina:

- [Guida all'installazione di Code::Blocks](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/guida_installazione_codeblocks_franchi.pdf).

- [Guida alla risoluzione di problemi con Code::Blocks](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/guida_risoluzione_problemi_codeblocks.pdf).

Seguono alcuni degli esercizi visti oggi:

# Conversione tempo

Scrivere un programma che prende in ingresso un tempo espresso in secondi e ne restituisce l'equivalente nel formato "ore, minuti, secondi".

**Soluzione:**

``` c
#include <stdio.h>
int main()
{
    int sec, min, h;
    printf("Inserisci il numero di secondi:\n");
    scanf("%d", &sec);

    h = sec/3600;
    min = (sec - h*3600)/60;
    sec = sec - h*3600 - min*60;

    printf("Equivalgono a %d ore, %d minuti e %d secondi\n", h, min, sec);
    return 0;
    }
```


# Resto divisione

1. Analisi del problema:

    * INPUT (variabili e tipo)?
        * Dividendo 'D': intero
        * Divisore 'd': intero

    * OUTPUT?
        * Resto 'r': intero

2. Progettazione dell'algoritmo pseudocodice:

    1. Leggi 'D' e 'd' da tastiera
    2. Calcolo quoziente Q = D/d (divisione troncata)
    3. Calcolo resto come r = D - d * Q

3. Programmazione

    1. Scelta variabili di cui si ha bisogno
    2. Traduzione dallo pseudocodice al codice C

*Soluzione*:

``` c
#include <stdio.h>

int main(int argc, char **argv)
{
    int D, d, Q, r;
    printf("Dividendo: ");
    scanf("%d", &D);
    printf("Divisore: ");
    scanf("%d", &d);

    Q = D/d;
    r = D - Q * d;

    printf("Resto: %d \n", r);
}
```

*Soluzione utilizzando l'operatore di modulo*:

``` c
#include <stdio.h>

int main(int argc, char **argv)
{
    int D, d, Q, r;
    printf("Dividendo: ");
    scanf("%d", &D);
    printf("Divisore: ");
    scanf("%d", &d);

    r = D % d;

    printf("Resto: %d \n", r);
}
```
