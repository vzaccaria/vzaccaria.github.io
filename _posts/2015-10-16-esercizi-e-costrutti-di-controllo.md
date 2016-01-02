---
title: Esercizi e costrutti di controllo
date: 2015-10-16 12:25:31

layout: post
category : infob
tags : ['esercizi su algoritmi']
---

Ecco di seguito le slides presentate oggi oggi; vi ricordo pero' che il
materiale che sarà oggetto delle prove scritte e orali di questo corso è
indicato nel [programma dettagliato](http://www.vittoriozaccaria.net/deposit/programmaInfoB.pdf);
**quindi non è sufficiente studiare solo le slides o gli appunti della
lezione**.

- Slides su `find` e operatori logici: [(pdf)](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/le_matlab_1.pdf)

Ecco gli esercizi che abbiamo visto oggi, con i relativi diagrammi:

# Calcolo sconto:<a id="sec-1" name="sec-1"></a>

Scrivere un programma che riceve in ingresso un prezzo ed uno sconto da
applicare e restituisce il prezzo scontato e il risparmio ottenuto.

**Diagramma di flusso**:

![img](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/post-images/df_calcolo_sconto.png)

**Script**:

```octave
prezzo = 1000;
sconto = 2;
risparmio = prezzo * (sconto/100);
finale = prezzo - risparmio;
fprintf('Prezzo: %g, scontato: %g', prezzo, finale)
```

**Risultato esecuzione**:

    Prezzo: 1000, scontato: 980

# Conversione tempo<a id="sec-2" name="sec-2"></a>

Convertire in ore, minuti e secondi una data quantita' espressa in secondi.

**Diagramma di flusso**:

![img](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/post-images/df_conversione_tempo.png)

**Script**:

```octave
sec = 2391
h = floor(sec/3600);
min = floor((sec - h*3600)/60);
sec = sec - h*3600 - min*60;

fprintf('Equivalgono a %g ore, %g minuti e %g secondi\n', h, min, sec);
```

**Risultato esecuzione**:

    sec =  2391
    Equivalgono a 0 ore, 39 minuti e 51 secondi

# Resto divisione<a id="sec-3" name="sec-3"></a>

1.  Analisi del problema:
    -   INPUT (variabili e tipo)?
        -   Dividendo 'D': intero
        -   Divisore 'd': intero

    -   OUTPUT?
        -   Resto 'r': intero

2.  Progettazione dell'algoritmo con diagramma di flusso:

![img](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/post-images/df_resto_divisione.png)

1.  Programmazione
    1.  Scelta variabili di cui si ha bisogno
    2.  Traduzione dallo pseudocodice al codice Matlab

**Script**:

```octave
dividendo = 13
divisore = 2
quoziente = floor(dividendo/divisore)
resto = dividendo - quoziente * divisore
```

**Risultato esecuzione**:

    dividendo =  13
    divisore =  2
    quoziente =  6
    resto =  1

# Conversione implicita<a id="sec-4" name="sec-4"></a>

**Script**:

```octave
i1 = 3;
i2 = 4;
f1 = 15.45;
f2 = 3.1415;
c1 = 'a';
c2 = 'b';

i2 = i1 + 5
f1 = i1 + 1.1
f2 = f2 * f2
i1=f2+8
i2 = i2 + c1
c2 = c2 + 3
fprintf('c2 = %c (corrisponde al codice ASCII %g)\n', c2, c2);
```

**Risultato esecuzione**:

    i2 =  8
    f1 =  4.1000
    f2 =  9.8690
    i1 =  17.869
    i2 =  105
    c2 =  101
    c2 = e (corrisponde al codice ASCII 101)

# Uso di `find` per l'analisi dei pazienti

Carica pazienti:

    load('patients')

Trova pazienti che fumano con eta' maggiore dei 40:

```octave
>> Smoker(find(Age >= 40))

ans =

     0
     0
     0
     0
     0
     0
     0
     1
     ...
```

Trova la percentuale dei pazienti piu' vecchi di 40 anni che fumano:

```octave
>> fum40 = Smoker(find(Age >= 40))
>> sum(fum40)/size(fum40,1)

ans =

    0.3636

```


Trova i cognomi dei pazienti che fumano e hanno piu' di 40 anni:

```octave
>> LastName(find(Age>=40 & Smoker))


ans =

    'Martin'
    'Lee'
    'Wright'
    'Baker'
    'Roberts'
    'Collins'
    'Stewart'
    'Sanchez'
    'Morris'
    'Reed'
    'Bell'
    'Ramirez'
    'Watson'
    'Hughes'
    'Russell'
    'Diaz'

```
