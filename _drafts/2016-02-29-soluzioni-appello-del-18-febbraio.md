---
title: soluzioni appello del 18 febbraio
date: 2016-02-29

layout: post
category : infob
tags : ['soluzioni esame']
---

# Esercizio 1 - Matlab - (4 punti)

Si consideri la seguente richiesta: 

> Un programma deve controllare che un numero N inserito dall’utente sia:
primo,  dispari, compreso tra 3 e 100, estremi inclusi. Quando il numero N inserito non soddisfa tutte le condizioni sopra, l’inserimento viene ripetuto.

Vittorio, un programmatore alle prime armi, ha scritto il seguente frammento di codice Matlab, sfruttando la funzione `primo` che restituisce 1 se il suo argomento è un numero primo, 0 altrimenti: 

```matlab
N = 0
while(primo(N) && (3<=N) && (N<=100) && mod(N,2))
 N = input('Inserire un numero: ');
end
```


## Domanda 1
La condizione del ciclo `while` è chiaramente sbagliata rispetto alla richiesta iniziale; tuttavia e' possibile modificarla leggermente in modo tale da renderla coerente con la richiesta iniziale. Si riscriva la condizione di cui sopra **aggiungendo solo quello che manca e senza cancellare nulla di esistente**:

```Matlab
(primo(N) && (3<=N) && (N<=100) && mod(N,2)) == 0
```

## Domanda 2
L'espressione risultante al passo precedente potrebbe essere *ridondante* ovvero vi potrebbero essere alcune operazioni che, anche se eliminate, non cambierebbero la funzionalità del ciclo `while` corrispondente. Quale eliminereste?

```
☐ Eliminerei 3<=N
☐ Eliminerei N<=100
☐ Eliminerei primo(N)
☑︎ Eliminerei mod(N,2)
☐ Non eliminerei nulla, non c'è nulla di ridondante
```

Poiché tutti i numeri primi tra 3 e 100 sono dispari.

# Esercizio 2 - Linguaggio C - (10 punti)

Si considerino le seguenti definizioni di tipo, utilizzate all'interno del sistema di gestione di un *social network*:```ctypedef char Stringa[30];
typedef struct{ Stringa nome; Stringa cognome; Stringa username; int annoIscrizione;
 Foto fotoUtente[50];
 int nFoto;} Utente;```

## Domanda 1

Si definisca un tipo di dato `Foto` atto a rappresentare una foto di un utente; Ogni foto è caratterizzata da un’immagine (matrice di `DIM_MAX` x `DIM_MAX` di interi da 0 a 255), da un `titolo` e da un `tag` (entrambi rappresentabili con il tipo `Stringa`):

```c
typedef struct{ int immagine[MAX_DIM][MAX_DIM]; Stringa tag; Stringa titolo;} Foto;```

## Domanda 2
Si ipotizzi di avere le seguenti definizioni aggiuntive: 

```c
#define T 125
#define UTENTI 100
Utente libroFaccia[UTENTI];
```

Si scriva una porzione di codice che, tra tutte le foto di tutti degli utenti inseriti in `LibroFaccia`, stampi a schermo il titolo della foto la cui matrice `immagine` ha il maggior numero di elementi che superano la soglia `T` ed il corrispondente `tag` sia “Montagna” oppure “Neve”. 

```c
Stringa foto;
int sum_soglia;
for (i = 0; i < MAX_UTENTI; i++) for (j = 0; j < libroFaccia[i].nFoto; j++)
 Stringa tag;
 strcpy(tag,libroFaccia[i].fotoUtente[j].tag); if(strcmp(tag,”Montagna”)==0 || strcmp(tag,”Neve”)==0) {	sum_soglia = 0;	for (k = 0; k < MAX_DIM; k++)		for (h = 0; h < MAX_DIM; h++)			if (libroFaccia[i].fotoUtente[j].immagine[k][h] > soglia)				sum_soglia++;	if (sum_soglia >= max_sum_soglia){		strcpy(foto,libroFaccia[i].fotoUtente[j].titolo);	}}
printf("%s", foto);```	

# Esercizio 3 - Matlab - (10 punti)

Si implementi in linguaggio Matlab un funzione **ricorsiva** `roll(testo, n)` che ritorni una matrice di caratteri dove:

* la prima riga consiste nei primi `n` caratteri di `testo`. 
* la seconda riga consiste negli `n` caratteri di `testo` a cui e' stato tolto il primo carattere.
* la terza riga consiste negli `n` caratteri di `testo` a cui sono stati tolti i primi due caratteri e così via.
* Nel caso la stringa `testo` non abbia `n` caratteri inserire il carattere `-`.
* La matrice e' considerata completa quando sono stati tolti tutti i caratteri dalla stringa originaria

Per esempio, la matrice risultante di `roll('buon viaggio', 10)` deve essere:```buon viagguon viaggion viaggion viaggio- viaggio--viaggio---iaggio----aggio-----ggio------gio-------io--------o-------------------
```

Soluzione

```matlab
function m = roll(txt, n)
  riga(1:n) = '-';
  if(length(txt) ~= 0)
    u = min(length(txt), n)
    riga(1:u) = txt(1:u)
    m = [ riga; roll(txt(2:end), n) ];
  else
    m = riga;
  end
end
```
