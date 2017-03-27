
# To generate custom lodash, run:
# Remember to add an alias to the webpack config

all: lodash.custom.js lodash.custom.min.js react.min.js react-dom.min.js

lodash.custom.js lodash.custom.min.js: ./makefile
	../node_modules/.bin/lodash include=map,sortBy,partial,flatten,isUndefined,truncate,capitalize,join,filter,first,get,head,template,some,memoize

react.min.js react-dom.min.js: ./makefile
	cp ../node_modules/react/dist/react.min.js \
	   ../node_modules/react-dom/dist/react-dom.min.js .
		 
