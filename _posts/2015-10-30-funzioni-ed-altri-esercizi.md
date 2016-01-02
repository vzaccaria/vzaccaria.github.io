---
title: Funzioni ed altri esercizi
date: 2015-10-30 08:18:05

layout: post
category : infob
tags : ['funzioni']
---

Ecco di seguito le slides presentate oggi oggi; vi ricordo pero' che il
materiale che sarà oggetto delle prove scritte e orali di questo corso è
indicato nel [programma
dettagliato](http://www.vittoriozaccaria.net/deposit/programmaInfoB.pdf);
**quindi non è sufficiente studiare solo le slides o gli appunti della
lezione**.

- [Introduzione alle funzioni in Matlab](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/le_matlab_4.pdf)

# Tracing<a id="sec-1" name="sec-1"></a>

Si determini l'output del seguente programma e il valore delle variabili interne ad ogni passo:

```octave
s = 0;
for i=1:10
  j = i * 2;
  fprintf("i=%d, j=%d\n",i,j)
  while j>0
    s = s + 1;
    j = j - 1;
  end
  if(mod(s,2)==0)
    fprintf("s=%d\n", s);
  end
end
```

**Esecuzione**


    i=1, j=2
    s=2
    i=2, j=4
    s=6
    i=3, j=6
    s=12
    i=4, j=8
    s=20
    i=5, j=10
    s=30
    i=6, j=12
    s=42
    i=7, j=14
    s=56
    i=8, j=16
    s=72
    i=9, j=18
    s=90
    i=10, j=20
    s=110

# Segnale audio<a id="sec-2" name="sec-2"></a>

Un segnale audio puo' essere visto come una sequenza finita di numeri reali;
immaginate di avere un segnale memorizzato in un vettore `sig`
di lunghezza `LEN` pari a 1024 con valori reali compresi tra 0 e 10 (inclusi):

`sig = 0.42, 0.91, 5.24, 3.07, 1.11, ..., 9.50, 1.50`

Si vuole realizzare un cosiddetto *filtro a media mobile a finestra 3* per analizzare
il segnale; il filtro e' un programma che si comporta come segue:

> Ogni valore del segnale `sig` viene sostituito con la media aritmetica
> degli `N` valori precedenti (quindi il valore stesso non deve essere considerato).
> Il filtro lascia immutati i primi `N` valori del segnale.

Se volessimo rappresentare il valore originale del segnale e quello sovrascritto, avremmo:


|   `sig` |     `sig` sovrascritto | nota                              |
| ------- | :--------------------: | --------------------------------- |
|    0.42 |                   0.42 | immutato                          |
|    0.91 |                   0.91 | immutato                          |
|    5.24 |                   5.24 | immutato                          |
|    3.07 |                   2.19 | (0.42 + 0.91 + 5.24) / 3 = 2.19   |
|    1.11 |                   2.78 | (0.91 + 5.24 + 2.19) / 3 = 2.78   |


**Programma**

```octave
s = [ 0.42 0.91 5.24 3.07 1.11 ]

for i=4:size(s,2)
   s(i) = mean(s(i-3:i-1));
end
s
```


**Esecuzione**


    s =

       0.42000   0.91000   5.24000   3.07000   1.11000

    s =

       0.42000   0.91000   5.24000   2.19000   2.78000

# Calcolo precipitazioni<a id="sec-3" name="sec-3"></a>

Sia dato un array definito in Matlab e contenente le informazioni riguardanti le precipitazioni registrate da una stazione meteorologica. Ogni elemento dell'array `dati` è una `struct` che contiene un campo numerico `giorno`, un campo numerico `mese`, un campo numerico `anno`, e un campo numerico `mm` che rappresenta la quantità di pioggia (in mm) caduta nella data specificata dai precedenti campi.

Supponiamo che l'array `dati` sia stato popolato come segue:

```octave
dati(1) = struct("giorno", floor(rand*30), "mese", floor(rand*12), "anno", 2013, "mm", rand*20);
dati(2) = struct("giorno", floor(rand*30), "mese", floor(rand*12), "anno", 2013, "mm", rand*20);
dati(3) = struct("giorno", floor(rand*30), "mese", floor(rand*12), "anno", 2013, "mm", rand*20);
dati(4) = struct("giorno", floor(rand*30), "mese", floor(rand*12), "anno", 2013, "mm", rand*20);
dati(5) = struct("giorno", floor(rand*30), "mese", floor(rand*12), "anno", 2013, "mm", rand*20);
dati(6) = struct("giorno", floor(rand*30), "mese", floor(rand*12), "anno", 2013, "mm", rand*20);
dati(7) = struct("giorno", floor(rand*30), "mese", floor(rand*12), "anno", 2013, "mm", rand*20);
dati(2)
```

e quindi il diagramma della struttura dati corrispondente e':

![img](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/post-images/sd_pioggia.png)

Dovete a questo punto scrivere uno script Matlab che dato l'array `dati` e un `anno` specifico (ad. es. 2013)
deve calcolare un array `stat` di 12 elementi che fornisca il valore medio dei mm di pioggia in ciascun mese dell'anno solare `anno`.


**Programma**

```octave
for i = 1:100
   dati(i) = struct("giorno", floor(rand*30), "mese", floor(rand*12)+1, "anno", 2013, "mm", rand*20);
end

anno = 2013

for i = 1:12
  idx = [dati.anno] == anno & [dati.mese] == i;
  stat(i) = mean([dati(idx).mm]);
end
stat
```


**Esecuzione**

    anno =  2013
    stat =

     Columns 1 through 8:

        8.5274   12.9783    8.5189   12.1428    8.1414    8.2710   11.6435    9.5565

     Columns 9 through 12:

       10.7811    8.3439   11.6579   12.3771
