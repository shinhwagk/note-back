#!/bin/bash
baseDir='/tmp/note-back-pages'

if [[ -d $baseDir ]]; then rm -fr $baseDir; fi

mkdir $baseDir && cd $baseDir && git clone https://github.com/shinhwagk/note-back note-back --depth=1 && cd ${baseDir}/note-back

cp -r ~/.ssh . && docker build -t gk/note-back-pages --rm .

rm -fr $baseDir