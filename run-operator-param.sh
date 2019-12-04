#!/bin/bash

#./run-operator-param.sh 9000 9001 http://127.0.0.1:10001 config

path_synch="$(pwd)/rollup-operator/test/config/synch-config-test.json"
path_pool="$(pwd)/rollup-operator/test/config/pool-config-test.json"

echo "CONFIG_SYNCH = $path_synch
CONFIG_POOL = $path_pool
OPERATOR_PORT_ADMIN = $1
OPERATOR_PORT_EXTERNAL = $2
URL_SERVER_PROOF = $3" > rollup-operator/src/server/$4.env

gnome-terminal -e 'node rollup-operator/src/server-proof.js'

gnome-terminal -e 'node rollup-operator/src/server/operator.js'

gnome-terminal -e "truffle test rollup-operator/test/server/register-op.test.js"

exit