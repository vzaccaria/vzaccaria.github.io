---
title: esercizi di ricapitolazione
date: 2016-01-26

layout: post
category : infob
tags : ['']
---

Ecco gli esercizi fatti oggi, piu' altri per casa. Buon lavoro!

# Memoria virtuale - Semplice


Un sistema dispone di 256 Kbyte di memoria virtuale indirizzabile, con paginazione caratterizzata dai seguenti parametri:

* indirizzo fisico di 16 bit e
* pagine di dimensione di 2 Kbyte.

Rispondere alle seguenti domande giustificando le risposte:

a. Quale è la dimensione della memoria fisica indirizzabile?

> La memoria fisica indirizzabile è pari a 64 Kbyte (2^16 byte)

b. Quale è la struttura dell’indirizzo virtuale e di quello fisico, e la lunghezza dei campi che li costituiscono?

> ```
> Indirizzo Virtuale:  18 bit     NPV: 7  bit offset: 11  bit
> Indirizzo Fisico:    16 bit     NPF: 5  bit offset: 11  bit
> ```

# Memoria virtuale 2 - Semplice

Un sistema dispone di 64 Kbyte di memoria fisica indirizzabile e di 128 Kbyte di memoria virtuale indirizzabile; inoltre la memoria virtuale è organizzata in pagine di 512 byte.

Rispondere alle seguenti domande (giustificando i risultati ottenuti con gli opportuni calcoli):

1.  Definire la struttura dell’indirizzo virtuale e di quello fisico indicando la lunghezza dei campi che li costituiscono.

> ```
> 512 byte  = 2^9 byte => offset di 9 bit
> 64 Kbyte  = 2^16 byte => indirizzo fisico di 16 bit
> 128 Kbyte = 2^17 byte => indirizzo virtuale di 17 bit
>
> Indirizzo virtuale di 17 bit, NPV 8 bit, offset 9 bit
> Indirizzo fisico di 16 bit, NPF 7 bit, offset 9 bit
> ```

2.  Quante sono le pagine di memoria virtuale?

> Il sistema ha a disposizione 2^8  = 256 pagine di memoria virtuale.


## Parte B

Si consideri un sistema con le seguenti caratteristiche:

* Indirizzo virtuale di 8 bit
* Indirizzo fisico di 7 bit
* Dimensione pagine 16 byte

L’indirizzo virtuale 00101000 può corrispondere all’indirizzo fisico 0010100? Giustificare la risposta.

> L’offset è di 4 bit (16 byte = 2^4), perciò la traduzione non è possibile dal momento che i 4 bit meno significativi non corrispondono.

\newpage

# Memoria virtuale - Complesso

Si assuma di voler convertire in maniera automatica degli indirizzi fisici in indirizzi virtuali. Assumiamo di avere la tabella di conversione memorizzata in un'array bi-dimensionale C:

    int tabella[4][2] = {
        { 0, 4 },
        { 1, 2 },
        { 2, 1 },
        { 3, 0 }
    };

dove, per ciascuna riga della tabella, viene specificato l'`npf` e l'`npv` corrispondente. Ad esempio, la prima riga dice che il numero di pagina fisica (npf) 0 deve essere tradotto in un numero di pagina virtuale (npv) pari a 4.

## Domanda 1
Sapendo che l'offset ha dimensione 8 bit, si completi il seguente programma in modo che calcoli e stampi l'offset ed il numero di pagina fisica `npf`
di un indirizzo fisico già inserito dall'utente:

```c
    ...
    int npf;
    int npv;
    int offset;

    offset = indirizzo_fisico % 256;
    npf    = (indirizzo_fisico - offset)/256;

    printf("Offset:      %x\n", offset);
    printf("npf:         %x\n", npf);
```

## Domanda 2
Sapendo che `tabella` contiene la conversione di numero di pagina fisica in numero di pagina virtuale, calcolare e stampare a video il numero di pagina virtuale `npv` e l'indirizzo virtuale corrispondente a `indirizzo_fisico`:

```c
    for (int i = 0; i < 4; ++i) {
        if(tabella[i][0] == npf) {

            int npv;
            int indirizzo_virtuale;

            npv = tabella[i][1];
            indirizzo_virtuale = (tabella[i][1] * 256) + offset;

            printf("npv: %d\n", npv);
            printf("indirizzo_virtuale: %d\n", indirizzo_virtuale);
            break;
        }
    }
    return 0;
}
```

# Kernel di un sistema operativo
Il kernel di un sistema operativo multiprogrammato deve gestire le code di processi pronti, in attesa e in esecuzione. Ogni processo è definito da un descrittore che contiene le seguenti informazioni:

* `PID`: Identificativo di processo  un valore numerico che identifica il processo in modo univoco.
* `vettore_npf`:  un vettore che per ogni pagina virtuale mantiene il numero della corrispondente pagina fisica; si assuma che ogni processo abbia una dimensione massima di 16 pagine virtuali.
* `dim_npf`: effettiva occupazione fisica del processo in termini di pagine fisiche.
* `program_counter`: valore del Program Counter.


