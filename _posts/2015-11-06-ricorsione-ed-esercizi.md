---
category: infob
date: '2015-11-06 08:18:05'
layout: post
tags:
- funzioni
- esercizi
title: Ricorsione ed esercizi
---

Ecco di seguito le slides presentate oggi oggi; vi ricordo pero' che il
materiale che sarà oggetto delle prove scritte e orali di questo corso è
indicato nel [programma
dettagliato](http://www.vittoriozaccaria.net/deposit/programmaInfoB.pdf);
**quindi non è sufficiente studiare solo le slides o gli appunti della
lezione**.

-   [Funzioni
    ricorsive](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/le_matlab_6.pdf)

Alcuni degli esercizi seguenti non sono stati fatti oggi a
esercitazione.

Profilo argine
==============

La seguente figura mostra l’andamento del profilo dell’argine di un
fiume `p(m)` in funzione della distanza dalla foce `m`:

      p(m)
        |                                         /
        |        o_________o                     /
        |       /           \                   /
        |  o___o             \                 /
        |                     \               /
        |                      \             /
        |                       o___________o
        |
        |
        |____________________________________________________
                                                            m

Come si nota, l’argine presenta altezze diverse nei vari punti del
fiume. Si supponga che il fiume scorra in piano lungo tutto il suo
percorso (non ci sono quindi salti di livello).

Si chiede di sviluppare in Matlab/Octave una funzione `calcolaRischio`
che sia in grado di identificare e restituire al chiamante i punti
dell’argine a rischio di esondazione in giornata, in base a:

1.  profilo dell’argine `p(m)`: vettore contenente l'altezza dell'argine
    in metri rispetto al fondo del letto del fiume a distanza `m` dalla
    foce (nella precedente figura i dati contenuti in
    `p(m)`sono cerchiati)

2.  l’altezza attuale `a` del fiume (in metri) rispetto al fondo del
    letto del fiume (sempre considerando la distanza dalla foce `m`).

3.  quanti millimetri `mil` di pioggia fara' durante la giornata
    (al massimo).

Ovviamente i punti dell’argine a rischio di esondazione in giornata sono
quelli in cui l’altezza dell’argine è minore dell’altezza massima che
può raggiungere il fiume.

1.  Si scriva il codice della funzione `calcolaRischio`:

    ``` octave
    function pr = calcolaRischio(p, a, mil)
        pr = find(p <= a + (mil / 1000));
    end
    ```

2.  Si costruisca uno script che:

    -   carica da un file ascii `profiloArgine.txt` (contenente un
        numero per ogni riga) i dati relativi alle altezze dell’argine
        del fiume nei vari punti (ovvero `p(m)`).

    -   chiede all’utente l’altezza attuale del fiume `a` e la
        previsione di incremento giornaliero totale di altezza del fiume
        in base alla pioggia prevista `mil`.

    -   genera una tabella `tab` contenente, per ciascun punto in cui
        puo' avvenire una esondazione, il minuto in cui questa
        potra' avvenire.

        ``` octave
        load('profiloArgine.txt');
        a      = input('Altezza attuale: ');
        mil    = input('Incremento totale previsto millimetri: ');

        pr     = calcolaRischio(p, a, mil) ;

        minuti = 1000 * 24 * 60 * (p - a) / mil;
        tab    = [ p’ minuti’ ];
        tab    = tabella(punti, :)
        ```

Andamento capitale
==================

Il Sig. Rossi ha predisposto investimenti in svariati strumenti
finanziari (azioni, obbligazioni, titoli di stato, etc..) e ha annotato:

-   Il **capitale iniziale** di ogni investimento (a gennaio 2012).

-   Il **valore corrente** di ogni investimento (a gennaio 2013).

Il Sig. Rossi a gennaio 2012 ha preventivato di ottenere una rendita
minima dai suoi investimenti. La rendita minima è uguale per tutti gli
investimenti ed è espressa come una percentuale; è quindi numero
nell'intervallo tra 0 e 1 (ad esempio +3% = 0.03).

Si assuma che il capitale iniziale e il valore corrente degli
investimenti vengano ordinatamente salvati in due vettori di uguale
lunghezza chiamati, rispettivamente, `ci` e `vc`, e che quindi l’indice
di questi vettori identifichi univocamente lo strumento finanziario nel
quale il Sig. Rossi ha investito.

Sviluppare una funzione Matlab/Octave chiamata `controllaRendita` che
restituisce, in un vettore `tb` gli indici degli investimenti che sono
cresciuti, a gennaio 2013, di una percentuale maggiore o uguale alla
rendita minima `rm` che il Sig. Rossi sperava di ottenere quando ha
investito:

**Spazio soluzione:**

``` octave
function tb = controllaRendita(ci, vc, rm)
         tb = find(vc ./ ci >= 1 + rm)
end
```

Si costruisca uno script che:

-   carica dal file ascii `capitaleIniziale.txt` gli importi degli
    investimenti a gennaio 2012 e dal file ascii `valoreCorrente.txt` i
    valori correnti degli investimenti (ogni file contiene un numero per
    ogni riga).

-   Richieda all'utente di inserire una rendita minima percentuale `rm`.

-   Genera una tabella `tab` contenente il capitale iniziale e finale
    dei soli titoli buoni e la sua rendita calcolata come:

        r(ii) = (vc(ii) / ci(ii)) - 1

**Spazio soluzione:**

``` octave
ci      = load('ci.txt');
vc      = load('vc.txt');
rm      = input('Inserire il valore della rendita minima (in intervallo [0,1]): ');

tb      = controllaRendita(ci, vc, rm);

rendita = vc ./ ci - 1;
tab     = [ci' vc' rendita']
tab     = tab(tb)
```

Codice ISBN
===========

Il codice ISBN è una sequenza numerica di 13 cifre usata
internazionalmente per la classificazione dei libri. L'ultima cifra del
codice ISBN svolge una funzione di controllo e viene calcolata con il
seguente algoritmo:

-   si moltiplica ognuna delle prime 12 cifre per un peso definito in
    base alla posizione della cifra stessa nella sequenza: la prima
    cifra si moltiplica per 1, la seconda per 3, la terza per 1, la
    quarta per 3 e così via

-   si sommano i risultati delle 12 moltiplicazioni

-   si divide la somma per 10 e si prende il resto della divisione

-   si sottrae il resto della divisione da 10: la cifra che si ottiene è
    la cifra di controllo, ovvero la 13-esima cifra del codice ISBN.

Si risponda ai seguenti quesiti:

1.  Implementare in linguaggio Matlab una funzione `controllo` che
    riceve in ingresso un vettore numerico contenente le prime 12 cifre
    di un codice ISBN e ritorna la corrispondente 13-esima cifra
    di controllo.

    Esempio:

        controllo([9 7 8 8 8 4 3 0 2 5 3 4])

    ritorna 3 poichè:

        9*1 + 7*3 + 8*1 + 8*3 + 8*1 + 4*3 + 3*1 + 0*3 + 2*1 + 5*3 + 3*1 + 4*3 = 117
        117 mod 10 = 7
        10 - 7 = 3

    **Spazio soluzione:**

        function c = controllo(a)
             s = sum(a(1:2:12)) + sum(3 * a(2:2:12));
             c = 10 - mod(s,10);
        end

2.  Implementare in linguaggio Matlab una funzione `verifica` che riceve
    in ingresso un vettore numerico contenente le 13 cifre di un codice
    ISBN e ritorna `true` se la cifra di controllo è corretta,
    `false` altrimenti.

    Esempio:

        verifica([9 7 8 8 8 4 3 0 2 5 3 4 3])

    ritorna `true` dato che, come visto sopra, la cifra di controllo
    corretta per l’input considerato è 3.

    **Spazio soluzione:**

        function r = verifica(a)
            r = a(13) == controllo(a(1:12));
        end

Assegnamento di Matrici
=======================

Si implementi in MATLAB una funzione che svolga le seguenti operazioni:

-   Riceve in ingresso due matrici `A` e `B` di `M`x`N` elementi.
-   Produce una terza matrice `C` ottenuta da `A` e `B` secondo la
    seguente regola:

$$
C(r,c) =
\left\{
\begin{array}{ll}
 A(r,c), & \textrm{se } B(r,c) < \textrm{minimo valore di tutta la matrice A} \\
 B(r,c), & \textrm{altrimenti} \\
\end{array}
\right.
$$

Ove \\(r,c\\) sono, rispettivamente, la riga e la colonna dell'elemento
considerato.

Ad esempio, se:

$$
A =
\left[
\begin{array}{ll}
 9 & 2 \\
 3 & 4 \\
\end{array}
\right],
B =
\left[
\begin{array}{ll}
 10 & 8 \\
 1 & 7 \\
\end{array}
\right]
$$

allora:

$$
C =
\left[
\begin{array}{ll}
 10 & 8 \\
 3 & 7 \\
\end{array}
\right]
$$

Poiché solo \\(B(2,1)\\) è minore del minimo di \\(A\\) che è 2.

Si tenga presente che, nel risolvere l'esercizio, **non è possibile
usare cicli `for`**.

**Spazio soluzione:**

``` matlab
function C = funz(A, B)
    C = B;
    C(min(min(A)) > B)=A(min(min(A)) > B)
end
```

Estrazione cifra
================

L'esercizio e' composto da due punti; nelle soluzioni non è consentito
l’uso della funzione `num2str` di Matlab/Octave:

1.  Scrivere la funzione ricorsiva `cifra()` che riceve come parametri
    due numeri interi `num` e `k` (si supponga che entrambi i numeri
    siano sempre strettamente positivi). La funzione `cifra` restituisce
    la `k`-esima cifra del numero `num` a partire da destra.

    Esempi:

    -   `cifra(1456, 1)` deve restituire 6
    -   `cifra(5136, 4)` deve restituire 5
    -   `cifra(512, 2)` deve restituire 1

    <!-- -->

    ``` octave
    function ris = cifra(num, k)
        if k == 1
                ris = mod(num, 10);
        else
                ris = cifra(floor(num/10), k-1);
        end
    end
    ```

2.  Riscrivere la funzione ricorsiva del punto precedente in modo tale
    che nel caso in cui `k` sia maggiore del numero effettivo di cifre
    che compongono `num` la funzione restituisca -1.

    ``` octave
    function ris = cifraConControllo(num, k)
        if (k > 1 && num < 10)
            ris = -1
        else
            if k == 1
                ris = mod(num, 10);
            else
                ris = cifraConControllo(floor(num/10), k-1);
            end
        end
    end
    ```

Conta cifre
===========

L'esercizio e' composto da due punti; nelle soluzioni non è consentito
l’uso della funzione `num2str` di Matlab/Octave:

1.  Scrivere una funzione ricorsiva `contaCifre()` che riceve come
    parametri un numero intero `num` (strettamente positivo) e
    restituisce il numero di cifre che compongono `num`.

    Ad esempio:

    -   `contaCifre(1456)` deve restituire 4
    -   `contaCifre(5)` deve restituire 1

    Nota: Non è consentito l’uso della funzione `num2str`
    di Matlab/Octave.

    **Spazio soluzione:**

    ``` octave
    function ris = contaCifre(num)
                   if (num <= 9)
                        ris = 1;
                   else
                        ris = 1+ contaCifre(floor(num/10));
                   end
    ```

2.  Scrivere la funzione ricorsiva `contaNonMultipli()` che prende in
    ingresso due interi `num` e `n` (entrambi strettamente positivi) e
    conta quante cifre è necessario rimuovere in coda a `num` (ossia
    nella parte destra di `num`) prima di ottenere un multiplo di `n`.

    Ad esempio:

    -   `contaNonMultipli(12333, 2)` restituisce 3 (perché 12333, 1233,
        123 non sono multipli di 2, mentre 12 lo è).
    -   `contaNonMultipli(12300, 2)` restituisce 0 (perché 12300 è
        multiplo di 2).

    **Spazio soluzione:**

    ``` octave
    function ris = contaNonMultipli(num , n)
                   if  (num == 0)
                        ris = 0;
                   elseif (mod(num , n) == 0)
                        ris = 0;
                        disp([num2str(num) ' è divisibile per ', num2str(n)]);
                   else
                        ris = 1 + contaNonMultipli(floor(num/10), n);
                   end
    end
    ```

Grigliopoli
===========

Le strade della città di **Grigliopoli** sono organizzate come una griglia (alcune strade attraversano la città da est a ovest e altre da nord a sud).

Dati due incroci che distano `X` isolati lungo l'asse est-ovest della città e `Y` isolati lungo l'asse nord-sud, siete stati incaricati di calcolare il numero di percorsi a distanza minima che collegano i due incroci.

Nell’esempio qui sotto, vengono mostrati i 3 percorsi a distanza minima che collegano due incroci `A` e `B` caratterizzati da una distanza lungo l'asse `X` di 2 e lungo l'asse `Y` di 1:

              X
        *   *   *   *               *   *   *   *               *   *   *   *
          A-------+                   A---+                       A
    Y   *   *   * | *               *   * | *   *               * | *   *   *
                  B                       +---B                   +-------B
        *   *   *   *               *   *   *   *               *   *   *   *
             (1)                         (2)                         (3)


Il vostro obiettivo e' di implementare **una funzione ricorsiva** `calcola` in Matlab/Octave che ricevuti `X` e `Y` in ingresso restituisce il numero totale di percorsi corrispondenti. Ovvero, nell'esempio di sopra `calcola(2,1)` deve ritornare 3.

> **Suggerimento**: Quando `X` = 0 o `Y` = 0, c’è soltanto un cammino a distanza minima che collega i due incroci. Altrimenti, esiste più di un cammino minimo dal momento che è possibile sia avvicinarsi alla destinazione lungo l’asse est-ovest (riducendo quindi la distanza `X`) oppure avvicinarsi lungo l’asse nord-sud (riducendo la distanza `Y`)

    function [ p ] = calcola(x,y)
        if (x == 0 || y == 0)
            p = 1;
        else
            p = calcola(x-1,y) + calcola(x,y-1);
        end
    end
