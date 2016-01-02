---
category: infob
date: '2015-11-10 08:18:05'
layout: post
tags:
- funzioni
- esercizi
title: Esercizi sulla ricorsione e codifica binaria
---

Ecco di seguito le slides presentate oggi; vi ricordo pero' che il
materiale che sarà oggetto delle prove scritte e orali di questo corso è
indicato nel [programma
dettagliato](http://www.vittoriozaccaria.net/deposit/programmaInfoB.pdf);
**quindi non è sufficiente studiare solo le slides o gli appunti della
lezione**.

- [Funzioni
di ordine superiore](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/le_matlab_6.pdf)

- [Codifica binaria](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/le_codifica_0.pdf)


# Matrice con frazioni

Si assuma di avere una matrice di 2 righe ed un numero arbitrario di colonne, ad esempio:

<div> \begin{equation} M = \left[\begin{array}{ccc} 1 & 3 & 1  \\ 2 & 4 & 3  \\ \end{array} \right] \end{equation} </div>

Ogni colonna della matrice rappresenta una frazione (ad esempio, per $M$):

<div> \begin{equation} \frac{1}{2}, \frac{3}{4}, \frac{1}{3} \end{equation} </div>

Si scriva una funzione __ricorsiva__ `frac` che, ricevuta una qualsiasi matrice `M` in ingresso, ritorni il numeratore `n` ed il denominatore `d` della frazione risultante dalla somma delle frazioni contenute in `M`.

Ad esempio:

    [n d] = frac([1 3 1; 2 4 3])

ritorna

    n = 19
    d = 12

poichè:

<div> \begin{equation} \frac{1}{2} + \frac{3}{4} + \frac{1}{3} = \frac{12 \times 1 + 6 \times 3 + 2 \times 4}{2 \times 4 \times 3} = \frac{19}{12} \end{equation} </div>


La frazione deve essere minimizzata, ovvero non vi devono essere divisori comuni tra `n` e `d`. Nel progettare `frac`, si può utilizzare la funzione `gcd(a,b)` che ritorna il massimo comun divisore tra `a` e `b`.

## Soluzione

```octave
function [n, d] = frac(M)
    if size(M,2) == 1
        n = M(1,1);
        d = M(2,1);
    else
        [c d] = frac(M(:,2:end));
        a = M(1,1);
        b = M(2,1);

        k = a*d + c*b;
        l = b * d;

        n = k/gcd(k,l);
        d = l/gcd(k,l);
    end
end
```

# Quadrati concentrici

Si considerino i seguenti esempi di matrici costruite da "quadrati concentrici":


```matlab
matr1 =
     2     2     2     2     2     2
     2     3     3     3     3     2
     2     3     4     4     3     2
     2     3     4     4     3     2
     2     3     3     3     3     2
     2     2     2     2     2     2
```



```matlab
matr2 =
     2     2     2     2     2
     2     5     5     5     2
     2     5     1     5     2
     2     5     5     5     2
     2     2     2     2     2
```


Come si vede dagli esempi, si tratta di matrici quadrate in cui i valori che si trovano sulla n-esima riga, n-esima colonna, e sulle righe e colonne simmetriche a queste sono uguali tra loro.

## Domanda 1

Si sviluppi in Matlab una funzione ricorsiva `quadratiConcentrici` che, data una generica matrice, restituisca 1 se la matrice è costituita da quadrati concentrici, 0 altrimenti.


Per sviluppare questa funzione si assuma di avere a disposizione la funzione `valoriDiCorniceUguali` che, data una matrice quadrata, restituisce 1 se tutti i valori disposti sulla sua cornice esterna (costituita dalla prima e dall’ultima riga e dalla prima e dall’ultima colonna) sono uguali tra loro, 0 altrimenti. Per esempio: `valoriDiCorniceUguali(matr1)` restituisce 1.

NB: non si chiede di sviluppare `valoriDiCorniceUguali`. Ci si focalizzi solo sulla funzione ricorsiva.

### Soluzione:


```matlab
function [ris] = quadratiConcentrici(m)
    [r, c] = size(m);
    if r ~= c
        ris = false;
    else
        if r == 1 || r == 0
            ris = true;
        elseif valoriDiCorniceUguali(m)
            ris = quadratiConcentrici(m(2:end-1, 2:end-1));
        else
              ris = false;
        end
    end
end

```
