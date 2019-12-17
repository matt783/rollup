#!/bin/bash

path_synch="$(pwd)/rollup-operator/src/config/synch-config.json"
path_pool="$(pwd)/rollup-operator/src/config/pool-config.json"

echo "CONFIG_SYNCH = $path_synch
CONFIG_POOL = $path_pool
OPERATOR_PORT_ADMIN = $OPERATOR_PORT_ADMIN
OPERATOR_PORT_EXTERNAL = $OPERATOR_PORT_EXTERNAL
URL_SERVER_PROOF = $URL_SERVER_PROOF
LOG_LEVEL = $LOG_LEVEL
OPERATOR_MODE = $OPERATOR_MODE
URL_OPERATOR = $URL_OPERATOR
STAKE = $STAKE
SEED = $SEED
PRIVATE_KEY = $PRIVATE_KEY
PASSWORD = $PASSWORD" > config.env

mv config.env ./rollup-operator/src/server/config.env