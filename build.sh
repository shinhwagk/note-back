#!/bin/bash
git clone https://github.com/shinhwagk/note-back note-back --depth=1

cd note-back
npm i --registry=https://registry.npm.taobao.org
npm run webpack
git log

cd /
git clone -b gh-pages https://github.com/shinhwagk/note-back gh-pages --depth=1

rm -fr /gh-pages/*  
mv /note-back/lib/* /gh-pages/ 

cd /gh-pages
git add --all && git commit -m 'save'
git push 
