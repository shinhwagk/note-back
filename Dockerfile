FROM node:latest

ADD build.sh build.sh
ADD .git-credentials /root/.git-credentials

RUN git config --global credential.helper store
RUN git config --global user.name shinhwagk
RUN git config --global user.email shanghai_sl@hotmail.com
RUN git config --global push.default simple

CMD ["/bin/bash","/build.sh"]
