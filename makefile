all: dev-static

start-server:
	./node_modules/.bin/webpack-dev-server --progress --colors --watch-poll 1000 --watch-aggregate-timeout 300

stop-server:
	killall webpack-dev-server

production-build:
	PROD=1 ./node_modules/.bin/webpack --progress --colors

production-deploy: production-build
	git add .
	git commit -m "New core asset deploy"
	hub push --all

clean:
	rm -rf assets dist
