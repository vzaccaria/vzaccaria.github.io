all: soa.pdf soa.svg

%.pdf: %.py
	python $< 
	mv $*.pdf $*.uncropped.pdf
	pdfcrop $*.uncropped $@
	

%.svg: %.pdf
	pdf2svg $*.pdf $*.svg

watch-%: %.svg
	open $<
	(watchman-make -p "$*.py" -t "$*.svg" > /dev/null 2> /dev/null &)
	nvim soa.py

clean:
	rm -f *.svg *.pdf
