FROM node:10

RUN git clone https://github.com/iden3/rollup.git
WORKDIR "./rollup"
RUN git checkout feature/first-integration
RUN npm install 
COPY config-operator-cli/* ./

CMD ["sh","-c","./create-config-op.sh && node rollup-operator/src/server/register-op.js"]