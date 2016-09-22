---
title: Soluzioni appello del 14 Settembre 2016
date: 2016-09-22

layout: post
category : infob
tags : ['soluzioni', 'esame']
---


# Esercizio su Linguaggio C (10 Punti)

Il programma in linguaggio C di gestione del magazzino di una farmacia mantiene
i dati sui farmaci disponibili in una variabile `db`. La variabile `db` consiste in
un array di elementi di tipo `Farmaco`. Il numero effettivo di valori contenuti in
tale array è memorizzato nella variabile `numeroFarmaci`.

Il tipo `Farmaco`, a sua volta, mantiene informazioni sul nome del farmaco
(`nomeFarmaco`), numero di scatole disponibili (`nscatole`) e sulle informazioni di
ciascuna scatola (`scatole`).

Le informazioni relative a ciascuna scatola sono rappresentate con il tipo
`Scatola`. Questo tipo mantiene informazioni sulla quantità (`quantita`) del farmaco
presente nella scatola (uno stesso farmaco può essere disponibile in scatole che
contengono quantità diverse di medicinale, per esempio, farmaco Marmellad
disponibile in scatole da 15 o 30 pillole) e il mese di scadenza della scatola,
definito utilizzando il seguente tipo enumerativo:

```C
typedef enum {gen, feb, mar, apr, mag, giu, lug, ago, set, ott, nov, dic} meseScadenza;
```

## Domanda 1

Data la descrizione al punto precedente specificare in linguaggio C i tipi
`Scatola` e `Farmaco` e le variabili `db` e `numeroFarmaci`. Ipotizzare che il massimo
numero di scatole sia 100 e di farmaci sia 1000.

```C
#define N 100
#define M 1000

typedef char stringa[30];

typedef enum { gen, feb, mar, apr, mag, giu, lug, ago, set, ott, nov, dic } meseScadenza;

typedef struct {
    int quantita;
    meseScadenza scadenza;
} Scatola;

typedef struct {
    stringa nomeFarmaco;
    int nscatole;
    Scatola scatole[N];
} Farmaco;

int numeroFarmaci;
Farmaco db[M];
```

## Domanda 2

Si scriva una porzione di codice in linguaggio C che, ipotizzando di avere il
nome di un farmaco nella variabile stringa `nomeF` e un mese specificato in una
variabile `mese`, stampi a video la somma totale delle quantità del farmaco la cui
scadenza e&rsquo; posteriore al valore della variabile mese. Si supponga che tutte le
variabili necessarie siano state opportunamente inizializzate. In particolare
che la variabile `db` contenga un numero di dati validi di tipo `Farmaco` pari al
valore contenuto in `numeroFarmaci`, e che `nomeF` e `mese` siano state inizializzate
con il nome del farmaco di cui verificare la disponibilità e il mese di
scadenza.

1.  Esempio

    Se `nomeF` = “Marmellad” e `mese` = lug e se supponiamo di avere fra i farmaci nella
    variabile `db` il farmaco:

        nomeFarmaco = "Marmellad"
        nscatole = 3
        scatole[0] = { quantita: 20, scadenza: apr }
        scatole[1] = { quantita: 15, scadenza: ott }
        scatole[2] = { quantita: 30, scadenza: ago }

    il programma dovrà stampare:

        Quantità di Marmellad disponibile dopo il mese 7: 45

    Poiché solo una scatola da 30 e una da 15 unità non saranno ancora scadute dopo luglio.

2.  Soluzione

    ```C
    int quantita_tot = 0;
    Farmaco f;
    for(int i = 0; i < numeroFarmaci; i++)
      if(strcmp(db[i].nomeFarmaco, nomeF) == 0) {
        f = db[i];
        for(int j = 0; j < f.nscatole; j++)
          if(f.scatole[j].scadenza > mese)
            quantita_tot += f.scatole[j].quantita;
      }
    printf("Quantità di %s disponibile dopo il mese %d: %d\n", nomeF, mese, quantita_tot);
    ```

# Esercizio su Linguaggio Matlab (10 Punti)

Data la seguente funzione ricorsiva Matlab:

```octave
function [c, d] = unzunz(x, y)
  if (x < y)
      d = 0;
      c = x;
  else
      [a, b] = unzunz(x - y, y);
      d = b + 1;
      c = a;
  end
end
```

## Domanda 1

Calcolare i seguenti valori:

-   `unzunz(3,6) = [3, 0]`
-   `unzunz(6,6) = [0, 1]`
-   `unzunz(4,2) = [0, 2]`
-   `unzunz(5,2) = [1, 2]`

## Domanda 2

Spiegare con **massimo 10 parole** cosa fa la funzione `unzunz`.

<p class="verse">
La funzione calcola il resto `c` e il quoziente `d` dei parametri in entrata.<br  />
</p>

## Domanda 3

Come potreste scrivere la stessa funzione in maniera non ricorsiva e non utilizzando nessun ciclo?

```octave
function [c, d] = unzunz2(x, y)
  c = mod(x,y);
  d = floor(x/y);
end
```

# Esercizio su virgola mobile (6 punti)

## Domanda 1

Si determini la codifica in virgola mobile del valore decimale 23.3 secondo lo
Standard IEEE 754-1985 a precisione singola, riportando i calcoli effettuati.

    Parte intera: 23 (decimale)        → 10111 (binario)
    Parte frazionaria: 0.3 (decimale)  → 0.0(1001) (binario)

    La parte frazionaria è calcolata col metodo della moltiplicazione per due:

    0.3 * 2 = 0.6
    0.6 * 2 = 1.2
    0.2 * 2 = 0.4
    0.4 * 2 = 0.8
    0.8 * 2 = 1.6
    0.6 * 2 = 1.2 … → 0.01001100110011001….. → 0.0(1001)

In virgola fissa abbiamo quindi che:

    23.3 → 1.01110(1001) x 2^4

In virgola mobile:

    Segno:                     0
    Esponente (4 + 127 = 131)  11000001
    Mantissa:                  01110100110011001100110

## Domanda 2

La codifica in virgola mobile del valore calcolato al punto precedente è esatta?
Giustificare la risposta.

> La mantissa è periodica, per cui la codifica non è esatta.
