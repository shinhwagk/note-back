FROM node:latest

ADD build.sh build.sh

ADD .git-credentials ~/.git-credentials

RUN git config --global credential.helper store

CMD ["/bin/bash","/build.sh"]