# Info Test UI

#### Account 11
0x801756FeDc32399Fc482d656e5b576E5B1426AEf
426e207623fe2772c74cc3ffb2797aef4885a0c09ba53795fc58a8d4ca72a7b3
#### Account 12
0xbD00f770320606512885cbb5223c86FbA96aB510
9cda99025a6803a5e2d88c1f1620c28f7a7586d3c69612bdf2281d0bd9a46aa3


### Terminal 1
`$ ganache-cli -a 100 --defaultBalanceEther 10000 -m "hard crop gallery regular neglect weekend fatal stamp eight flock inch doll"`

### Terminal 2
`/git/iden3/rollup/rollup-operator/test/server:`
`$ truffle test build-configs-UI.test.js`

### Terminal 3
`/git/iden3/rollup/rollup-operator/src:`
`node server-proof.js`

### Terminal 4
`/git/iden3/rollup/rollup-operator/src/server`
`node operator.js`

### Terminal 5
`/git/iden3/rollup/rollup-operator/test/helpers`

#### Account 11 -> Operator
- `$ node admin-op-cli.js loadWallet -o http://127.0.0.1:9000 --pk 426e207623fe2772c74cc3ffb2797aef4885a0c09ba53795fc58a8d4ca72a7b3`
- `$ node admin-op-cli.js register --operator http://127.0.0.1:9000 --stake 2`
o
- `$ node admin-op-cli.js register --operator http://127.0.0.1:9004 --stake 2 --pk 426e207623fe2772c74cc3ffb2797aef4885a0c09ba53795fc58a8d4ca72a7b3`

#### When the operator doesn't work
- `$ node admin-op-cli.js unregister --operator http://127.0.0.1:9000 --id 2`
- `$ node admin-op-cli.js unregister --operator http://127.0.0.1:9000 --id 1 --pk 426e207623fe2772c74cc3ffb2797aef4885a0c09ba53795fc58a8d4ca72a7b3`

### Terminal 6
`/git/iden3/rollup/webapp-wallet`
`$ npm start`