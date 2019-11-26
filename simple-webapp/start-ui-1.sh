#!/bin/bash

gnome-terminal -e 'ganache-cli -a 100 --defaultBalanceEther 10000 -m "hard crop gallery regular neglect weekend fatal stamp eight flock inch doll"'

gnome-terminal -e 'truffle test ../rollup-operator/test/server/build-configs-UI.js'

gnome-terminal -e 'node ../rollup-operator/src/server-proof.js'

exit