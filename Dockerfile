FROM node:latest

RUN git clone https://github.com/shinhwagk/note-back note-back --depth=1

WORKDIR note-back

RUN npm i --registry=https://registry.npm.taobao.org
