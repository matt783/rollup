FROM node:10
RUN npm install -g browserify
RUN git clone https://github.com/iden3/rollup.git
WORKDIR "./rollup"
RUN git checkout feature/first-integration-webapp 
RUN npm build
COPY ../config/synch-config.json ./docker/config
WORKDIR "./simple-webapp"
RUN npm install

CMD ["npm", "start"]