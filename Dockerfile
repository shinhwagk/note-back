FROM node:latest

RUN git clone https://github.com/shinhwagk/note-back note-back --depth=1
RUN git clone -b gh-pages https://github.com/shinhwagk/note-back gh-pages --depth=1

WORKDIR note-back
RUN npm i --registry=https://registry.npm.taobao.org
RUN npm run webpack

WORKDIR /
RUN rm -fr gh-pages/* \ 
  && mv note-back/lib gh-pages/ \
  && mv note-back/index.html gh-pages/
WORKDIR /gh-pages
RUN git add --all && git commit -m 'save'
RUN git config --global user.name shinhwagk
RUN git config --global user.email shanghai_sl@hotmail.com


