---
title: esercizi su algebra booleana
date: 2016-01-15

layout: post
category : infob
tags : ['algebra booleana']
---

# Tabella verita'

Si consideri la seguente espressione booleana:

$$\textrm{not}~(A ~\textrm{or}~ \textrm{not}~C) ~\textrm{and}~ ((\textrm{not}~B ~\textrm{or}~ C) ~\textrm{or}~ B)$$

## Domanda 1

Si compili la seguente tabella della verità (in cui 0 rappresenta il valore logico FALSO, 1 il valore VERO):

| A | B | C | $\textrm{not}~(A ~\textrm{or}~ \textrm{not}~C)$ | $((\textrm{not}~B ~\textrm{or}~ C) ~\textrm{or}~ B)$ | Espressione completa |
|---|---|---|:-------------------------------------------------:|:-----------------------------------------------------:|:----------------------:|
| 0 | 0 | 0 |                                               0 |                                                    1 |                    0 |
| 0 | 0 | 1 |                                               1 |                                                    1 |                    1 |
| 0 | 1 | 0 |                                               0 |                                                    1 |                    0 |
| 0 | 1 | 1 |                                               1 |                                                    1 |                    1 |
| 1 | 0 | 0 |                                               0 |                                                    1 |                    0 |
| 1 | 0 | 1 |                                               0 |                                                    1 |                    0 |
| 1 | 1 | 0 |                                               0 |                                                    1 |                    0 |
| 1 | 1 | 1 |                                               0 |                                                    1 |                    0 |

## Domanda 2

Si consideri ora la condizione, scritta in linguaggio C, in cui `h` e `k` siano due variabili `int`:

```c
! ((h > 0) || ! (h < 2)) && (( ! (k < -3) || (h < 2)) || (k < -3))
```

ottenuta dalla prima formula sostituendo la variabile A con (`h > 0`), la variabile B con (`k < -3`), la variabile C con (`h < 2`)

Si risponda, giustificando le risposte, alle seguenti domande:

1. L'espressione è  vera o falsa quando (`k = 1`) e (`h = 11`)?
   
   Dalle ipotesi abbiamo che:

           ! ( (h > 0) || ! (h < 2) ) && ( ( ! (k < -3) || (h < 2) ) || (k < -3) )
        =  ! ( (11 > 0) || ! (11 < 2) ) && ( ( ! (1 < -3) || (11 < 2) ) || (1 < -3) )
        =  ! ( Vero || Vero) && ( ( Vero || Falso ) || Falso )
        =  ! Vero && ( Vero || Falso )
        =  Falso
    
   L'espressione e' falsa 


2. Se (`k < -4`), per quali valori di `h` l'espressione è falsa?
   
   Dalle ipotesi abbiamo che:

          ! ( (h > 0) || ! (h < 2) ) && ( ( ! Vero || (h < 2) ) || Vero )
        = ! ( (h > 0) || ! (h < 2) ) && ( ( Falso || (h < 2) ) || Vero )
        = ! ( (h > 0) || ! (h < 2) ) && Vero
   
   quindi `! ( (h > 0) || ! (h < 2) )` deve essere Falso
   
   quindi `(h > 0) || ! (h < 2)` deve essere Vero, 
   
   quindi `h>0` deve essere Vero

# Tabelle della verita'

Sia dato il seguente programma:

``` c
if(!a) {
    if (b) {
        if((a && c) || (!b && !c)) {
            printf("Nooo!");
        } else {
            printf("Yes!");
        }
    }
}
```

dove `a`, `b` e `c` sono variabili inizializzate in precedenza ad un
valore che può essere 0 oppure 1.

Domanda 1
---------

Si compili la seguente tabella per ogni combinazione dei valori delle
tre variabili:

| **a** | **b** | **c** | **Messaggio stampato** |
|:-----:|:-----:|:-----:|:----------------------:|
|   0   |   0   |   0   |                        |
|   0   |   0   |   1   |                        |
|   0   |   1   |   0   |          Yes!          |
|   0   |   1   |   1   |          Yes!          |
|   1   |   0   |   0   |                        |
|   1   |   0   |   1   |                        |
|   1   |   1   |   0   |                        |
|   1   |   1   |   1   |                        |

