
all: production-build

start-server: data/bibliov2.json
	yarn start

start-dashboard:
	yarn start-dashboard

production-build: data/bibliov2.json
	rm -rf assets && yarn build

deploy: 
	git add .
	git commit -m "New core asset deploy"
	git push --all

production-deploy: production-build
	make deploy

refresh-biblio:
	rm -f data/bibliov2.json
	make data/bibliov2.json

data/bibliov2.json: /Users/zaccaria/development/github/org-institutional/curriculum/data/biblio.bib
	./node_modules/.bin/vz-biblio2json convert $< > $@

clean:
	rm -rf assets dist
