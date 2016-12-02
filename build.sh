#!/bin/bash
bashDir='/tmp/note-back-pages'

if [[ -d $bashDir ]]; then
  rm -fr $bashDir
fi

mkdir $bashDir && cd $bashDir && git clone https://github.com/shinhwagk/note-back note-back --depth=1 && cd ${bashDir}/note-back

cp -r ~/.ssh . && docker build -t gk/note-back-pages --rm .

rm -fr $bashDir