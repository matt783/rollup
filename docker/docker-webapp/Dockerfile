FROM node:10
RUN npm install -g browserify
RUN git clone https://github.com/iden3/rollup.git
WORKDIR "./rollup"
RUN git checkout feature/first-integration
RUN npm install
RUN npm run build
COPY config/synch-config.json docker/docker-webapp/config/synch-config.json
WORKDIR "./simple-webapp"
RUN npm install

CMD ["npm", "start"]