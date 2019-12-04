/* global artifacts */
/* global web3 */

const Rollup = artifacts.require("../contracts/Rollup");
const TokenRollup = artifacts.require("../contracts/test/TokenRollup");
const RollupPoS = artifacts.require("../contracts/RollupPoS");

const path = require("path");
const fs = require("fs");
const configSynchPath = path.join(__dirname, "../rollup-operator/test/config/synch-config-test.json");
const configPoolPath = path.join(__dirname, "../rollup-operator/test/config/pool-config-test.json");
const configTestPath = path.join(__dirname, "../rollup-operator/test/config/test.json");



module.exports = async function (deployer) {

    // add token to Rollup
    const insRollup = await Rollup.deployed();
    await insRollup.addToken(TokenRollup.address,
        { value: web3.utils.toWei("0.02", "ether") });
        
    const pathRollupSynch = path.join(__dirname, "../rollup-operator/test/server/tmp-0");
    const pathRollupTree = path.join(__dirname, "../rollup-operator/test/server/tmp-1");
    const pathRollupPoSSynch = path.join(__dirname, "../rollup-operator/test/server/tmp-2");
    
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
        ethNodeUrl:"http://localhost:8545",
        ethAddressCaller: "0xB3b03f5Cae3e59D7A9FFB95C0fbF08087641A9B1", //cambiar
    };
    fs.writeFileSync(configSynchPath, JSON.stringify(configSynch));

    const configPool = {
        maxSlots: 10,               
        executableSlots: 1,      
        nonExecutableSlots: 1,      
        timeout: 1000            
    };
    fs.writeFileSync(configPoolPath, JSON.stringify(configPool));

    const testConfig = {
        rollupAddress: Rollup.address,
        tokenAddress: TokenRollup.address,
        posAddress: RollupPoS.address,
    };
    fs.writeFileSync(configTestPath, JSON.stringify(testConfig));

};