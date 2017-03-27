
all: production-build

start-server: data/bibliov2.json
	yarn start

start-dashboard:
	yarn start-dashboard

production-build: data/bibliov2.json
	rm -rf assets && yarn build

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
