---
category: infob
date: '2015-11-17 08:18:05'
layout: post
tags:
- funzioni
- esercizi
title: Esercizi di ricapitolazione
---

Mele al mercato
===============

Una signora al mercato compra un sacchetto di mele, che purtroppo le
cade durante il tragitto verso casa. Il commerciante si offre di darle
un altro sacchetto contenente lo stesso numero di mele del precedente e
le chiede quindi quale fosse questo numero. La signora, abilissima negli
indovinelli matematici, risponde così:

-   Organizzandole in file da 5 mele, ne rimangono fuori 2
-   Organizzandole in file da 7 mele, ne rimangono fuori 3

Quanto indicato dalla signora è rappresentabile dalle seguenti
equazioni, dove \\(m\\) è il numero di mele che vogliamo trovare:

$$
\\left\\{
\\begin{array}{ccc}
\\textrm{mod}(m,5) & = & 2 \\\\
\\textrm{mod}(m,7) & = & 3 \\\\
\\end{array}
\\right.
$$

Le equazioni di sopra sono un'esempio di *equazione alle congruenze*:

$$
\\left\\{
\\begin{array}{ccc}
\\textrm{mod}(m,a) & = & w_1 \\\\
\\textrm{mod}(m,b) & = & w_2 \\\\
\\end{array}
\\right.
$$ Che ci porta finalmente ad una delle soluzioni:

$$
m = b \times w_1 \times y + a \times w_2 \times x
$$

Dove \\(x\\) e \\(y\\) sono calcolati con l'**algoritmo esteso di
euclide** (nota bene: la funzione è ricorsiva e calcola
contemporaneamente una coppia di valori):

$$
(x, y) = \\textrm{calcolaCoeff}(a, b) = \\left\\{
\\begin{array}{cc}
(1, 0)     & \\textrm{quando}~(b=0) \\\\
(r_x, r_y) & \\textrm{negli altri casi} \\\\
\\end{array}
\\right.
$$

dove:

$$
\\begin{array}{rcl}
r_x        & =  & t_y \\\\
r_y        & =  & t_x - t_y * (a ~ \\textrm{div} ~ b) \\\\
(t_x, t_y) & =  & \\textrm{calcolaCoeff}(b, a ~ \\textrm{mod} ~ b) \\\\
\\end{array}
$$

Si noti che \\(a \~ \\textrm{div} \~ b\\) rappresenta la divisione
intera tra due numeri \\(a\\) e \\(b\\), e \\(a \~ \\textrm{mod} \~ b\\)
rappresenta il calcolo del resto della divisione intera del valore di
\\(a\\) per il valore di \\(b\\).

Domanda 1
---------

Implementare la funzione `calcolaCoeff` in Matlab/Octave (si usi
`fix(a/b)` per la divisione intera):

**Soluzione**

``` octave
function [x, y] = calcolaCoeff(a, b)
    if b == 0
        x = 1;
        y = 0;
    else
        [x1, y1] = calcolaCoeff(b, mod(a,b))
        x = y1;
        y = x1 - y1 * (fix(a/b));
    end
end
```

Domanda 2
---------

Si chiede di scrivere una funzione matlab che riceve i valori \\(a\\),
\\(b\\), \\(w\_1\\) e \\(w\_2\\) e calcoli il valore risultante delle
mele \\(m\\) utilizzando la funzione di cui sopra:

**Soluzione**

``` octave
function [m] = numero_di_mele(a,b,w_1,w_2)
    [ x, y ] = calcolaCoeff(a, b)
    c1 = b*w_1*y
    c2 = a*w_2*x
    m = (c1 + c2)
end
```

Domanda 3
---------

Come invochereste la funzione `numero_di_mele` per risolvere il problema
iniziale della signora del mercato? Quante mele verrebbero calcolate?

**Soluzione**

``` octave
> numero_di_mele(5, 7, 2, 3)
ans = 17
```

Calcolo disposizioni
====================

Si sviluppino in Matlab le seguenti funzioni:

Funzione n. 1
-------------

Si definisca la funzione `rimuovi(A,v)` tale che, dato un vettore `A` ed
un valore `v` in ingresso, ritorni il vettore `A` privato di `v` (se
contenuto in esso), altrimenti restituisce `A`.

Esempio:

-   `rimuovi([ 5, 6, 7 ], 5)` ritorna `[6, 7]`
-   `rimuovi([ 5, 6, 7 ], 9)` ritorna `[5, 6, 7]`

Spazio soluzione:

``` octave
function B = rimuovi(A, v)
  B = A(find(A~=v));
end
```

Funzione n. 2
-------------

Si definisca la funzione `aggiungi(Q,v)` che prende in ingresso una
matrice `Q` ed un valore `v`, e restituisce una matrice corrispondente a
`Q` a cui è stato aggiunto `v` come primo elemento di ogni riga.

Esempio:

-   `aggiungi([ 5, 4; 6, 8; 7, 9 ], 3)` ritorna
    `[ 3, 5, 4; 3, 6, 8; 3, 7, 9 ]`

Spazio soluzione:

``` octave
function T = aggiungi(Q, e)
    T = [(ones(rows(Q), 1) .* e) Q];
end
```

Funzione n. 3
-------------

Si supponga di avere un array `S` di `n` numeri distinti:

    S = [5,8,1]

Una **disposizione semplice** di lunghezza `k` di tale insieme (con `k`
≤ `n`), è rappresentabile da una matrice di k colonne che contiene, in
ogni riga, un sottoinsieme ordinato di k elementi di S.

Le righe della matrice sono tutte distinte e all’interno di ogni riga
non si possono trovare ripetizioni di uno stesso elemento. Due righe
possono contenere gli stessi elementi purché in ordine differente.

Ad esempio, una disposizione semplice di `S` con `k=2` è la matrice
seguente:

    [ 5, 8;  5, 1;  8, 5;  8, 1;  1, 5;  1, 8 ]

Il vostro compito e quello di scrivere in Matlab una funzione
**ricorsiva** `disposizioni(S,k)` che implementa il calcolo delle
disposizioni semplici `k` di un insieme `S`, ad esempio:

``` octave
octave> disposizioni([5,8,1],2)

ans =

    5   8
    5   1
    8   5
    8   1
    1   5
    1   8
```

Osservazioni utili per l'implementazione
----------------------------------------

Per `k=1`, l'elenco delle disposizioni semplici di `S` corrisponde ad
`S` *trasposto*; nel nostro esempio:

``` octave
octave> disposizioni([5,8,1],1)

    5
    8
    1
```

Quando `k>1,` le disposizioni si possono calcolare sfruttando le
funzioni n. 1 e 2 definite ai punti precedenti nel modo seguente:

1.  si rimuove un elemento `v` di `S`,
2.  si aggiunge `v` a tutte le disposizioni di `k-1` elementi di `S - v`
    (ovvero il vettore `S` a cui è stato rimosso v).

la procedura sopra deve essere ripetuta per tutti gli elementi `v` di
`S`

Nel nostro esempio, per k = 2:

|   **S**   | **v** | **S - v** | **disposizioni(S-v,1)** | **Disposizioni risultanti** |
|:---------:|:-----:|:---------:|:-----------------------:|:---------------------------:|
| \[5,8,1\] |   5   |  \[8, 1\] |         \[8; 1\]        |       \[ 5, 8; 5, 1 \]      |
| \[5,8,1\] |   8   |  \[5, 1\] |         \[5; 1\]        |       \[ 8, 5; 8, 1 \]      |
| \[5,8,1\] |   1   |  \[5, 8\] |         \[5; 8\]        |       \[ 1, 5; 1, 8 \]      |

Il risultato finale e' la fusione delle **disposizioni risultanti** in
un'unica matrice:

``` octave
[ [5, 8]; [5, 1] ; [8, 5]; [8, 1]; [1, 5]; [1, 8] ]
```

Spazio soluzione:

``` octave
function P = disposizioni(s,k)
  n = length(s);
    if k == 1
      P = s';
    else
        P = [];
        for x = 1:n
            e = s(x);
            t = rimuovi(s, e);
            Q = disposizioni(t, k-1);
            T = aggiungi(Q, e);
            P = [P; T];
        end
    end
end
```

Funzione di ordine superiore
============================

Si consideri la seguente funzione di ordine superiore:

``` matlab
function r = fun(v,f)
  r = v(1);
  for i = 2:length(v)
      r = f(r,v(i));
  end
```

Domanda 1
---------

Qual è il valore ritornato dalla chiamata:

``` matlab
fun([8 9 10 9 6 0], @max)
```

Risposta:

``` matlab
fun([8 9 10 9 6 0], @max) = 10;
```

Domanda 2
---------

Cosa fa la funzione `fun` quando l’argomento `v` è un vettore numerico
(di lunghezza pari almeno ad 1) ed `f` è `@max`? (segnare con una croce
la risposta giusta)

    [X] Ritorna il massimo di v
    [ ] Ritorna il massimo di tutti i valori di v tranne il primo
    [ ] Va in un ciclo infinito
    [ ] Altro: _____________________________________________________

Domanda 3
---------

Implementare una versione ricorsiva della funzione `fun` che non
richieda di utilizzare cicli (`for` o `while`). L’intestazione della
funzione `function r = fun(v,f)` deve rimanere invariata!

``` matlab
function r = fun(v,f)
  n = length(v);
  if n == 1
      r = v(1);
  else
      l = fun(v(1:end-1),f)
      r = f(l, v(end))
  end
```

Calcolo costi caldaia
====================

In un cinema di Milano la temperatura nella sala è regolata in modo
automatico. Un sensore monitora la temperatura rilevando un valore ogni
minuto mentre la caldaia si accende solo quando la temperatura rilevata
è inferiore a una certa soglia e si spegne non appena viene raggiunta
tale soglia.

I valori letti vengono troncati a due cifre decimali, inseriti in un
array `temp` e salvati in un file dati di Matlab chiamato `log.mat`.

Un esempio di valori contenuti nel file `log.mat` è il seguente:

    22.00
    22.50
    23.20
    21.45
    22.00
    22.35
    23.00
    23.40

Domanda 1
---------

Scrivere in Matlab una funzione calcolaCosto che:

-   riceve in ingresso un vettore di temperature `temperature`, un
    valore soglia `soglia` e un parametro `costoAlMinuto` che indica il
    costo al minuto del gas consumato dalla caldaia;

-   restituisca il costo totale `costoTotale` del gas consumato e un
    vettore `minutiAccesa` con i minuti nei quali la caldaia è
    rimasta accesa. Per il costo totale, tenere anche presente che se il
    totale dei minuti nei quali la caldaia ha funzionato supera i 30
    minuti, allora il costo del gas consumato dalla caldaia va diminuito
    del 20%.

Ad esempio, nel caso la funzione `calcolaCosto` riceva in ingresso il
valori di temperatura contenuti nel file `log.mat`, una soglia di
temperatura pari a 23.00 e un valore di `costoAlMinuto` pari a 100,
ritornerà un costo totale di 500 e `minutiAccesa = [1 2 4 5 6]`.

### Soluzione:

``` matlab
function [costoTotale,minutiAccesa] = calcolaCosto(temp, soglia, costoAlMinuto)
    minutiAccesa = find(temp < soglia);
    if (length(minutiAccesa) > 30)
        costoTotale = length(minutiAccesa) * costoAlMinuto * 0.80;
    else
        costoTotale = length(minutiAccesa) * costoAlMinuto;
    end
end
```

Domanda 2
---------

Scrivere poi uno script che:

-   definisca il valore soglia di temperatura `soglia`;
-   legga dal file `log.mat` i valori di temperatura contenuti
    nell’array `temp`;
-   definisca il valore del parametro `costoAlMinuto`;
-   crei una opportuna variabile `x` che indica i minuti;
-   disegni il grafico (con titolo del grafico e dei due assi) della
    temperatura al variare del tempo, evidenziando sul grafico stesso:

    -   la temperatura soglia con una retta orizzontale nera a doppio
        spessore;
    -   i minuti nei quali la caldaia ha funzionato, marcandoli con il
        simbolo 'X' rosso (senza congiungerli).
-   stampi a video il costo totale del gas consumato e i minuti nei
    quali la caldaia è rimasta accesa.

### Soluzione:

``` matlab
load log.mat temp;
soglia = 25;
costoAlMinuto = 10;
x = 1:size(temp, 2);
figure
hold on
ylabel('temperatura');
xlabel('minuto');
title('Temperatura sala');
plot(x, temp);
y = soglia * ones(size(x));
plot(x, y, 'k', 'LineWidth', 2);
indici = find(temp < soglia);
temp1 = temp(indici);
x1 = x(indici);
plot(x1, temp1, 'Xr');

[costoTotale, minutiAcceso] = calcolaCosto(temp, soglia, costoAlMinuto);

disp(['Costo totale del gas consumato: ', num2str(costoTotale), ' Euro.']);
disp('La caldaia ha funzionato nei seguenti minuti: ');
disp(minutiAcceso);
```


Comprensione funzione
=====================

Si consideri la seguente funzione in codice Matlab:

    function r = f(a)

        if a == 0
          r = [];
        else
          r = [f(floor(a/2)) mod(a,2)];
        end

1.  Qual è il valore ritornato dalla chiamata `f(5)`?

    **Spazio soluzione:**

    Valore risultante: `[1 0 1]`

2.  Qual è il valore ritornato dalla chiamata `f(10)`?

    **Spazio soluzione:**

    Valore risultante: `[1 0 1 0]`

3.  Ipotizzando che la funzione `f(a)` venga chiamata con un argomento a
    intero e positivo, descrivere sinteticamente cosa calcola la
    funzione

    **Spazio soluzione:**

    La funzione `f(a)` calcola le cifre della codifica binaria del
    numero `a`.

Comprensione funzione (2)
========

Siano date le seguenti due definizioni di funzioni:

``` matlab
function [qua] = paperone(a, b)
    if b==1 || b==0
        qua = false;
    else
        if (mod(a, b) == 0) && a~=b
            qua = true;
        else
            qua = paperone(a, b-1);
        end
    end
end
```

``` matlab
function [x] = paperino(aaargh)
    x = true;
    if paperone(aaargh,aaargh) ~= 1;
        x=false;
        return
    end
end
```

1.  A cosa corrisponde la funzione ricorsiva `paperone`?

    `paperone(a, b)` controlla se:

    -   c'è un divisore di `a`
    -   ed è minore di `b`
    -   ed è diverso da `a` e `1`

2.  Si dica a cosa corrisponde il caso in cui `paperino(k)` (per
    `k` intero) ritorna `true`:

    Indica se il numero `k` è un numero non primo.

3.  Si indichi l'output del seguente codice:

<!-- -->

``` matlab
for d = 1:3:20
    printf('%d - %d\n', d, paperino(d))
end
```

Output:

        1 - 0
        4 - 1
        7 - 0
        10 - 1
        13 - 0
        16 - 1
        19 - 0
