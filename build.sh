#!/bin/bash
baseDir="/tmp/note-back-pages"

rm -fr $baseDir

git clone https://github.com/shinhwagk/note-back $baseDir --depth=1

cp -r ~/.ssh ./ && docker build -t gk/note-back-pages $baseDir