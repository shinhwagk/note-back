FROM node:latest

ADD .ssh /root/.ssh

RUN git config --global user.name shinhwagk
RUN git config --global user.email shanghai_sl@hotmail.com
RUN git config --global push.default simple

RUN git clone -b gh-pages git@github.com:shinhwagk/note-back gh-pages --depth=1
RUN ls -la /gh-pages
# RUN git clone https://github.com/shinhwagk/note-back note-back --depth=1

RUN mkdir /note-back
WORKDIR /note-back

# observation packages.json
ADD package.json package.json
RUN npm i --registry=https://registry.npm.taobao.org
# observation 
ADD . .
RUN npm run webpack

# update gh-pages
WORKDIR /gh-pages
RUN git pull

RUN rm -fr ./*
RUN mv /note-back/dist/* ./

RUN git add --all && git diff --cached --exit-code --quiet || git commit -m 'Update' && git push