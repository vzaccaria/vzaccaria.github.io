---
title: Funzioni e scontrini
date: 2015-11-03 08:18:05

layout: post
category : infob
tags : ['funzioni']
---

Ecco di seguito le slides presentate oggi oggi; vi ricordo pero' che il
materiale che sarà oggetto delle prove scritte e orali di questo corso è
indicato nel [programma
dettagliato](http://www.vittoriozaccaria.net/deposit/programmaInfoB.pdf);
**quindi non è sufficiente studiare solo le slides o gli appunti della
lezione**.

- [Funzioni e files](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/le_matlab_5.pdf)

### Scontrini del supermercato

Un supermercato ha memorizzato il proprio archivio di scontrini nell'array struttura `scontrini` i cui elementi caratterizzano, ciascuno, una singola spesa ed hanno i seguenti campi:

* `id_cliente`: numero del cliente (**maggiore di zero**).
* `totale`: totale della spesa in EUR.
* `punti_premio`: i punti premio extra associati alle promozioni della spesa

Per ogni spesa viene assegnato al cliente un quantitativo di punti premio pari alla somma di:

* il valore dei `punti_premio` della spesa
* un punto premio per ogni 10 euro spesi.

#### Domanda ##

Scrivere un programma che, dato l'array struttura `scontrini`, costruisce un array `saldo` contenente le informazioni `(id_cliente, punti_totali)` ove `id_cliente` e' un identificatore univoco del cliente e `punti_totali` e' il totale di punti premio dati al cliente per **tutte le sue spese**.

#### Soluzione

Visivamente, possiamo vedere il problema posto come la creazione di un array di strutture dati `saldo` (uno per ciascuno degli `m` clienti) a partire dall'array `scontrini`, come mostrato qui.


```{dot !}
digraph g {
graph [
rankdir = "LR"
];
node [
fontsize = "12"
shape = "ellipse"
];
edge [
      ];

subgraph cluster_0 {
        label = "Array \nscontrini";
        style=filled;
    color=lightgrey;
        fontsize = "12";
        "node0" [
            label = "<f0> scontrini(1) |<f1> scontrini(2)| <f3> scontrini(3)| <f4> ...| <f5> scontrini(n-1)| <f6> scontrini(n)"
            shape = "record"
            ];
}

"node1" [
             label = "<f1> id_cliente = 1| <f2> punti_premio = 10| <f4> totale = 50";
             shape = "record";
             ];

"node2" [
             label = "<f1> id_cliente = 1| <f2> punti_premio = 10| <f4> totale = 50";
             shape = "record";
             ];

subgraph cluster_1 {
        label = "Array \nsaldo";
        style=filled;
        color=lightgrey;
        fontsize = "12";
        "node3" [
            label = "<f0> saldo(1) |<f1> saldo(2) | <f3> saldo(3) | <f4> ...| <f5> saldo(m-1)| <f6> saldo(m)"
            shape = "record"
            ];
}

"node4" [
             label = "<f1> id_cliente = 1| <f2> punti_totali = 70";
             shape = "record";
             ];

"node0":f0 -> "node1"
"node0":f1 -> "node2"
"node1" -> "node3":f0
"node2" -> "node3":f0
"node3":f0 -> "node4"
}
```

È da notare che il numero degli scontrini (`n`) è in generale diverso dal numero dei clienti `m`. Vi possono infatti essere più scontrini associati allo stesso cliente (come mostrato nella figura sopra).

#### Soluzione ##

Inizializzazione struttura di esempio:

```matlab
% Inizializzazione variabili

scontrini(1).id_cliente   = 1;
scontrini(1).punti_premio = 10;
scontrini(1).totale       = 50;

scontrini(2).id_cliente   = 1;
scontrini(2).punti_premio = 10;
scontrini(2).totale       = 50;

scontrini(3).id_cliente   = 4;
scontrini(3).punti_premio = 10;
scontrini(3).totale       = 50;
```


soluzione problema:

```matlab
clienti        = [scontrini.id_cliente];
n              = 1;
saldo(1).id    = -1;
saldo(1).punti = 0;

for i = 1:length(clienti)

  id_univoci = [saldo.id];

  if ~ any( id_univoci == clienti(i) )

    % Trova gli scontrini del cliente i-esimo
    scont_cliente_i = ([scontrini.id_cliente] == clienti(i));

    % Trova le spese del associate agli scontrini
    spese_cliente_i = find( scont_cliente_i );

    % Recupera i punti
    puntp_cliente_i = [scontrini(spese_cliente_i).punti_premio];
    punts_cliente_i = floor([scontrini(spese_cliente_i).totale]/10);

    % Aggiorna il saldo
    saldo(n).id           = clienti(i);
    saldo(n).punti_totali = sum(puntp_cliente_i) + sum(punts_cliente_i);

    printf('Saldo cliente %d = %d punti\n', saldo(n).id, saldo(n).punti)
    n = n + 1;
  end
end
```
