FROM node:10

RUN git clone https://github.com/iden3/rollup.git
RUN mkdir config-deploy 
WORKDIR "./rollup"
RUN git checkout feature/first-integration
RUN npm install 
RUN npm install -g truffle
COPY ./config-deploy/* ./

CMD ["sh","-c","./create-config-deploy.sh && truffle migrate --network ${NETWORK} && cp ./rollup-operator/src/config/synch-config.json ../config-deploy/ && cp ./rollup-operator/src/config/pool-config.json ../config-deploy/"]