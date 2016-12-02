#!/bin/bash
baseDir='/tmp/note-back-pages'

function rmBaseDir(){ if [[ -d $baseDir ]]; then rm -fr $baseDir; fi }

rmBaseDir

mkdir $baseDir && cd $baseDir && git clone https://github.com/shinhwagk/note-back --depth=1 && cd ${baseDir}/note-back

cp -r ~/.ssh . && docker build -t gk/note-back-pages --rm . && docker rmi $(docker images -f "dangling=true" -q)

rmBaseDir