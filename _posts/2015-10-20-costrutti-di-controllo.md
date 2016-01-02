---
title: Costrutti di controllo
date: 2015-10-20 16:09:45

layout: post
category : infob
tags : ['']
---

Ecco di seguito le slides presentate oggi oggi; vi ricordo pero' che il
materiale che sarà oggetto delle prove scritte e orali di questo corso è
indicato nel [programma dettagliato](http://www.vittoriozaccaria.net/deposit/programmaInfoB.pdf);
**quindi non è sufficiente studiare solo le slides o gli appunti della
lezione**.

- [Costrutti di controllo](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/le_matlab_2.pdf)

# Terna pitagorica<a id="sec-1" name="sec-1"></a>

Progettazione dell'algoritmo con diagramma di flusso:

![img](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/post-images/df_terna_pitagorica.png)

Programmazione

```octave
cat1=1
cat2=1
ip = 2

if(cat1*cat1 + cat2*cat2 == ip*ip)
  disp('terna pitagorica');
else
  disp('terna non pitagorica');
endif
```

    cat1 =  1
    cat2 =  1
    ip =  2
    terna non pitagorica

# Tabella dei caratteri ASCII<a id="sec-2" name="sec-2"></a>

Stampare a schermo l'elenco di tutti i caratteri alfabetici minuscoli
accompagnati dal corrispondente valore nella tabella dei caratteri ASCII.

```octave
for M = 'a':'d'
  fprintf("%c, codifica ascii %g\n", M, M )
end
```

Esecuzione:

    a, codifica ascii 97
    b, codifica ascii 98
    c, codifica ascii 99
    d, codifica ascii 100

# Numero di giorni in un mese<a id="sec-3" name="sec-3"></a>

Dato un mese, il programma deve restituire il numero di giorni che lo compongono.
Nel caso di "febbraio", chiedendo l'anno, gestire i bisestili.

La regola del calendario gregoriano è la seguente:

Un anno è bisestile se il suo numero è divisibile per 4,
con l'eccezione degli anni secolari (quelli divisibili per 100)
che non sono divisibili per 400.

Cominciamo col diagramma di flusso:

![img](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/post-images/df_bisesto.png)

il programma quindi e' il seguente:

```octave
mese = 'febbraio'
anno = 2000

annosecolare  = (mod(anno, 100) == 0)
divisibile400 = mod(anno, 400) == 0

switch mese
    case { 'gennaio', 'marzo', 'maggio', 'luglio', 'agosto', 'ottobre', 'dicembre' }
    giorni = 31
    case { 'aprile', 'giugno', 'settembre', 'novembre' }
    giorni = 30
    case 'febbraio'
    if mod(anno, 4) == 0 && ~(annosecolare && ~divisibile400)
      giorni = 29 % anno bisestile
    else
      giorni = 28
    endif
    otherwise
    disp('mese invalido')
end
```

Esecuzione:

    mese = febbraio
    anno =  2000
    annosecolare =  1
    divisibile400 =  1
    giorni =  29

# Numeri di Fibonacci<a id="sec-4" name="sec-4"></a>

Scrivere un programma Matlab che stampa i primi 100 numeri di Fibonacci.

![img](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/post-images/df_fibonacci.png){:width="40%"}

```octave
fib(1) = 1;
fib(2) = 1;
for i= 3:10
  fib(i) = fib(i-1) + fib(i-2);
endfor
fib
```

Esecuzione:

    fib =

        1    1    2    3    5    8   13   21   34   55

# Divisori di un numero<a id="sec-5" name="sec-5"></a>

Calcolare i divisori di un numero. Si ricordi che uno
dei modi in cui è possibile verificare se un numero (positivo)
è divisibile per un altro e
verificare se il resto della divisione tra il primo e
il secondo numero è nullo; ovvero, \`n\` è divisibile per \`i\` se \`(n % i) == 0\`.

![img](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/post-images/df_divisori.png){:width="40%"}

```octave
numero = 290

i = 1
while(i < numero)
  if (mod(numero,i) == 0)
     fprintf('%g divisore di %g\n', i, numero)
  endif
  i = i + 1;
endwhile
fprintf('passi eseguiti %g', i)
```

Esecuzione:

    numero =  290
    i =  1
    1 divisore di 290
    2 divisore di 290
    5 divisore di 290
    10 divisore di 290
    29 divisore di 290
    58 divisore di 290
    145 divisore di 290
    passi eseguiti 290

## Divisori non ovvi<a id="sec-5-1" name="sec-5-1"></a>

10 e' divisore poiche' sia 2 che 5 lo sono. E' possibile scartarlo a priori? si:

![img](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/post-images/df_divisori_non_ovvi.png){:width="40%"}

```octave
numero = 2
i = 1;
d = 1;
while(numero ~= 1)
  if (mod(numero,i) == 0)
     divisori(d) = i;
     numero = numero / i;
     d = d + 1;
  endif
  i = i + 1;
endwhile
fprintf('passi eseguiti %g\n', i)
divisori
```

Esecuzione:

    numero =  2
    passi eseguiti 3
    divisori =

       1   2
