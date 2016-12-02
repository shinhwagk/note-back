#!/bin/bash
bashDir='/tmp/note-back-pages'

mkdir $bashDir && cd $bashDir && git clone https://github.com/shinhwagk/note-back note-back --depth=1 && cd ${bashDir}/note-back

cp -r ~/.ssh . && docker build -t gk/note-back-pages --rm .

rm -fr $bashDir