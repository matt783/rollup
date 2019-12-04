/* global artifacts */
/* global web3 */

const Rollup = artifacts.require("../contracts/Rollup");
const RollupPoS = artifacts.require("../contracts/RollupPoS");

const path = require("path");
const fs = require("fs");
const configSynchPath = path.join(__dirname, "../rollup-operator/src/config/synch-config.json");
const configPoolPath = path.join(__dirname, "../rollup-operator/src/config/pool-config.json");

module.exports = async function (deployer, network, accounts) {

    // add token to Rollup
    const insRollup = await Rollup.deployed();
    
    let urlNode = "http://localhost:8545";
    if (network == "goerli"){
        await insRollup.addToken("0xaFF4481D10270F50f203E0763e2597776068CBc5",
            { value: web3.utils.toWei("0.02", "ether") });
        urlNode = "https://goerli.infura.io/v3/135e56bb9eaa42c59e73481fcb0f9b4a";
    }
   
    const pathRollupSynch = path.join(__dirname, "../rollup-operator/src/server/tmp-0");
    const pathRollupTree = path.join(__dirname, "../rollup-operator/src/server/tmp-1");
    const pathRollupPoSSynch = path.join(__dirname, "../rollup-operator/src/server/tmp-2");
    
    const configSynch = {
        rollup: {
            synchDb: pathRollupSynch,
            treeDb: pathRollupTree,
            address: Rollup.address,
            abi: Rollup.abi,
            creationHash: Rollup.transactionHash,
        },
        rollupPoS: {
            synchDb: pathRollupPoSSynch,
            address: RollupPoS.address,
            abi: RollupPoS.abi,
            creationHash: RollupPoS.transactionHash,
        },
        ethNodeUrl:urlNode,
        ethAddressCaller: accounts[0], 
    };
    fs.writeFileSync(configSynchPath, JSON.stringify(configSynch));

    const configPool = {
        maxSlots: 10,               
        executableSlots: 1,      
        nonExecutableSlots: 1,      
        timeout: 1000            
    };
    fs.writeFileSync(configPoolPath, JSON.stringify(configPool));
};