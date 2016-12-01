FROM node:latest

RUN ssh-keygen -t rsa -f ~/.ssh/id_rsa -q -N ""

ADD build.sh build.sh

ADD id_rsa /root/.ssh/id_rsa

CMD ["/bin/bash","/build.sh"]