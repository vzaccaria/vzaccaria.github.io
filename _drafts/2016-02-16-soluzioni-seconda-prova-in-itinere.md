---
title: soluzioni seconda prova in itinere
date: 2016-02-16

layout: post
category : infob
tags : ['']
---


# Esercizio 1

Un array di interi, con un numero pari di elementi, si dice a **somma costante** se sommando a coppie gli elementi in posizione simmetrica rispetto al centro dell’array (cioè il primo con l’ultimo, il secondo con il penultimo, e così via) si ottiene sempre lo stesso risultato.

## Domanda 1
Scrivere una porzione di codice che chieda all’utente di inserire da tastiera un intero `n`, pari, maggiore di zero e minore di 100 (si controlli che n rispetti queste condizioni e, in caso contrario, si re-iteri la richiesta di inserire `n`, fino all’inserimento di un valore ammissibile):

### Soluzione
```c
    int n;
    do {
        scanf("%d",&n);
    } while (n<=0 || n>100 || n%2 == 1);
```

## Domanda 2
Scrivere una porzione di codice che chieda all’utente di inserire da tastiera un array `a` di `n` interi, 
verifichi se l’array inserito è a somma costante e stampi a video un messaggio per informare l’utente sull’esito della verifica:

### Soluzione

```c
    int i,n,somma,cost=1,a[100];

    for (i=0; i<n; i++)
        scanf("%d",&a[i]);
    	somma = a[0]+a[n-1];
       for (i=1; i<n/2; i++) {
         if (a[i]+a[n-i-1] != somma) {
            cost = 0;
            break;
        }
    }
    if (cost==1)
        printf("Array a somma costante\n");
    else
       ß printf("Array non a somma costante\n");
    return 0;
```

# Esercizio 2

Un operatore telefonico è caratterizzato da un **nome**, il **paese in cui opera** e le informazioni riguardanti **i piani tariffari che offre** (un operatore offre al massimo 20 piani differenti). Ogni piano tariffario, a sua volta, è caratterizzato da un **nome**, il **costo mensile del piano**, il numero di **minuti mensili inclusi** nel piano e il numero di **GB di traffico dati mensili** inclusi nel piano.

Si ipotizzi quindi di avere i seguenti tipi di strutture dati:

```c
typedef struct {
    char nome[50];
    float canone;
    int minuti;
    int dati;
} piano;

typedef struct {
    char nome[50];
    char paese[50];
    int npiani;
    piano piani[20];
} operatore;

```

## Domanda 1

Si dichiarino due variabili, `db` e `sel`, in grado di contenere i dati di 100 operatori telefonici ciascuna[^1];

### Soluzione

```c
operatore db[100], sel[100];
```

## Domanda 2
Scrivere un frammento di codice in C che, ipotizzando che la variabile `db` sia stata precedentemente riempita con i dati di 100 operatori, copi nella variabile `sel` (senza lasciare spazi) i dati degli operatori che hanno almeno 3 piani tariffari con più di 2 GB di traffico dati inclusi;

### Soluzione

```c
int i,j,k,n;

k = 0;
for (i=0; i<100; i++)
{
    n=0;
    for (j=0; j<db[i].npiani; j++)
        if (db[i].piani[j].dati > 2)
            n++;
    if (n>=3) {
        sel[k] = db[i];
        k++;
    }
}
```

## Domanda 3
Scrivere un frammento di codice C che stampi a video la percentuale degli operatori contenuti in `sel` che operano in Italia.

### Soluzione

```c
n=0;
for (i=0; i<k; i++)
    if (strcmp(sel[i].paese,"Italia")==0)
        n++;

printf("La percentuale degli operatori italiani è: %f\n",(n*100.0)/k);
```

[^1]: Non è necessario scrivere il frammento di codice necessario a caricare i dati nella variabile `db`. Non è necessario scrivere un programma completo ne includere le librerie utilizzate, ma è necessario includere nei frammenti di codice le dichiarazioni di tutte le variabili utilizzate.


# Esercizio 3

## Virgola fissa:
Si determini la codifica del valore 48.15 in virgola fissa:

### Soluzione

```
 0 1 1 0 0 0 0     0 0 1 0 0 1 1 0 0 1 1 0 0 1 1 0 0 1 1 0 0
┗━┻━┻━┻━┻━┻━┻━┛ , ┗━┻━┻━┻━┻━┻━┻━┻━┻━┻━┻━┻━┻━┻━┻━┻━┻━┻━┻━┻━┻━┛
     (7 bit)                       (20 bit)
  parte intera                parte frazionaria
```

## Virgola mobile:

Si determini la codifica in virgola mobile di 48.15:

### Soluzione

```
 0  1 0 0 0 0 1 0 0     1 0 0 0 0 0 0 1 0 0 1 1 0 0 1 1 0 0 1 1 0 0 1
┗━┛┗━┻━┻━┻━┻━┻━┻━┻━┛ , ┗━┻━┻━┻━┻━┻━┻━┻━┻━┻━┻━┻━┻━┻━┻━┻━┻━┻━┻━┻━┻━┻━┻━┛
 S        E                                     M
```



# Esercizio 4

Su BestMemory.com sono disponibili due sistemi in offerta allo stesso prezzo che differiscono solo per il loro sistema di memoria:

#### Sistema A:
dotato di memoria centrale e memoria cache con le seguenti caratteristiche[^2]:

```
Hit Rate = 75%
Hit Time = 20ns
Miss Penalty = 400ns
```

#### Sistema B
dotato di memoria centrale senza memoria cache con un tempo medio di accesso di 100ns

## Domanda 1

Calcolare il tempo di accesso medio in memoria per entrambe i sistemi:

### Soluzione

* $T_A$: `0.75 * 20ns + 0.25*400ns = 115ns (ns)`
* $T_B$: `100 (ns)`

## Domanda 3

Qual'e' il sistema migliore?

### Soluzione

```
☐ A
☑︎ B
```

## Domanda 3

Cambierebbe la vostra risposta se l’Hit Rate fosse pari all’80% ?

### Soluzione

```
☑︎ A
☐ B

Perche'? _____ Avrei 96ns per il sistema A che quindi diventa il migliore. ____
```


[^2]: Con il Miss Penalty si intende il tempo complessivo per accedere al dato in caso non si trovi nella cache (comprende perciò sia il tempo per accedere alla cache sia il tempo necessario per accedere al dato nella memoria centrale e per trasferirlo dalla memoria centrale alla cache)