---
title: sistemi operativi ed esercizi su caches
date: 2016-01-22

layout: post
category : infob
tags : ['processi', 'sistemi operativi']
---

# Slides

* Slides su [processi](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/le_so_proc.pdf) e [memoria virtuale](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/le_so_vm.pdf)

# Complemento a due

Si definisca il minimo numero di bit necessari per rappresentare in complemento a 2 tutti i seguenti valori interi:

| numero | bit minimi |   codifica  |
| :----: | :--------: | ----------: |
|  149   |  9 in C2   | `010010101` |
|  108   |  8 in C2   |  `01101100` |
|   12   |  5 in C2   |     `01100` |
|   42   |  7 in C2   |   `0101010` |
|   92   |  8 in C2   |  `01011100` |


Si eseguano quindi le seguenti operazioni riportando eventuali riporti perduti o overflow:

* Calcolo di (`- 149 - 108`)

    - ricavo `-149`:

            010010101 -> nego
            101101010 -> aggiungo 1
            ---------
            101101011 (-149 su 9 bit)

    - ricavo `-108`:

             01101100 -> nego
             10010011 -> aggiungo 1
            ---------
            110010100 (-108 su 9 bit)

    - faccio la somma `-149 + (-108)`; in realta' so gia che e' overflow poiche'
      su 9 bit posso rappresentare al minimo -256, mentre il risultato e' -257:

               101101011
               110010100
               ---------
            (1)011111111 -> riporto perduto e overflow!

	   si ricordi pero' che il **riporto perduto** in C2 non e' sintomo di **overflow**. I fenomeni sono scorrelati.

* Calcolo di (`108 + 12`)

        01101100
        00001100
        --------
        01111000 -> no riporto perduto e no overflow.

# Memoria cache 1

Un sistema dotato solamente di memoria centrale ha un tempo di accesso ai dati pari a 300 ns. Per poter migliorare il tempo di accesso si decide di aggiungere una memoria cache dalle seguenti caratteristiche:

* Hit Rate = 60 %
* Hit Time = 50 ns
* Miss Penalty = 800 ns

Rispondere alle seguenti domande (giustificando i risultati ottenuti con gli opportuni calcoli):

1.  Calcolare il tempo medio di accesso ai dati.

        tempo_di_accesso = 0.6 * 50 + 0.4 * 800 = 30 + 320 = 350 ns

2.  Qual e' il valore minimo che deve avere l'Hit Rate affinche' la cache offra un vantaggio in termini di prestazioni (cioe' il tempo medio di accesso con la cache sia inferiore a 300 ns)?

        x * 50 + (1 - x) * 800  < 300        ~
                       750 * x  > 500        ~
                             x  > 2/3        ~
                             x  > ~ 66%

    L'hit rate deve essere maggiore di 66%.

# Memoria cache 2

Un sistema basato su microprocessore, senza nessuna cache, ha un tempo di accesso alla memoria di `100ns`.

1. Quale delle seguenti configurazioni *con memoria cache* può migliorare le performance del sistema considerato?


    | cfg. | hit-time | hit-rate | miss-penalty |
    | --------------------- | -------- | -------- | ------------ |
    |                     1 | 10ns     | 20%      | 150ns        |
    |                     2 | 3ns      | 20%      | 140ns        |
    |                     3 | 12ns     | 40%      | 150ns        |

     Risposta:

    | cfg. | hit-time | hit-rate | miss-penalty |    tempo di accesso   |
    | --------------------- | -------- | -------- | ------------ | --------------------- |
    |                     1 | 10ns     | 20%      | 150ns        | __122ns__             |
    |                     2 | 3ns      | 20%      | 140ns        | __112.6ns__           |
    |                     3 | 12ns     | 40%      | 150ns        | __94.8ns__ (migliore) |

2. Sapendo che migliorare la miss-penalty di una cache costa 10EUR/ns, quanto dovrò spendere per portare il sistema trovato al punto precedente per ottenere un tempo medio di accesso alla memoria di 80ns?

    Calcolo diminuzione miss-penalty per arrivare a 80ns di tempo medio:

        Tempo Medio di Accesso = 12 * 0.4 + 0.6 (150 - x) = 80ns
                                 94.8     - 0.6 x         = 80ns
                                 x = 24.66ns
    Calcolo costo:

        Costo = 24.66ns * 10EUR/ns = 246.66 EUR

# Memoria cache 3

Un calcolatore dotato solamente di memoria centrale (ovvero, sprovvisto di memoria cache) ha un tempo di accesso ai dati pari a 200 ns. Per poter migliorare il tempo di accesso si decide di aggiungere una memoria cache con le seguenti caratteristiche:

* Miss Rate = 30 %
* Miss Penalty = 600 ns
* Hit Time = 50 ns

Rispondere alle seguenti domande (giustificando i risultati ottenuti con gli opportuni calcoli):

## Domanda 1
Calcolare il tempo medio di accesso ai dati del sistema con memoria cache.

**Soluzione**

$$
\textrm{TM} = (1 - 0.3) * 50 + 0.3 * 600 = 35 + 180 = 215 \textrm{ns}
$$

## Domanda 2
Mantenendo invariati Miss Penalty e Hit Time, qual e' il valore massimo che può avere Miss Rate affinche' la cache offra un vantaggio in termini di prestazioni (cioe' il tempo medio di accesso con la cache sia inferiore a 200 ns)?

**Soluzione**

$$
\begin{array}{rcl}
(1 - x) * 50 + x * 600 & < & 200 \\
550 * x                & < & 150 \\
x                      & < & 150/550 \\
x                      & < & .27 \\
\end{array}
$$

Affinche' la cache offra un vantaggio di prestazioni, il Miss Rate deve essere inferiore a circa il 27 %


## Domanda 3
Il progettista della memoria cache e' in grado di ridurre Hit Time a 10 ns a fronte di un aumento del Miss Rate al 40%. Questa modifica sarebbe conveniente in termini di prestazioni rispetto al sistema originale?

**Soluzione**

La modifica non e' conveniente in quanto il nuovo tempo medio di accesso aumenta:


$$
\textrm{TM} = (1 - 0.4) * 10 + 0.4 * 600 = 6 + 240 = 246 \textrm{ns}
$$

