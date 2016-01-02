---
category: infob
date: '2015-12-15 18:25:31'
layout: post
tags:
- esercizi
title: Esercizi sul c
---

Punti nel piano cartesiano
===================================================

Data la seguente definizione di tipo:

``` c
typedef struct {
   float x;
   float y;
} Punto;
```

Scrivere un programma che richieda all'utente una sequenza di coppie di
punti e ne calcoli la distanza. Il programma deve terminare se l'utente
inserisce due punti pari a 0.

**Soluzione:**

``` c
#include <stdio.h>
#include <math.h>

int main()
{
    Punto a, b;
    int flag = 0;
    float distanza;

    do {
        printf ("punto 1, coord x: ");
        scanf ("%f", &a.x);

        printf ("punto 1, coord y: ");
        scanf ("%f", &a.y);

        printf ("punto 2, coord x: ");
        scanf ("%f", &b.x);

        printf ("punto 2, coord y: ");
        scanf ("%f", &b.y);

        if (a.x==0 && a.y==0 && b.x==0 && b.y==0) {
            flag =1;
            printf ("Esco dal programma...\n");
        } else {
            distanza = sqrt((a.x - b.x) * (a.x-b.x) + (a.y - b.y) * (a.y-b.y));
            printf ("distanza: %f\n", distanza);
        }
    } while (flag == 0);
    return 0;
}
```

Problemi con operatore = e ==
=============================

Attenzione alla seguente porzione di codice:

``` c
    int main() {
        int a = 0;
        if(a = 1) {
            printf("A e' uguale a 1");
        } else {
            printf("A e' uguale a 0");
        }
        return 0;
    }
```

L'uso dell'operatore di assegnamento `=` porta ad una esecuzione che non
corrisponde alle vostre aspettative (pensiamo che il controllo
intraprenda il ramo `else` mentre in realta' intraprende il `then`). Se
il programma non rispetta le nostre aspettative allora viene detto
*semanticamente* scorretto. Per rendere il programma coerente con le
nostre aspettattive dobbiamo usare `if(a == 1)`.

Calcolo massimi locali
======================

Si scriva un programma in linguaggio C per individuare le posizioni dei
massimi locali all’interno di in un vettore `v` (contenente numeri in
virgola mobile) — un elemento dell’array è un massimo locale **se è
maggiore dell’elemento precedente e seguente**.

Le posizioni dei massimi locali devono essere salvate in un secondo
vettore `pos`. In particolare il programma dovrà:

1.  Richiedere all’utente quanti numeri intende inserire (massimo 100).
2.  Richiedere all'utente tali numeri e salvarli nel vettore `v`
3.  Scandire `v` e salvare in `pos`, senza lasciare buchi, gli indici
    dei massimi locali. Le posizioni dei massimi locali sono date dagli
    indici dell’array corrispondenti ai massimi locali.

*Esempio*:

Si assuma che il vettore v contenga 12 elementi:

    v = 1, 4, 3, 5, 5, 7, 3, 12, 12, 4, 1, 100

i massimi locali sono:

-   all'indice numero 1 (poiche' 4 è maggiore sia di 1 che di 3)
-   all'indice numero 5 (poiche' 7 è maggiore sia di 5 che di 3).

**Soluzione**:

``` c

#include <stdio.h>
#define N 100

int main() {
    float v[N];
    int pos[N]; int i, j, n;
    float temp;

    do {
        printf("\ninserire n: ");
        scanf("%d", &n);
    } while(n<0 || n > N);

    for(i = 0; i < n; i++) {
        printf("\n v[%d] = ", i);
        scanf("%f", &v[i]);
    }

    n = i;
    j = 0;
    for(i = 1; i < n - 1; i++) {
        if(v[i] > v[i - 1] && v[i] > v[i + 1]) {
                pos[j] = i;
                j++;
            }
    }

    printf("\n");
    for(i = 0; i < j; i++)
        printf(" %d ", pos[i]);

    return 0;
}

```

Ricerca sottomatrici che rispettano condizione
==============================================

Scrivere un programma in linguaggio C con le seguenti caratteristiche:

-   Il programma deve acquisire da tastiera due valori interi `nRighe` e
    `nCol`. I due valori devono essere pari, maggiori di 0 e minori di
    `N`, dove `N` è una costante che deve essere opportunamente definita
    con valore 100. L'acquisizione deve essere ripetuta finché l'utente
    non inserisce valori corretti.

-   Successivamente, il programma acquisisce da tastiera `nRighe` x
    `nCol` valori interi e li memorizza in una matrice `m`, di
    dimensioni massime `N` x `N`, organizzandoli su un numero di righe
    pari a `nRighe` e un numero di colonne pari a `nCol`.

-   Infine, considerando la matrice `m` come suddivisa in sotto-matrici
    2x2, il programma deve calcolare e stampare a video il numero di
    sotto-matrici 2x2 con media maggiore di 10.

**Esempio**

Per esempio, si consideri il caso in cui l'utente inserisce la seguente
matrice `m`:

$$
m =
\left[
\begin{array}{cccccc}
3 & 20 & 4 & 5 & 2 & 7 \\
6 & 7 & 50 & 60 & 9 & 15 \\
2 & 4 & 1 & 1 & 20 & 10 \\
80 & 3 & 1 & 1 & 8 & 12 \\
\end{array}
\right]
$$

Questa matrice ha 4 righe e 6 colonne, ed è di fatto composta da 6
sotto-matrici 2x2

$$
\left[
\begin{array}{ccc}
M_1 & M_2 & M_3 \\
M_4 & M_5 & M_6 \\
\end{array}
\right]
$$

ove, ad esempio, la prima matrice:

$$
M_1 =
\left[
\begin{array}{cc}
3 & 20  \\
6 & 7 \\
\end{array}
\right]
$$

ha media pari a 9. La seconda matrice ($M_2$) ha media 29.75, la
terza 8.25, la quarta 22.25, la quinta 1 e la sesta 12.5.

Per questo particolare esempio, il valore che deve essere stampato a
video è quindi 3 poiché solo tre sotto-matrici hanno media maggiore di
10.

**Soluzione**:

``` c
int main()
{
    int m[N][N], nRighe, nCol, i, j, cont = 0;
    float media;

    /* Acquisizione dei numeri di righe e colonne */
    do{
        printf("Inserire il numero di righe: ");
        scanf("%d", &nRighe);
    } while(nRighe <= 0 || nRighe >= N || (nRighe % 2 != 0));

    do{
        printf("Inserire il numero di colonne: ");
        scanf("%d", &nCol);
    } while(nCol <= 0 || nCol >= N || (nCol % 2 != 0));

    /* Acquisizione della matrice */
    for(i = 0; i < nRighe; i++){
        for(j = 0; j < nCol; j++){
            printf("Inserire l'elemento in posizione (%d, %d): ", i, j);
            scanf("%d", &m[i][j]);
        }
    }

    /* Conteggio delle sottomatrici con media maggiore di 10 */
    for(i = 0; i < nRighe; i = i + 2){
        for(j = 0; j < nCol; j = j + 2){
            media = (m[i][j] + m[i+1][j] + m[i][j+1] + m[i+1][j+1]) / 4.0;
            if(media > 10)
                cont++;
        }
    }

    printf("Ci sono %d sottomatrici con media maggiore di 10.", cont);

    return 0;
}
```
