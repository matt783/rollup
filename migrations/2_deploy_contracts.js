/* global artifacts */
/* global web3 */

const poseidonUnit = require("../node_modules/circomlib/src/poseidon_gencontract.js");
const Verifier = artifacts.require("../contracts/test/VerifierHelper");
const Rollup = artifacts.require("../contracts/Rollup");
const RollupPoS = artifacts.require("../contracts/RollupPoS");

const maxTx = 10;
const maxOnChainTx = 5;
let insPoseidonUnit;

module.exports = async function (deployer, network, accounts) {
    
    const C = new web3.eth.Contract(poseidonUnit.abi);
    insPoseidonUnit = await C.deploy({ data: poseidonUnit.createCode() })
        .send({ gas: 2500000, from: accounts[0] });
    // console.log("Poseidon address:" + insPoseidonUnit._address);
    // console.log("Token rollup address:" + TokenRollup.address);
    await deployer.deploy(Verifier);
    // console.log("Verifier address:" + Verifier.address);
    await deployer.deploy(Rollup, Verifier.address, insPoseidonUnit._address,
        maxTx, maxOnChainTx);
    // console.log("Rollup address:" + Rollup.address);
    await deployer.deploy(RollupPoS, Rollup.address, maxTx);
    // console.log("RollupPoS address:" + RollupPoS.address);
    // load forge batch mechanism
    const insRollup = await Rollup.deployed();
    await insRollup.loadForgeBatchMechanism(RollupPoS.address);
};
