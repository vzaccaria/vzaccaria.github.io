---
title: soluzioni appello del 27 giugno
date: 2016-07-01

layout: post
category : infob
tags : ['']
---


# Esercizio su Linguaggio C (10 punti)

Umber vi ha incaricato di sviluppare in C il loro sistema di gestione dei taxi
all’interno di un’area urbana. In particolare, vi ha chiesto di progettare le
strutture dati necessarie per immagazzinare le seguenti informazioni:

-   *Dati relativi a tutte le le città servite dal servizio taxi*. Ogni città è
    caratterizzata da un **nome** e **una lista zone** (massimo 10). Umber gestisce
    fino a un massimo di 100 città.

-   *Dati relativi alle zone all’interno di una città*. Ogni zona è identificata da
    un **numero univoco** e contiene la **lista dei taxi** che si trovano in quella zona,
    fino a un massimo di 50 taxi.

-   *Dati relativi ai taxi*. Ogni taxi è identificato da un **numero univoco** ed è
    caratterizzato dal **numero di passeggeri** che può portare.

## Domanda 1

Date le seguenti definizioni:

    #define MAX_CITTA 100
    #define MAX_ZONE 10
    #define MAX_TAXI 50
    
    typedef char Stringa[30];

Definite in C la struttura dati `Taxi`:

    typedef struct {
       int numeroTaxi;
       int nPosti;
    } Taxi;

Definite in C la struttura dati `Zona`:

    typedef struct {
      int numeroZona;
      Taxi listaTaxi[MAX_TAXI];
      int numeroTaxi;
    } Zona;

Definite in C la struttura dati `Citta`:

    typedef struct {
       Stringa nome;
       Zona listaZone[MAX_ZONE];
       int numeroZone;
    } Citta;

## Domanda 2

Assumendo che `listaCitta` sia una variabile già popolata contenente la lista
delle città servite da Umber

    Citta listaCitta[MAX_CITTA];

sviluppate un frammento di programma in C che chiede all&rsquo;utente di inserire il
nome di una città, il numero di una zona in quella città e il numero di
passeggeri da trasportare nelle seguenti variabili:

    Stringa citta;
    int nZona;
    int nPasseggeri;

    printf("Inserisci il nome della citta: ");
    scanf("%s", citta);
    printf("Inserisci il numero della zona: ");
    scanf("%d", &nZona);
    printf("Inserisci il numero di passeggeri: ");
    scanf("%d", &nPasseggeri);

Successivamente, sviluppate un frammento di programma che stampa a schermo il codice numerico di
un taxi che si trova nella zona indicata e che ha a disposizione un numero di
posti maggiore o uguale al numero di passeggeri da trasportare:

    int i, j, k;
    for(i = 0; i< nCitta; i++ ) {
      for(j = 0; j < listaCitta[i].numeroZone; j++) {
        for(k = 0; k < listaCitta[i].listaZone[j].numeroTaxi; k++) {
          if(strcmp(listaCitta[i].nome, citta) == 0 &&
             listaCitta[i].listaZone[j].numeroZona == 2 &&
             listaCitta[i].listaZone[j].listaTaxi[k].nPosti >= nPasseggeri)  {
            printf("Trovato taxi numero %d - Citta %s, Zona %d",
                   listaCitta[i].listaZone[j].listaTaxi[k].numeroTaxi, citta, nZona);
            return 0;
          }
        }
      }
    }
    printf("Mi dispiace, non ho trovato taxi");
    return 0;

# Esercizio su Linguaggio Matlab (10 Punti)

Si vogliono costruire in Matlab opportune funzioni per gestire un vettore come
se fosse una coda (si pensi alla coda di persone davanti allo sportello di un
ufficio pubblico). In particolare, assumendo che l’elemento 1 del vettore
corrisponda al primo della coda, rispondere alle seguenti domande:

## Domanda 1

Sviluppare la funzione:

    function [nuovaCoda] = accoda(coda, valore)

la quale restituisce una nuova coda (`nuovaCoda`) contenente tutti gli elementi di `coda` più il
nuovo elemento `valore`, che viene inserito alla fine della coda. 

    function [nuovaCoda] = accoda(coda, valore)
      nuovaCoda = coda;
      nuovaCoda(end+1) = valore
    end

## Domanda 2

Sviluppare la funzione:

    function [nuovaCoda, valore] = estraiPrimo(coda)

