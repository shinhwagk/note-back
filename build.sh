#!/bin/bash
cd /tmp && git clone https://github.com/shinhwagk/note-back note-back --depth=1

cp -r ~/.ssh /tmp/note-back/ && docker build -t gk/note-back-pages --rm .

rm /tmp/note-back
