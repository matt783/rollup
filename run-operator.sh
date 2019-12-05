#!/bin/bash
echo "CONFIG_SYNCH = /home/laia/git/iden3/rollup/rollup-operator/test/config/synch-config-test.json
CONFIG_POOL = /home/laia/git/iden3/rollup/rollup-operator/test/config/pool-config-test.json
OPERATOR_PORT_ADMIN = 9000
OPERATOR_PORT_EXTERNAL = 9001
URL_SERVER_PROOF = http://127.0.0.1:10001" > rollup-operator/src/server/config.env

gnome-terminal -e 'node rollup-operator/src/server-proof.js'

gnome-terminal -e 'node rollup-operator/src/server/operator.js'

gnome-terminal -e "node rollup-operator/src/server/register-op.js"

exit