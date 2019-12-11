FROM node:10

RUN git clone https://github.com/iden3/rollup.git
WORKDIR "./rollup"
RUN git checkout feature/first-integration
#RUN apt-get install tmux
RUN npm install 
COPY config.env ./rollup-operator/src/server/config.env


CMD ["sh","-c","node rollup-operator/src/server/register-op.js"]