la quale estrae da `coda` il primo valore e restituisce `nuovaCoda` (che non contiene
più il primo valore) e il valore estratto in `valore`. Per esempio, se `coda = [10, 3, 4, 12,
17]`, dopo l’esecuzione della funzione si avrà `nuovaCoda = [3, 4, 12, 17]` e
`valore = 10`.

    function [nuovaCoda, valore] = estraiPrimo(coda)
      nuovaCoda = coda;
      valore = nuovaCoda(1);
      nuovaCoda(1) = [];
    end

## Domanda 3

Sviluppare la funzione:

    function [lunghezza] = calcolaLunghezza(coda)

che restituisce lunghezza di `coda`.

    function [lunghezza] = calcolaLunghezza(coda)
      lunghezza = length(coda)
    end

## Domanda 4

Si scriva una funzione `estrai`:

    function [v] = estrai(codaNormale, codaPrioritaria, ultimoEstratto)

ove i valori numerici contenuti nelle code `codaNormale` e `codaPrioritaria`
corrispondono univocamente ad una persona in coda agli sportelli di un ufficio
pubblico mentre `ultimoEstratto` varrà:

-   0 nel caso in cui l’ultimo numero sia stato estratto da `codaNormale`
-   1 nel caso in cui l&rsquo;ultimo numero sia stato estratto da `codaPrioritaria`

La funzione deve ritornare il numero `v` della prossima persona da servire,
secondo i seguenti criteri:

-   se l’ultimo valore è stato estratto da `codaNormale`, allora il nuovo valore
    sarà estratto da `codaPrioritaria`.
-   In caso contrario, se la lunghezza di `codaPrioritaria` è maggiore della
    lunghezza di `codaNormale` / 3, allora estrae il valore da `codaPrioritaria`;
    altrimenti, estrae il valore da `codaNormale`.

Ad esempio:

    codaNormale = [10, 3, 4, 12, 17, 13, 67, 45, 32, 22];
    codaPrioritaria = [11, 5, 6, 8, 9, 15];

il risultato di  `estrai(codaNormale, codaPrioritaria, 1)` sarà 11.

    function [v] = estrai(codaNormale, codaPrioritaria, ultimoEstratto)
      if ultimoEstratto == 0 || calcolaLunghezza(codaPrioritaria) > calcolaLunghezza(codaNormale)/3
          [codaPrioritaria, v] = estraiPrimo(codaPrioritaria);
          ultimoEstratto = 1;
      else
          [codaNormale, v] = estraiPrimo(codaNormale);
          ultimoEstratto = 0;
      end
    end
    
    codaNormale = [10, 3, 4, 12, 17, 13, 67, 45, 32, 22];
    codaPrioritaria = [11, 5, 6, 8, 9, 15];
    
    estrai(codaNormale, codaPrioritaria, 1)

# Esercizio su memoria virtuale (6 Punti)

Un sistema dispone di 256 Kbyte di memoria fisica e una memoria virtuale
indirizzabile con paginazione, caratterizzata dai seguenti parametri: indirizzo
virtuale di 20 bit e 256 pagine di memoria.

Rispondere alle seguenti domande giustificando le risposte:

## Domanda 1

Quale è la dimensione della memoria virtuale indirizzabile?

    20 bit -> 2^20 byte di memoria virtuale -> 1 Mbyte

## Domanda 2

Quale è la struttura dell’indirizzo virtuale e di quello fisico, e la lunghezza
dei campi che li costituiscono?

    256 (2^8) pagine virtuali -> 8 bit per NPV
    256 kByte memoria fisica -> 18 bit indirizzo fisico
    
    NPV: 8 bit, offset: 12 bit 
    NPF: 6 bit, offset: 12 bit

## Domanda 3

Un consulente afferma che aumentando la dimensione delle pagine di memoria e
quindi riducendo il numero di pagine di memoria, aumentano i possibili sprechi
di memoria. Siete d&rsquo;accordo con questa affermazione? Argomentare in maniera
adeguata la propria risposta.

> L&rsquo;affermazione è corretta: aumentando la dimensione delle pagine di memoria, e
quindi riducendo il numero di pagine di memoria, si ha meno controllo
sull&rsquo;utilizzo della memoria, dovendo assegnare blocchi contigui (una pagina) più
grandi a un unico processo, aumenta la probabilità di sprecare spazi durante il
funzionamento del sistema.

