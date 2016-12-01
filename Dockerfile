FROM node:latest

RUN ssh-keygen -t rsa -f ~/.ssh/id_rsa -q -N ""

ADD build.sh build.sh

RUN cat ~/.ssh/id_rsa.pub

CMD ["/bin/bash","/build.sh"]