Domanda 2
---------

Si riscriva il frammento di codice utilizzando un solo `if`, ove la
condizione deve essere la più ridotta possibile in termini di operatori
e variabili utilizzate.

``` c
if(!a && b) {
    printf("Yes!");
}
```


Azienda trasporti
=================

Il programma gestionale di un’azienda di trasporti è scritto in C ed
utilizza le seguenti strutture dati:

``` c
#define MAX_TRASPORTI 100
#define MAX_DIPENDENTI 10
typedef char stringa[100];
typedef enum{falso, vero} boolean;

typedef struct {
    stringa destinazione;
    boolean trasportoSpeciale;
    float numeroKm;
} Trasporto;

typedef struct{
    stringa nome;
    stringa cognome;
    int kmPerLitro;
    int numTrasportiEffettuati;
    Trasporto listaTrasporti[MAX_TRASPORTI];
} Camionista;
```

ove

-   `trasportoSpeciale` e' vero se si movimentano prodotti velenosi, o
    molto pesanti o se le dimensioni del camion sono superiori a quelle
    di un articolato standard.
-   `numeroKm` indica il numero di kilometri che e' necessario
    percorrere per portare il carico a destinazione e tornare indietro.
-   `kmPerLitro` indica quanti km in media percorre un camionista con un
    litro di carburante.

Si assuma inoltre che nel main.c del programma siano state dichiarate le
seguenti variabili:

``` c
Camionista dipendenti[MAX_DIPENDENTI];
float litriConsumati[MAX_DIPENDENTI];
```

ove:

-   La variabile `dipendenti` registra i dati di 10
    camionisti dell’azienda.

-   La variabile `litriConsumati` serve per tenere traccia del numero di
    litri di carburante consumati da ciascun camionista (il camionista
    nella posizione i-esima in `dipendenti` corrisponde al consumo di
    carburante indicato nella stessa posizione i-esima in
    `litriConsumati`).

Si risponda alle seguenti tre domande:

1.  si scriva un frammento di codice per scorrere la variabile
    `dipendenti` e per stimare il numero di litri di carburante
    consumati da ogni camionista. Tale valore deve quindi essere salvato
    nella posizione corrispondente del vettore `litriConsumati`.

    **Soluzione:**

    ``` c
    float totKm;

    for(i = 0; i < MAX_DIPENDENTI; i++)
    {
      totKm = 0;
      for(l = 0; l< dipendenti[i].numTrasportiEffettuati; l++)
      {
         totKm = dipendenti[i].listaTrasporti[l].numeroKm + totKm;
      }
      litriConsumati[i] = totKm/dipendenti[i].kmPerLitro;
    }
    ```

2.  Si dichiari una seconda variabile `dipendentiNormali` e vi si copi,
    senza lasciare buchi, tutti i dipendenti che non hanno mai fatto un
    trasporto speciale (identificato dal valore dell’apposito campo
    della struttura).

    **Soluzione:**

    ``` c
    int j=0;
    boolean normale;
    for(i = 0; i < NUM_DIPENDENTI; i++)
    {
        normale = vero;
        for(l = 0; l < dipendenti[i].numTrasportiEffettuati && normale == vero; l++)
        {
            if(dipendenti[i].listaTrasporti[l].trasportoSpeciale == vero)
               normale = falso;
        }
        if(normale)
        {
            dipendentiNormali[j] = dipendenti[i];
            j++;
        }
    }
    ```

3.  Si stampi a schermo il numero dei dipendenti che non hanno mai fatto
    un trasporto speciale, seguito dal nome e cognome di ciascuno
    di questi.

    Esempio di stampa:

        2 Dipendenti non hanno mai fatto trasporti speciali:
        Mario Rossi
        Paolo Bianchi

    **Soluzione:**

    ``` c
    numeroDipNormali = j;
    printf("%d Dipendenti che non hanno mai fatto un trasporto speciale: \n", numeroDipNormali);
    for(i = 0; i < numeroDipNormali; i++)
        printf("\n%s %s", dipendentiNormali[i].nome, dipendentiNormali[i].cognome);
    ```