## Domanda 1
Si definisca in linguaggio C il tipo `DescrittoreProcesso` che includa le informazioni elencate sopra:

```c
typedef struct {
        int PID;
        int vettore_npf[16];
        int dim_npf;
        int program_counter;
} DescrittoreProcesso;

```

## Domanda 2

Si definisca inoltre il tipo `codaProcessi` in modo che contenga:

* Una lista di processi `listaP`;
* il numero di elementi nella lista `n`.

Il massimo numero dei processi presenti nel sistema è 16:

```c
typedef struct  {
    DescrittoreProcesso listaP[16];
    int n;
    } codaProcessi;

```


## Domanda 3
Si supponga di avere a disposizione la coda dei processi pronti in questa variabile:

```c
codaProcessi codaPronti;
```

Si scriva un frammento di programma in linguaggio C che stampi il `PID` di tutti i processi in `codaPronti` che occupano più di 4 pagine fisiche.

```c
int i;
for(i=0; i<codaPronti.n; i++) {
    if(codaPronti.listaP[i].dim_npf > 4) {
        printf("PID: %d \n", codaPronti.listaP[i].PID);
    }
}
```

# Configurazione calcolatore

Si considerino le seguenti dichiarazioni di tipi e variabili che definiscono le informazioni relative ai laptop presenti nel catalogo di un distributore di materiale informatico:

```c
#define N 30

typedef char stringa[100];

typedef struct{
    int gb;
    int rpm; // round per minutes del disco fisso
} Hdd;

typedef struct{
    int mHz;
    int gb;
    stringa tipologia;
} Ram;

typedef struct{
    int ghz;
    Ram ram[4];
    int nBanchiRam; // numero effettivo di elementi dell'array `ram`
    Hdd hardDisk;
    stringa produttore;
} Laptop;

Laptop listino[N];
int numeroLaptop;
```

ove `listino` e' un array di (massimo) N Laptops e `numeroLaptop` è il numero di laptop effettivi presenti in `listino`.

## Domanda 1

Si completi il codice sottostante per stampare a video la posizione del miglior laptop in listino, ovvero:

* quello dotato di maggiore ram totale
* a parità di ram, quello con `rpm` del disco fisso più alto

```c
int main(int argc, char const *argv[])
{
    int posizione = -1;
    int i = 0;
    int maxRamTrovata = 0;
    int maxRPMTrovato = 0;

    for(i=0; i<numeroLaptop; i++)
    {
        int dimRamTot = 0;
        int j;
        for(j=0; j<listino[i].nBanchiRam; j++)
        {
            dimRamTot = dimRamTot + listino[i].ram[j].gb;
        }
        if( (dimRamTot > maxRamTrovata)  ||
            (dimRamTot == maxRamTrovata && listino[i].hardDisk.rpm > maxRPMTrovato))
        {
            maxRamTrovata = dimRamTot;
            maxRPMTrovato = listino[i].hardDisk.rpm;
            posizione = i;
        }

    }
    ...
```

## Domanda 2

Si copi all'interno della variabile `selezione`:

    Laptop selezione[N]

tutti i laptop di marca uguale al migliore (trovato al punto precedente), senza lasciare buchi.

```c
    int j = 0;
    for(i=0; i \< numeroLaptop; i++)
    {
        if(strcmp(listino[i].produttore, listino[n].produttore) == 0)
        {
            selezione[j] = listino[i];
            j++;
        }
    }
```

## Domanda 3

Si definisca un tipo `cache` con le seguenti caratteristiche:

* può essere di due tipologie differenti: `L1` oppure `L2`
* e' caratterizzata dai parametri visti a lezione per quanto riguarda il tempo di accesso

```c
typedef enum { L1, L2 } cache_type;

typedef struct {
    cache_type tipo;
    float hit_time;
    float miss_penalty;
    float miss_rate;
} cache;
```

## Domanda 4

Si estenda il tipo `Laptop` in modo tale che possa contenere anche le informazioni sulle cache in esso contenuta. Si tenga presente che le cache possono essere più di una.

**Spazio soluzione:**

```c
typedef struct{
    int ghz;
    Ram ram[4];
    int nBanchiRam; // numero effettivo di elementi dell'array `ram`
    Hdd hardDisk;
    stringa produttore;

    cache memorieCaches[4];
    int nMemorieCaches;

} Laptop;
```

# Divisione virgola mobile

Dati i seguenti due numeri in codifica IEEE 754 (virgola mobile, il bit piu' a sinistra e' di segno)

    A = 10111111100100000000000000000000

    B = 10111110100100000000000000000000

Calcolare a quanto equivale la divisione A/B (in decimale)

#### Soluzione

I numeri si differenziano solo per esponente e segno. Si puo' calcolare la divisione prendendo in considerazione solo gli esponenti:

    A = B*2^2

Quindi:

    A/B = 4

Si puo' anche notare che:

    A = -1 * (1+2^(-3))
    B = -1 * (1+2^(-3))*2^(-2)
