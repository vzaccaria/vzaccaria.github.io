
API
=====

Build primitives
****************

In this section you will find all the primitives that can be used to build a makefile.
The utility section that comes after is just built above these primitives.

.. note::

   All the examples are in Javascript ES6; they use template strings,
   arrow functions and rest and spread parameters.

.. js:function:: generateProject(block)

  :param function block: function describing the construction of a set of targets

  This is the main entry point for the specification of the build process.
  The effect of this function is to generate a makefile in the current directory.

.. js:function:: collect(name, block)

  :param string name: name to be assigned to targets declared in the block
  :param function block: function describing the construction of a set of targets

  Creates a phony target in the makefile associated with the construction of
  the targets declared in the function block. Phony targets creation can
  be organized hierarchically.

  This example creates an ``all`` phony target that will produce, in parallel,
  two sub phony targets (``build1`` and ``build2``); the makefile will contain
  3 targets that can be invoked on the command line (``all``, ``build1`` and ``build2``):

  .. code-block:: javascript

    generateProject(_ => {

      _.collect("all", _ => {
        _.collect("build1", _ => {
          _.toFile( "_site/client1.js", _ => { .. })
          })
        _.collect("build2", _ => {
          _.toFile( "_site/client2.js", _ => { .. })
          })
        })
      })

.. js:function:: collectSeq(name, block)

  :param string name: name to be assigned to targets declared in the block
  :param function block: function describing the construction of a set of targets

  Similar to :js:func:`collect`. However, subtargets are executed serially.
  This example creates an ``all`` phony target that will invoke first ``build1`` then ``build2``.

  .. code-block:: javascript

    generateProject(_ => {

      _.collectSeq("all", _ => {
        _.collect("build1", _ => {
          _.toFile( "_site/client1.js", _ => { ... })
          })
        _.collect("build2", _ => {
          _.toFile( "_site/client2.js", _ => { ... })
          })
        })
      })

.. js:function:: compileFiles(cmd, product, src, deps..)

  :param function cmd: function that generates the command string
  :param function product: function that generates the name of the compiled file
  :param string src: glob representing the source files to be considered
  :param string deps: (one or more) files on which recompilation is dependent on (a part from src)

  This function is the essential building block for declaring transforms for files that require
  compilation. It basically iterates over all the files specified by the glob ``src``, emitting
  the compilation commands through the string generation function ``cmd``. ``cmd`` receives an object
  with ``source`` and ``product`` properties. ``source`` corresponds to the current source being compiled
  while ``product`` is the string generated with the ``product`` function. ``product`` receives an object
  with only a ``source`` property.

  You don't typically use this function alone. In fact, you build arbitrary compile commands from it. For
  example, here we extend the set of available transforms in Diy by introducing a browserify transform
  that we use later on.




  .. code-block:: coffeescript
     :emphasize-lines: 3-7

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

