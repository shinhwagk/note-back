#!/bin/bash
git clone https://github.com/shinhwagk/note-back note-back --depth=1
git clone -b gh-pages git@github.com:shinhwagk/note-back.git gh-pages --depth=1

cd note-back
npm i --registry=https://registry.npm.taobao.org
npm run webpack
git log

cd /
rm -fr gh-pages/*  
mv note-back/lib/* gh-pages/ 

cd /gh-pages
git add --all && git commit -m 'save'
git config --global user.name shinhwagk
git config --global user.email shanghai_sl@hotmail.com
echo $1
