FROM node:10

RUN git clone https://github.com/iden3/rollup.git
RUN mkdir config 
WORKDIR "./rollup"
RUN git checkout feature/first-integration
RUN npm install 
RUN npm install -g truffle
COPY config.env ./

CMD ["sh","-c","truffle migrate --network development && cp ./rollup-operator/src/config/synch-config.json ../config/ && cp ./rollup-operator/src/config/pool-config.json ../config/"]