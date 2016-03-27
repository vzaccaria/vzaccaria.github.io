all: dev-static

start-server: data/bibliov2.json
	./node_modules/.bin/webpack-dev-server --progress --colors --watch-poll 1000 --watch-aggregate-timeout 300

stop-server:
	killall webpack-dev-server

production-build: data/bibliov2.json
	PROD=1 ./node_modules/.bin/webpack --progress --colors

production-deploy: production-build
	git add .
	git commit -m "New core asset deploy"
	hub push --all

refresh-biblio:
	rm -f data/bibliov2.json
	make data/bibliov2.json

data/bibliov2.json: data/biblio.bib
	./node_modules/.bin/vz-biblio2json convert $< > $@


clean:
	rm -rf assets dist
