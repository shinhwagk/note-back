FROM node:latest

# RUN apt update -y && apt upgrade -y
# RUN apt install -y rsync

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
RUN git remote add origin git@github.com:shinhwagk/note-back.git
RUN git push --force master:gh-pages