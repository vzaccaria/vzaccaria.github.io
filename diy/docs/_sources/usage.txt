
Usage
================

.. note::

   All the examples are in Javascript ES6; they use template strings,
   arrow functions and rest and spread parameters.

   All nested blocks are represented by arrow functions that receive
   a context parameter (represented as ``_``). The context contains all the methods
   to build the final makefile:

   .. code-block:: coffeescript

      _ => {
        _.collect("all", ..)
      }

   ``this`` is bound to the context as well, so in Coffeescript you could write:

   .. code-block:: coffeescript

      () => {
        @collect("all", ..)
      }


   You can customize the context to include your own methods or modules. (see :js:func:`addPack`)


To start, we will create a makefile to concatenate and minify javascript files.
Assume you have two files (``src/file1.js`` and ``src/file2.js``) that you want to
concatenate and minify into a single ``_site/client.js`` file. Here's how you'd
write a Diy program for this task:

.. code-block:: coffeescript

  /* configure.js */

  var {
    generateProject
  } = require("diy");

  generateProject(_ => {
    _.collect("all", _ => {
      _.toFile( "_site/client.js", _ => {
        _.minify( _ => {
          _.concat( _ => {
            _.copy("src/*.js")
          })
        })
      })
    })
  })



Description
****************

Everything starts with the :js:func:`generateProject` library function. You invoke it with
a closure that describes the final makefile targets (using :js:func:`collect`). A target is just a name
you give to a set of products you want to build.

:js:func:`toFile` creates a named file whose contents are created as described by the closure passed as second parameter.
The closure (as it can be intuitively understood) minifies the concatenation of a copy of javascript files in ``src/*.js``.

Minification is done through a built-in utility function (:js:func:`minify`). You can specify other processing strategies
through :js:func:`processFiles`.

Concatenation is done through another utility function named :js:func:`concat`.
You can specify other reduction strategies through :js:func:`reduceFiles`.



To generate the makefile we use babel to get ES5 and run it with Node:

.. code-block:: bash

  >  babel configure.js | node

And here's the generated makefile:


The makefile comes with two default targets (`prepare` and `clean`) plus all the targets defined with `collect`:

.. code-block:: bash

  > make prepare      # Creates destination directories
  > make clean        # Removes all products
  > make all          # Execute commands associated with `all`

Make provides a way to specify the maximum parallelism to be used for building targets:

.. code-block:: bash

  > make all -j 8     # Build all, execute up to 8 concurrent commands.



Customization
*************

What about your favorite css/js preprocessor and other minifiers?

Here's how you would define a new processing step to compile javascript with a
bunch of browserify plugins:

.. code-block:: coffeescript

  _.browserify = (src, ...deps) => {
    var command = (_) => `./node_modules/.bin/browserify -t liveify -t node-lessify  ${_.source} -o ${_.product}`
    var product = (_) => `${_.source.replace(/\..*/, '.bfd.js')}`
    _.compileFiles(...([ command, product, src ].concat(deps)))
  }

:js:func:`compileFiles` is a built in function to easily construct new processing steps. Its first
two parameters are two templates:

1. a function to build the command line
2. a function to build the product name

The remaining parameters are ``src`` (glob for the source files) and the source dependencies.

.. code-block:: coffeescript

  generateProject(_ => {

    _.browserify = (dir, ...deps) => {
      var command = (_) => `./node_modules/.bin/browserify -t liveify -t node-lessify  ${_.source} -o ${_.product}`
      var product = (_) => `${_.source.replace(/\..*/, '.bfd.js')}`
      _.compileFiles(...([ command, product, dir ].concat(deps)))
    }

    _.collect("all", _ => {
      _.toFile( "_site/client.js", _ => {
          _.browserify("src/index.ls", "src/**/*.less", "src/**/*.ls")
      })
    })
  }

Serving and livereloading
*************************

Serving static files from a directory and live-reloading upon a change of a product is supported through ``pm2`` and ``tiny-lr``. We can
create two make targets (``start`` and ``stop``) that take care of starting and stopping both services:

.. code-block:: coffeescript

  generateProject(_ => {

      /* ... */

    _.collect("start", _ => {
      _.startWatch("_site/**/*")
      _.startServe("_site")
    })

    _.collect("stop", _ => {
      _.stopWatch()
      _.stopServe()
    })

      /* ... */
  })

:js:func:`startWatch` is a built-in step that launches a tiny-lr instance that triggers a reload upon change on files matching the glob.
:js:func:`startServe` serves files from the specified root and port.
