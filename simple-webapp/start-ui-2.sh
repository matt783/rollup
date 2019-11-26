#!/bin/bash

gnome-terminal -e "node ../rollup-operator/src/server/operator.js"

gnome-terminal -e "truffle test ../rollup-operator/test/server/register-op.test.js"

exit