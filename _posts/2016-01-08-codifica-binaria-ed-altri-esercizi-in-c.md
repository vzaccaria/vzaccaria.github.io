---
title: codifica binaria ed altri esercizi in C
date: 2016-01-08

layout: post
category : infob
tags : ['codifica', 'virgola fissa']
---

Ecco di seguito le slides presentate oggi oggi; vi ricordo pero' che il
materiale che sarà oggetto delle prove scritte e orali di questo corso è
indicato nel [programma
dettagliato](http://www.vittoriozaccaria.net/deposit/programmaInfoB.pdf);
**quindi non è sufficiente studiare solo le slides o gli appunti della
lezione**.

* [Codifica binaria dei numeri in virgola fissa](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/le_codifica_1.pdf)

Ecco gli altri esercizi di oggi:

Carte di credito
================

Si considerino i seguenti tipi di dato in C. Essi servono a contenere le
informazioni relative ad una carta di credito, incluse le transazioni
eseguite.

``` c
#define N 100
typedef char Stringa[N];
typedef enum {falso, vero} bool;

typedef struct // descrizione della transazione {
    float importo;
    Stringa nazione;
    int timestamp; // tempo dell'acquisto espresso in secondi dal 1/1/1970.
    // Ad es. le ore 9:00:00 del il 2015.06.29 corrispondono al 1435561200 secondo
    //        le ore 9:01:00 del il 2015.06.29 corrispondono al 1435561260 secondo
    bool usato_pin; // determina se la transazione è avvenuta richiedendo il pin all'utente
} Acquisto;

typedef struct {
    int card_number; // numero della carta
    Acquisto trans[N];
    int n_trans; // numero delle transazioni eseguite
} Carta;
```

## Domanda 1
Si definisca un nuovo tipo di struttura `Persona` atta a contenere le
informazioni relative al proprietario della carta e si modifichi la
definizione del tipo `Carta` in modo che contenga un campo
`proprietario` di tipo `Persona`.

``` c
typedef struct
{
    Stringa nome;
    Stringa cognome;
} Persona;

typedef struct
{
    int card_number;      // numero della carta
    Acquisto trans[N];    // acquisti effettuati con la carta
    Persona proprietario; //
    int n_trans;          // numero delle transazioni eseguite
} Carta;
```

## Domanda 2
Si scriva un frammento di codice in linguaggio C per rilevare le carte
che possono aver subito una frode. Una carta può aver subito una frode
se:

a.  riporta due transazioni consecutive in meno di 1 minuto, oppure

b.  riporta due transazioni consecutive con PIN in nazioni diverse in
    meno di un'ora.

In particolare:

1.  Il codice deve contenere una variabile `cards` che memorizzi 1
    milione di carte di credito

2.  Assumendo che la variabile `cards` sia stata riempita
    precedentemente:

    -   si stampino i numeri delle carte che possono aver subito
        una frode. Si tenga presente che le transazioni registrate in
        `Acquisto trans[N]` sono ordinate cronologicamente.

    -   si copino le informazioni di tutte le persone frodate nell'array
        `persone_frodate` (senza lasciare buchi)

<!-- -->

``` c
#define M 1000000
int main()
{
    Carta cards[M];
    int i, j, k, frodata;
    Persona persone_frodate[M];
    for(i = 0; i < M; i++) {
        frodata = 0;
        k = 0;
        for(j = 0; (j < cards[i].n_trans - 1) && frodata == 0; j++) {
            if(cards[i].trans[j+1].timestamp - cards[i].trans[j].timestamp < 60) {
                frodata = 1;
            }
            else {
                if(cards[i].trans[j+1].usato_pin == vero &&
                   cards[i].trans[j].usato_pin == vero &&
                   cards[i].trans[j+1].timestamp - cards[i].trans[j].timestamp < 60 * 60 &&
                   strcmp(cards[i].trans[j+1].nazione, cards[i].trans[j].nazione) != 0) {
                    frodata = 1;
                }
            }
        }
        if (frodata) {
            printf("\nla carta %d è stata frodata ", cards[i].card_number);
            persone_frodate[k] = cards[i].proprietario;
            k++;
        }
    }
}
```

Facebook
========

Siano date in linguaggio C le seguenti strutture dati, che rappresentano
un database di utenti e relative foto, simile a quello di Facebook:

``` c
#define MAX_PHOTOS 10

typedef struct {
   char link[40];
} photo_t;

typedef struct {
   char user_name[10];
   int num_photos;             /* numero di foto dell'utente */
   photo_t photos[MAX_PHOTOS]; /* foto fatte dall'utente */
} user_t;

user_t database[MAX_USERS];     /* database generale degli utenti */
int num_users;                  /* Numero di utenti in `database`*/
```

## Domanda 1
Si riscriva la definizione del tipo `photo_t` estendendola in modo
tale che includa anche le informazioni relative al numero di gradimenti (anche detti *like*) che ciascuna foto ha ricevuto, insieme al titolo e la data (giorno, mese, anno) di pubblicazione della foto.

``` c
    typedef struct {
        char link[40];
        int num_likes;
        char titolo[100];
        data pubblicazione;
    } photo_t;

    typedef struct {
        int giorno;
        int mese;
        int anno;
    } data;
```

## Domanda 2
Si supponga che `database` e `num_users` siano stati gia' popolati. Definendo le aggiuntive variabili necessarie, scrivere una di codice in linguaggio C che per ciascun utente stampi a video il titolo della sua foto che ha ricevuto il massimo numero di like riportando il nome dell'utente, il titolo della foto e il numero di like che questa ha ricevuto.

``` c
int i, j, max, posizione;

for (i = 0; i < num_users; i++) {
    max = 0;
    for (j = 0; j < database[i].num_photos; j++) {
    if (database[i].photos[j].num_likes > max) {
        max = database[i].photos[j].num_likes;
        posizione = j; } }
    printf("Utente %s: \n Foto: %s\n Numero di likes ricevuti %d \n\n",
        database[i].user_name, database[i].photos[posizione].titolo, max);
}
```


