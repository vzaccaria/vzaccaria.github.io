---
title: Tipi di dato e strutture di controllo in C
date: 2015-12-11 13:14:30

layout: post
category : infob
tags : ['tipi di dato', 'strutture di controllo']
---

Ecco di seguito le slides presentate oggi oggi; vi ricordo pero' che il
materiale che sarà oggetto delle prove scritte e orali di questo corso è
indicato nel [programma
dettagliato](http://www.vittoriozaccaria.net/deposit/programmaInfoB.pdf);
**quindi non è sufficiente studiare solo le slides o gli appunti della
lezione**.

-   [Tipi di dato, costrutti di controllo e funzioni in C](https://dl.dropboxusercontent.com/u/5867765/1516-published-infob/le_linguaggioc_2.pdf). **Importante**: Le slides contengono alcune nozioni sulle funzioni non viste oggi. Iniziate a leggerle.

*Attenzione*: Alcuni degli esercizi seguenti non sono stati fatti oggi a
esercitazione ma vengono comunque messi qui per completezza.

# Convertire una stringa di caratteri da minuscole a maiuscole.

Problema: abbiamo una stringa di caratteri minuscoli e la vogliamo trasformare in caratteri maiuscoli (ipotesi: tutti i caratteri sono minuscoli).

    #include <stdio.h>
    #define MAX_LEN 100
    int main()
    {
        const int offset = 'A' - 'a';
        char stringa[MAX_LEN+1];
        int i = 0;
        printf("Inserisci una stringa di caratteri (no spazi):\n");
        scanf("%s", stringa);
        while (stringa[i] != '\0') {
            if (stringa[i] >= 'a' && stringa[i] <= 'z') {
                stringa[i] += offset;
            }
            i = i + 1;
        }

        printf("La stringa ora e' %s\n", stringa); system("pause");
    }

# Stringhe palindrome

Il programma seguente verifica se una parola è palindroma o no, ovvero se può essere letta nella stessa maniera da sinistra verso destra e viceversa: “otto” e “anilina” sono parole palindrome, “ciao” e “arnia” non lo sono.

**Soluzione:**

    #include <stdio.h>
    #include <string.h>

    #define MAX 50

    int main()
    {
        char parola[MAX];
       int i, ok, len;

       printf("Inserisci una parola: ");
       scanf("%s", parola);

       len = strlen(parola);
       ok = 1;

       for (i = 0; i < len/2 && ok != 0; i++) {
            if (parola[i] != parola[len-1-i])
           ok = 0;
       }

       printf("'%s' ", parola);

       if (ok == 0)
            printf("non ");

       printf("e' una parola palindroma\n");

       return 0;
    }



# Numeri di Fibonacci

Scrivere un programma C che stampa i primi 100 numeri di Fibonacci.
Ricordiamo che la successione dei numeri di Fibonacci è definita come segue:

$$F(0) = 0 $$

$$F(1) = 1 $$

$$F(n) = F(n-1) + F(n-2), n>1 $$


    #include <stdio.h>
    int main()
    {
        int ultimo, penultimo, i, F;
        ultimo = 0 ;
        printf("%d\n",ultimo);
        penultimo = 1 ;
        printf("%d\n",penultimo);
        for( i = 2 ; i <= 10 ; i = i + 1 ) {
            F = ultimo + penultimo;
            printf("%d\n", F);
            ultimo = penultimo;
            penultimo = F;
        }
        return 0;
    }

**Output:**

    0
    1
    1
    2
    3
    5
    8
    13
    21
    34
    55


# Stampa divisori di un numero

Nel prossimo esempio vedremo come calcolare i divisori di un numero. Si ricordi che uno dei modi in cui è possibile verificare se un numero (positivo) è divisibile per un altro e
verificare se il resto della divisione tra il primo e il secondo numero è nullo; ovvero, `n` è divisibile per `i` se `(n % i) == 0`.

**Soluzione:**

    #include <stdio.h>
    int main()
    {
        int n, i;
        printf("Inserisci un numero: ");
        scanf("%d", &n);
        printf("I divisori sono: ");
        i = 1;
        while (i <= n) {
            if (n % i == 0)
                printf("%d ", i);
            i++;
        }
        printf("\n");
        return 0;
    }


# Cicli innestati

si vuole stampare un triangolo rettangolo isoscele fatto di asterischi (cioè di caratteri *), la cui lunghezza di un lato sia pari ad un valore inserito dall'utente.

Es. di output con lato uguale a 4:

    *
    **
    ***
    ****

**Soluzione**:

    #include <stdio.h>
    int main()
    {
        int n, i, j;
        i = 0, j = 0;

        printf("Inserire la lunghezza del lato: ");
        scanf("%d", &n);

        while (i < n) {
            while (j <= i) {
                printf("*");
                j++;
            }
            printf("\n");
            j = 0;
        }
        i++;
        return 0;
    }
