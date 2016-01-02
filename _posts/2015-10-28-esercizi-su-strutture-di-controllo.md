---
title: esercizi su strutture di controllo
date: 2015-10-28 08:18:05

layout: post
category : infob
tags : ['']
---

Ecco di seguito gli esercizi fatti oggi ed alcuni lasciati per casa (con soluzioni); vi ricordo che il
materiale che sarà oggetto delle prove scritte e orali di questo corso è
indicato nel [programma dettagliato](http://www.vittoriozaccaria.net/deposit/programmaInfoB.pdf);
**quindi non è sufficiente studiare solo le slides o gli appunti della
lezione**.

# Il numero e' primo?

In questo esercizio dobbiamo verificare se un numero e' primo, ovvero se gli unici divisori
interi sono 1 ed il numero stesso.

La filosofia di questo esercizio e' la seguente; scandiremo tutti i numeri `i` a partire da 1 e
verificheremo se dividono il numero dato. Alla fine, raccoglieremo gli eventuali divisori nell'array `divisori`
e verificheremo se questo contiene 1 ed il numero originario.

**Diagrammo di flusso**

![img](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/post-images/df_divisori_numero_primo.png)

**Programma**

```octave
numero_original = 37
numero = numero_original
i = 1;
d = 1;
while(numero ~= 1)
  if (mod(numero,i) == 0)
     divisori(d) = i;
     numero = numero / i;
     d = d + 1;
  end
  i = i + 1;
end

fprintf('passi eseguiti %g\n', i)
divisori

if all((divisori == numero_original) | (divisori == 1))
   disp('numero primo!')
else
   disp('numero non primo!')
end
```

**Esecuzione**:

    numero_original =  37
    numero =  37
    passi eseguiti 38
    divisori =

        1   37

    numero primo!

# Tabella caratteri ASCII<a id="sec-2" name="sec-2"></a>

Stampare a schermo l'elenco di tutti i caratteri alfabetici maiuscoli accompagnati dal corrispondente valore nella tabella dei caratteri ASCII.

**Diagramma di flusso**
![img](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/post-images/df_ascii_table.png)

** Programma**
```octave
for c = 'A':'E'
    fprintf("%c rappresenta %d\n", c, c);
end
```

**Esecuzione**

    A rappresenta 65
    B rappresenta 66
    C rappresenta 67
    D rappresenta 68
    E rappresenta 69

# Convertire un stringa in caratteri maiuscoli<a id="sec-3" name="sec-3"></a>

```octave
stringa = 'mi chiamo Pippo'

for c = stringa
  if (c >= 'a' && c <= 'z')
      c = c - ('a' - 'A');
  end
  fprintf("%c", c)
end
```

**Esecuzione**:

    stringa = mi chiamo Pippo
    MI CHIAMO PIPPO

# Cicli innestati<a id="sec-5" name="sec-5"></a>

Si vuole stampare un triangolo rettangolo isoscele fatto di asterischi (cioè di caratteri `*`), la cui lunghezza di un lato sia pari ad un valore inserito dall'utente.

Es. di output con lato uguale a 4:

```
*
**
***
****
```


**Diagramma di flusso**

![img](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/post-images/df_triangolo_asterischi.png)


**Programma**

```octave
n = 10

for x = 1:10
  for y = 1:x
  fprintf("*")
  end
  fprintf("\n")
end
```

**Esecuzione**:

    n =  10
    *
    **
    ***
    ****
    *****
    ******
    *******
    ********
    *********
    **********

# Radice quadrata iterativa<a id="sec-6" name="sec-6"></a>

Calcolare l'intero piu' vicino alla radice quadrata di un numero `n`.


**Diagramma di flusso**

![img](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/post-images/df_radice_approssimata.png)


**Programma**

```octave
n = 29819

for x = 1:n
   if(x*x <= n)
     rad = x;
   end
end
rad
rad*rad
```

**Esecuzione**:

    n =  29819
    rad =  172
    ans =  29584

# Stringhe palindrome<a id="sec-7" name="sec-7"></a>

Il programma seguente verifica se una parola è palindroma o no,
ovvero se può essere letta nella stessa maniera da sinistra verso
destra e viceversa: “otto” e “anilina” sono parole palindrome, “ciao” e “arnia” non lo sono.


**Diagramma di flusso**

![img](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/post-images/df_stringhe_palindrome.png)


**Programma**

```octave
parola = 'otto';
palindroma = 1;
len = size(parola,2);
for i = 1:len/2
   if parola(i) != parola(len-i+1)
      palindroma = 0;
      break
   end
end
palindroma
```
**Esecuzione**:

    palindroma =  1

# Bubble sort<a id="sec-8" name="sec-8"></a>

Questo esercizio l'abbiamo interrotto a meta' poiche' era finita l'ora. Ecco la soluzione completa:


**Diagramma di flusso**


![img](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/post-images/df_bubble_sort.png)


**Programma**

```octave
x = [ 9 2 1 0 7 3 ]

for i=1:size(x,2)
  ordinato = 1;
  for j=1:size(x,2)-1
    if x(j) > x(j+1)
       t = x(j+1);
       x(j+1) = x(j);
       x(j) = t;
       ordinato = false;
    end
  end
  if ordinato
       break;
  end
end

x
```


**Esecuzione**:

    x =

       9   2   1   0   7   3

    x =

       0   1   2   3   7   9
