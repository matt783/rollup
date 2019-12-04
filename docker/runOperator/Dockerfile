FROM node:10

RUN git clone https://github.com/iden3/rollup.git
WORKDIR "./rollup"
RUN git checkout feature/first-integration
RUN npm install 
COPY ../config/*.js* ./
COPY config.env ./rollup-operator/src/server/config.env
RUN node buildSynchConfig.js
RUN rm buildSynchConfig.js
RUN mv pool-config.json ./rollup-operator/src/config/
RUN mv synch-config.json ./rollup-operator/src/config/

EXPOSE 9001

CMD ["sh","-c","npm run run-operator-archive"]