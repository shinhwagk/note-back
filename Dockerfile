FROM node:latest

ADD .ssh /root/.ssh

RUN git config --global user.name shinhwagk
RUN git config --global user.email shanghai_sl@hotmail.com
RUN git config --global push.default simple

RUN mkdir /note-back
WORKDIR /note-back

# observation packages.json
ADD package.json package.json
RUN npm i --registry=https://registry.npm.taobao.org
# observation 
ADD . .
RUN npm run webpack

# update gh-pages
WORKDIR /note-back/dist
RUN git init && git add -A && git commit -m 'Update'
RUN git push --force https://github.com/shinhwagk/note-back.git master:gh-pages