/* eslint-disable no-underscore-dangle */
/* global artifacts */
/* global contract */
/* global web3 */
/* global BigInt */

<<<<<<< HEAD
const chai = require("chai");
//const { expect } = chai;
//const ethers = require("ethers");
=======
//const chai = require("chai");
//const { expect } = chai;
>>>>>>> slasher
const fs = require("fs");

const { slashSC } = require("./slasher");
const poseidonUnit = require("circomlib/src/poseidon_gencontract");
const rollupUtils = require("../../rollup-utils/rollup-utils.js");
const Verifier = artifacts.require("../../../../contracts/test/VerifierHelper");
const RollupTest = artifacts.require("../../../../contracts/test/RollupTest");
<<<<<<< HEAD
const TokenRollup = artifacts.require("../../../../contracts/test/TokenRollup");
=======
>>>>>>> slasher
const RollupPoS = artifacts.require("../../../../contracts/test/RollupPoS");
const RollupDB = require("../../js/rollupdb");
const SMTMemDB = require("circomlib/src/smt_memdb");

function buildInputSm(bb, beneficiary) {
    return {
        oldStateRoot: bb.getInput().oldStRoot.toString(),
        newStateRoot: bb.getNewStateRoot().toString(),
        newExitRoot: bb.getNewExitRoot().toString(),
        onChainHash: bb.getOnChainHash().toString(),
        feePlan: bb.feePlan.length ? bb.feePlan : [0, 0],
        compressedTx: `0x${bb.getDataAvailable().toString("hex")}`,
        offChainHash: bb.getOffChainHash().toString(),
        nTxPerToken: bb.getCountersOut().toString(),
        beneficiary: beneficiary
    };
}

function manageEvent(event) {
    if (event.event == "OnChainTx") {
        const txData = rollupUtils.decodeTxData(event.args.txData);
        return {
            fromIdx: txData.fromId,
            toIdx: txData.toId,
            amount: txData.amount,
            loadAmount: BigInt(event.args.loadAmount),
            coin: txData.tokenId,
            ax: BigInt(event.args.Ax).toString(16),
            ay: BigInt(event.args.Ay).toString(16),
            ethAddress: BigInt(event.args.ethAddress).toString(),
            onChain: true
        };
    }
}

contract("RollupPoS", async (accounts) => {

    let insPoseidonUnit;
<<<<<<< HEAD
    //let insTokenRollup;
=======
>>>>>>> slasher
    let insRollupTest;
    let insVerifier;
    let insRollupPoS;

    let urlNode = "http://localhost:8545";
    let addressSC;
<<<<<<< HEAD
    const  walletPath = "./wallet.json";
=======
    const  walletPath = "./walletSlash.json";
>>>>>>> slasher
    const  pass = "foo";
    let abi;
    let walletJson;
    let rollupDB;
    let db;
    const nLevels = 24;

    async function forgeBlock(events = undefined) {
       
        const block = await rollupDB.buildBatch(maxTx, nLevels);
        if (events) {
            events.forEach(elem => {
                block.addTx(manageEvent(elem));
            });
        }
        await block.build();
      
        const inputSm = buildInputSm(block, beneficiary);
        await insRollupTest.forgeBatchTest(inputSm.oldStateRoot, inputSm.newStateRoot, inputSm.newExitRoot,
            inputSm.onChainHash, inputSm.feePlan, inputSm.compressedTx, inputSm.offChainHash, inputSm.nTxPerToken,
            inputSm.beneficiary);
          
        await rollupDB.consolidate(block);
     
    }
  
    const maxTx = 10;
    const maxOnChainTx = 10;
    const {
        0: owner,
        1: beneficiary,
    } = accounts;

    before(async () => {
        // Deploy poseidon
        const C = new web3.eth.Contract(poseidonUnit.abi);
        insPoseidonUnit = await C.deploy({ data: poseidonUnit.createCode() })
            .send({ gas: 2500000, from: owner });

        // Deploy Verifier
        insVerifier = await Verifier.new();

        // Deploy Rollup test
        insRollupTest = await RollupTest.new(insVerifier.address, insPoseidonUnit._address,
            maxTx, maxOnChainTx);

        insRollupPoS = await RollupPoS.new(insRollupTest.address);

        addressSC = insRollupPoS.contract._address;
        abi = insRollupPoS.abi;
        walletJson = JSON.parse(fs.readFileSync(walletPath, "utf8"));

        db = new SMTMemDB();
        rollupDB = await RollupDB(db);
        
    });
    it("a verr", async (done) => {
        for(let i = 0; i < 1102; i++) {
            await forgeBlock();
        }
        slashSC(urlNode, addressSC, walletJson, pass, abi, 0);
    });
});