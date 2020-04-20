all: $(patsubst %.svg, %.pdf, $(wildcard *.svg))

%.pdf: %.svg
	cairosvg $*.svg > $@