.. js:function:: toFile(filename, block)

  :param string filename: name of the file that will be created with the results of the block
  :param function block: function describing the construction of a set of targets

  If the block passed as a second parameter produces a single file, i.e., it is
  the result of a concatenation (or other reduction), this command specifies
  that the content should be written into the specified file.

  Here we copy the result of browserify's into ``_site/client.js``:

  .. code-block:: coffeescript
     :emphasize-lines: 4

     generateProject(_ => {

        _.collect("all", _ => {
          _.toFile( "_site/client.js", _ => {
              _.browserify("src/index.ls", "src/**/*.less", "src/**/*.ls")
          })
        })
      }

  .. note::

    If the child block creates more than one file, the effect is a concatenation.
    For example here we concatenate a ``foo.js`` with the results of
    browserify into ``_site/client.js``:

    .. code-block:: coffeescript

      _.toFile( "_site/client.js", _ => {
          _.glob("src/foo.js")
          _.browserify("src/index.ls", "src/**/*.less", "src/**/*.ls")
      })


.. js:function:: processFiles(cmd, product, block)

      :param function cmd: function that generates the command string
      :param function product: function that generates the name of the compiled file
      :param function block: function describing the construction of a set of targets

      This function is the essential building block for declaring transforms for files that have
      already been compiled. It basically iterates over all the files compiled in ``block`` by
      emitting transform commands through the string generation function ``cmd``. As with :js:func:`compileFiles`,
      ``cmd`` receives an object
      with ``source`` and ``product`` properties. ``source`` corresponds to the current source being transformed
      while ``product`` is the string generated with the ``product`` function. ``product`` receives an object
      with only a ``source`` property.

      You don't typically use this function alone. In fact, you build arbitrary transform commands from it.
      For example, here we extend the set of available transforms in Diy by introducing a minification
      transform (``minify``) that invokes ``uglifyjs``. We use it to minify the browserified file on line 10:


      .. code-block:: coffeescript
         :emphasize-lines: 5-8,12

         var uid = require('uid')

         generateProject(_ => {

            _.minify = (block) =>
               command = (_) => `uglifyjs ${_.source} > ${_.product}`
               product = (_) => `minified-${uid(4)}.js`
               _.processFiles(command, product, block)

            _.collect("all", _ => {
              _.toFile( "_site/client.js", _ => {
                  _.minify( _ => {
                    _.browserify("src/index.ls", "src/**/*.less", "src/**/*.ls")
                  })
              })
            })
          }

      .. warning::

          Product names that are the result of transformations of existing files should ensure that
          there are no name clashes. That is why we used a unique ``id`` generation function ``uid`` for
          our product:

          .. code-block:: coffeescript

            product = (_) => `minified-${uid(4)}.js`

.. js:function:: reduceFiles(cmd, product, block)

      :param function cmd: function that generates the command string
      :param function product: function that generates the name of the compiled file
      :param function block: function describing the construction of a set of targets

      This function is the essential building block for declaring transforms that reduce a set of files
      to a single file.
      In this case, ``cmd`` receives an object with a ``sources`` and ``product`` properties.
      ``sources`` is the array of filenames to be reduced, while product is the name of the final file.

      You don't typically use this function alone. In fact, you build arbitrary reduction commands from it.
      For example, here we extend the set of available reductions in Diy by introducing a concatenation
      step through the command line utility ``cat``. We concatenate all the js files in directory ``src``:


      .. code-block:: coffeescript
         :emphasize-lines: 5-8,12

         var uid = require('uid')

         generateProject(_ => {

            _.concat = (body) =>
               command = (_)  => `cat ${_.sources.join(' ')} > ${_.product}`
               product = (_)  => `concat-${uid(4)}.js`
               _.reduceFiles(command, product, body)

            _.collect("all", _ => {
              _.toFile( "_site/client.js", _ => {
                  _.concat( _ => {
                    _.glob("src/*.js")
                  })
              })
            })
          }


.. js:function:: glob(src)

      :param string src: glob of files

      As :js:func:`compileFiles`, but it does not compile anything. The products
      of this step are just the files specified in the glob.

      Here we concatenate all the js files already present in ``src``:

      .. code-block:: coffeescript
         :emphasize-lines: 13

         var uid = require('uid')

         generateProject(_ => {

            _.concat = (body) =>
               command = (_)  => `cat ${_.sources.join(' ')} > ${_.product}`
               product = (_)  => `concat-${uid(4)}.js`
               _.reduceFiles(command, product, body)

            _.collect("all", _ => {
              _.toFile( "_site/client.js", _ => {
                  _.concat( _ => {
                    _.glob("src/*.js")
                  })
              })
            })
          }


.. js:function:: mirrorTo(name, options, block)

      :param string name: directory in which all the files should be mirrored
      :param object options: option object
      :param function block: function describing the construction of a set of targets

      Copies all top-level targets built in ``block`` into directory ``name``. Relative paths are preserved.
      A string can be stripped from filenames through ``object.strip``.

      Assume you have two files, ``src/dir1/foo.js`` and ``src/dir2/bar.js``, then

      .. code-block:: coffeescript

         var uid = require('uid')

         generateProject(_ => {
            _.collect("all", _ => {
              _.mirrorTo( "_site", _ => {
                    _.glob("src/**/*.js")
                  })
              })
            })
          }

      will copy those files in ``_site/src/dir1/foo.js`` and ``_site/src/dir2/bar.js``.

      Using the ``strip`` option:

      .. code-block:: coffeescript

         var uid = require('uid')

         generateProject(_ => {
            _.collect("all", _ => {
              _.mirrorTo( "_site", {strip: 'src'}, _ => {
                    _.glob("src/**/*.js")
                  })
              })
            })
          }

      will copy the same files in ``_site/dir1/foo.js`` and ``_site/dir2/bar.js``.

.. js:function:: cmd(command)

  :param string command: command to be executed

  Just execute the command specified. Depending on the type
  of ``collect`` used, commands are executed serially or
  in parallel.

  Example:

  .. code-block:: coffeescript

    generateProject(_ => {
      _.collectSeq("update", _ => {
          _.cmd("make clean")
          _.cmd("rm -rf _site")
          _.cmd("./node_modules/.bin/babel ./configure.js | node")
          })
    })


.. js:function:: addPack(module)

      :param object module: object whose methods should be added to the default context

      This function is to extend the available Diy functions with your own plugins (i.e., mixin).

      Example:

      .. code-block:: coffeescript

        _my_module = (_) => {
          foo: (string) => {
            ..
          }
        }

        generateProject(_ => {
          _.addPack(_my_module(_))
          _.collectSeq("update", _ => {
              _.foo("bar")
              })
        })



Built in utility functions
**************************

.. js:function:: minify(block)

      :param function block: function describing the construction of a set of targets

      Built-in javascript minification function. Defined as

      .. code-block:: coffeescript

        _.minify = (block) =>
           command = (_) => `uglifyjs ${_.source} > ${_.product}`
           product = (_) => `minified-${uid(4)}.js`
           _.processFiles(command, product, block)

-
.. js:function:: concat(block)

      :param function block: function describing the construction of a set of targets

      Built-in javascript concatenation function. Defined as

      .. code-block:: coffeescript

        _.concat = (body) =>
           command = (_)  => `cat ${_.sources.join(' ')} > ${_.product}`
           product = (_)  => `concat-${uid(4)}.js`
           _.reduceFiles(command, product, body)

.. js:function:: startWatch(glob)

      :param string glob: glob of files to watch

      Starts a `livereload <http://livereload.com/>`_ server (through `tiny-lr <https://github.com/mklabs/tiny-lr>`_) and watches for changes
      all the files specified in the glob. On change, the livereload server is notified.
      This command does not start the static web server (see :js:func:`startServe`).

      Usage:

      .. code-block:: coffeescript

        _.collect("start", _ => {
          _.startWatch("_site/**/*")
        })



      And then, on the command line:

      .. code-block:: bash

        > make start
        /Users/zaccaria/development/github/diy/lib/packs/../../node_modules/.bin/pm2 start /Users/zaccaria/development/github/diy/lib/packs/livereload.js -- '_site/**/*'
        [PM2] Spawning PM2 daemon
        [PM2] PM2 Successfully daemonized
        [PM2] Process /Users/zaccaria/development/github/diy/lib/packs/livereload.js launched



.. js:function:: stopWatch()


      Stops the LiveReload server.


.. js:function:: startServe(root, port)

      :param string root: root of the static web server
      :param number port: localhost port (default 4000)

      Serve pages from root at the specified port. Pages are served through
      `connect-livereload <https://github.com/intesso/connect-livereload>`_ so
      you don't need to add any additional ``<script>`` tag for LiveReload.

.. js:function:: stopServe()

      Stops the static web server.
