
all: circuit0.png circuit1.png

%.png: %.pdf
	convert  -density 300  $*.pdf $*.png

%.pdf: %.tex ./tikz-template.tex
	tikz2pdf ./tikz-template.tex $*.tex --engine lualatex
	pdfcrop $*.pdf $*.pdf

watch-%: %.pdf
	open $<
	pmw print $*.tex -t $< | watchman -j

delete-watch:
	watchman watch-del-all

clean:
	rm -rf tmp-*.* _minted* *.pdf *.png
