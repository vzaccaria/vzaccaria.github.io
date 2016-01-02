---
title: altri esercizi c
date: 2015-12-22 16:01:49

layout: post
category : infob
tags : ['']
---


Fattoriale (iterativo)
======================

    #include <stdio.h>

    int fatt (int);   /* Prototipo della funzione */

    main ()
    {
        int a;
        printf ("Inserisci un numero intero positivo: ");
        scanf ("%i",&a);
        printf ("Il fattoriale di %i e': %i\n",a,fatt(a));
    }

    int fatt(int n)
    {
        int i,fatt=1;
        if (n==1 || n==0)
            return (1);
        else
        {
            for(i=1;i<=n;i++)
                fatt=fatt*i;
            return (fatt);
        }
    }

Fattoriale (ricorsivo)
======================

    #include <stdio.h>

    int fatt (int);   /* Prototipo della funzione */

    main ()
    {
        int a;
        printf ("Inserisci un numero intero positivo: ");
        scanf ("%i",&a);
        printf ("Il fattoriale di %i e': %i\n",a,fatt(a));
    }

    int fatt(int n)
    {
        if (n==1 || n==0)
            return (1);
        else
            return (n*fatt(n-1));
    }


Crittoanalisi
=============

Un modo semplice di cifrare un messaggio di testo consiste nel
sostituire ciascuna lettera nel messaggio con la lettera dell'alfabeto
che si trova `k` posizioni dopo (considerando l'alfabeto circolare
quando viene oltrepassata l'ultima lettera). Il valore `k` viene anche
detto **chiave**, dal momento che consente di cifrare/decifrare il
messaggio di testo.

*Domanda 1* Scrivete la condizione C che usereste in un `if` per
determinare se il carattere `i`-esimo della stringa `testo` è
effettivamente una lettera dell'alfabeto (maiuscola o minuscola):

``` c
testo[i] >= 'a' && testo[i] <= 'z' || testo[i] >= 'A' && testo[i] <= 'Z'
```

*Domanda 2*

Si supponga di avere la variabile stringa `testo` contenente il testo da
codificare, e la variabile `k` contenente la chiave entrambe
inizializzate:

``` c
char testo[1000] = ...;
int k = ...;
```

Scrivere un frammento di programma C che stampi a video la codifica
della stringa `testo` utilizzando `k`. Nella versione cifrata, le
lettere minuscole dovranno rimanere minuscole, le lettere maiuscole
dovranno rimanere maiuscole e qualsiasi carattere che non sia una
lettera dovrà rimanere invariato rispetto al testo originale. Infine, si
consiglia l'uso dell'operatore di modulo `%` del C.

``` c
for (i = 0; i < strlen(testo); i++) {
    if(testo[i] >= 'a' && testo[i] <= 'z') {
        printf("%c", 'a' + (('a' - testo[i] + k) % 26));
    }
    if(testo[i] >= 'A' && testo[i] <= 'Z') {
        printf("%c", 'A' + (('A' - testo[i] + k) % 26));
    }
}
```

Interpretazione algoritmo su matrice
====================================

Si consideri il seguente programma, che richiede in ingresso
l’inserimento di **una matrice 3x3**:

``` c

#include <stdio.h>
#define DIM 3
int main()
{
    int i,j, M[DIM][DIM];

    int s[3]={0,0,0};

    for (i=0; i<DIM; i++)
        for (j=0; j<DIM; j++)
            scanf("%d",&M[i][j]);

    for (i=0;i<DIM;i++)
    {
        s[0] += M[0][i];
        s[1] += M[1][i];
        s[2] += M[2][i];
    }
    printf("%d %d %d\n", s[0],s[1],s[2]);
    return 0;
}
```

Descrivere in maniera sintetica cosa fa il programma data una generica
matrice in ingresso:

**Stampa la somma degli elementi su ciascuna delle tre righe della
matrice M**

Descrivere cosa stampa a video il programma nel caso l’utente inserisca
da tastiera il seguente input: `1 1 1 2 2 2 3 3 3`

**Stampa a video “3 6 9”**



Database crimini
================

Siano date le seguenti definizioni di strutture dati:

    #define MAXDB 80

    typedef struct
    {
      int giorno;
      int mese;
      int anno;
    } data;

    typedef char stringa[20];

    typedef struct
    {
      data      data_di_nascita;
      int       giorno_dell_anno;
      int       codice_crimine;
      stringa   stringa_crimine;
    } arresto;

    arresto database[MAXDB];
    int arresti_per_giorno[365];

ove `database` contiene gli arresti effettuati in un determinato anno
mentre `arresti_per_giorno` è una variabile array ausiliaria (i cui
elementi sono inizializzati tutti a `0`) utilizzabile per i calcoli
intermedi.

Scrivere una porzione di codice C che ricavi il massimo numero di
arresti giornalieri dei nati nel 1979 con `codice_crimine` pari a `555`
utilizzando i dati contenuti in `database`. Si definiscano e
inizializzino le eventuali altre variabili temporanee necessarie per
tale calcolo. Si assuma che il database **non sia ordinato**.

*Soluzione*

    int i;
    int max;

    for(i=0; i<MAXDB; i++)
      if(database[i].data_di_nascita.anno == 1979 &&
        database[i].codice_crimine == 555)
        arresti_per_giorno[database[i].giorno_dell_anno] += 1;

    max = 0;
    for(i=0; i<365; i++)
      if(arresti_per_giorno[i] > max)
        max = arresti_per_giorno[i]

    printf("Massimo numero di arresti giornalieri: %d", max);

Twitter
=======

Sia data la definizione di stringa:

    typedef char stringa[30];

e la definizione di un messaggio tweet di 140 caratteri, contenente al
massimo 4 hashtags (quelle stringhe nei tweet che cominciano con `'#'`,
ad esempio, `"#poli"`):

    typedef struct {
        char contenuto[140];
        int  numero_hashtags;
        stringa hashtags[4];
    } tweet;

Sia data la seguente struttura di utente twitter:

    typedef struct {
        stringa nome;
        int     data_iscrizione; /* anno di iscrizione a twitter */
        int     numero_messaggi; /* numero effettivo messaggi */
        tweet   messaggi[100];
    } utente;

e di database di utenti:

    typedef struct {
        int numero_utenti;
        utente dati_utente[100];
    } database;

    database twitterdb;

Si chiede di scrivere un programma che stampi a video tutti gli utenti
iscritti dal 2012 che hanno usato l'hashtag "\#poli" in almeno uno dei
propri messaggi. Se, ad esempio, vi sono solo tre utenti nel database:

-   @vzaccaria, iscritto dal 2012, messaggi:

    -   "E' finito il primo emisemestre! \#poli"
    -   "E' ora del primo compitino! \#poli"
-   @obama, iscritto dal 2009, messaggi:

    -   "Politecnico is cool! \#poli"
-   @merkel, iscritta dal 2012, messaggi:

    -   "Come to germany!"

Il programma deve stampare:

    Utente @vzaccaria ha usato #poli !!


    int main()
    {
        int u;
        int t;
        int h;
        for(u=0; u<twitterdb.numero_utenti; u++)
        {
            int trovato = 0;
            if(twitterdb.dati_utente[u].data_iscrizione > 2010)
            {
                for( t=0; t< twitterdb.dati_utente[u].numero_messaggi; t++ )
                {
                    for( h=0; h< twitterdb.dati_utente[u].messaggi[t].numero_hashtags; h++)
                    {
                        if(strcmp(twitterdb.dati_utente[u].messaggi[t].hashtags[h], "#poli") == 0)
                            trovato = 1;
                    }
                }
            }
            if(trovato)
            {
                printf("Utente %s ha usato #poli !!\n", twitterdb.dati_utente[u].nome);
            }
        }
    }
