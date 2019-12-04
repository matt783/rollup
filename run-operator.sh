#!/bin/bash

gnome-terminal -e 'node rollup-operator/src/server-proof.js'

gnome-terminal -e 'node rollup-operator/src/server/operator.js'

gnome-terminal -e "node rollup-operator/src/server/register-op.js"

exit