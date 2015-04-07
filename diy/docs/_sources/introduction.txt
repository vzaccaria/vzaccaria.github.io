
Introduction
===============================

Diy is a build language embedded in Javascript. It allows to compose build systems by using a set of simple yet powerful primitives. The generated build system is in the form of a Makefile.

The idea for Diy came while tinkering with **domain specific languages** for build systems.
DSLs provide the developer with the vocabulary of a problem domain to express a programmatic solution that could be understood by a *problem domain expert*.

Previous attempts
*******

An initial attempt I made was with `Webmake <http://www.vittoriozaccaria.net/wmake/>`_, which was not really a DSL but just a
configuration based tool to generate makefiles.

Another attempt closer to Diy was `Newmake <https://github.com/vzaccaria/newmake>`_, which, however, was meant to be a private-ish project
to test DSL to create makefiles.

Now I think I've nailed a very useful DSL that hopefully you will enjoy as well.


.. seealso::

      Debasish Ghosh, "DSLs in Action"
        http://www.amazon.com/DSLs-Action-Debasish-Ghosh/dp/1935182455

      Martin Fowler Website
        http://martinfowler.com/books/dsl.html

      Writing Domain Specific Languages
        http://docs.codehaus.org/display/GROOVY/Writing+Domain-Specific+Languages

      Validation DSL for Client-Server Applications
        http://www.cas.mcmaster.ca/~carette/publications/FedorenkoThesis.pdf

      WebDSL
        http://webdsl.org/home
