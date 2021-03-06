/* eslint-disable no-underscore-dangle */
/* global artifacts */
/* global contract */
/* global web3 */

const { stringifyBigInts } = require("snarkjs");
const chai = require("chai");
const { expect } = chai;

const HelpersPoSTest = artifacts.require("../contracts/test/RollupPoSHelpersTest");
const RollupDB = require("../../js/rollupdb");
const SMTMemDB = require("circomlib/src/smt_memdb");

async function checkHashOffChain(bb, insPoS, maxTx) {
    await bb.build();
    const data = await bb.getDataAvailable();
    const hashOffChain = await bb.getOffChainHash();
    const res = await insPoS.hashOffChainTxTest(data, maxTx);
    expect(hashOffChain.toString()).to.be.equal(res.toString());
}


contract("RollupPoSHelpers functions", () => {

    let insPoSHelpers;
    const nLevels = 24;
    let db;
    let rollupDB;

    before(async () => {
        // Deploy rollup helpers test
        insPoSHelpers = await HelpersPoSTest.new();
        // Init rollup Db
        db = new SMTMemDB();
        rollupDB = await RollupDB(db);
    });

    it("Should init rollup Db with two deposits", async () => {
        const maxTx = 10;
        const bb = await rollupDB.buildBatch(maxTx, nLevels);
        bb.addTx({
            fromIdx: 1,
            loadAmount: 1000,
            coin: 0,
            ax: 0,
            ay: 0,
            ethAddress: 0,
            onChain: true
        });

        bb.addTx({
            fromIdx: 2,
            loadAmount: 2000,
            coin: 0,
            ax: 0,
            ay: 0,
            ethAddress: 0,
            onChain: true
        });
        await bb.build();
        await rollupDB.consolidate(bb);
    });

    it("Should Hash off chain data", async () => {
        let maxTx = 10;
        // empty off-chain tx with 10 txMax
        const bb = await rollupDB.buildBatch(maxTx, nLevels);
        checkHashOffChain(bb, insPoSHelpers, maxTx);

        // non-empty off-chain tx with 8 txMax
        const tx = {
            fromIdx: 1,
            toIdx: 2,
            amount: 50,
        };
        maxTx = 8;
        const bb2 = await rollupDB.buildBatch(maxTx, nLevels);
        await bb2.addTx(tx);
        checkHashOffChain(bb2, insPoSHelpers, maxTx);

        // full off-chain data with 34 txMax
        const tx2 = {
            fromIdx: 2,
            toIdx: 1,
            amount: 50,
        };
        maxTx = 34;
        const bb3 = await rollupDB.buildBatch(maxTx, nLevels);
        for (let i = 0; i < maxTx; i++) {
            const txToAdd = (i%2) ? tx : tx2;
            await bb3.addTx(txToAdd);
        }
        checkHashOffChain(bb3, insPoSHelpers, maxTx);

        // empty off-chain tx with 255 txMax
        maxTx = 255;
        const bb4 = await rollupDB.buildBatch(maxTx, nLevels);
        checkHashOffChain(bb4, insPoSHelpers, maxTx);

        // empty off-chain tx with 256 txMax
        maxTx = 256;
        const bb5 = await rollupDB.buildBatch(maxTx, nLevels);
        checkHashOffChain(bb5, insPoSHelpers, maxTx);

        // empty off-chain tx with 257 txMax
        maxTx = 257;
        const bb6 = await rollupDB.buildBatch(maxTx, nLevels);
        checkHashOffChain(bb6, insPoSHelpers, maxTx);
    });    

    it("Should calculate effective stake for amount < 1 finney", async () => {
        let input = web3.utils.toWei("0.5", "finney");
        let resStake = await insPoSHelpers.effectiveStakeTest(input);
        expect (await insPoSHelpers.methods["effectiveStakeTest(uint256)"].estimateGas(input)).to.be.below(31000);
        expect(parseInt(stringifyBigInts(resStake))).to.be.equal(0);
    });

    it("Should calculate effective stake with very low relative error", async () => {
        for (let i = 0; i < 10; i++){
            for (let j = 1; j < 8; j++){ 
                for (let k = 0; k < 11; k++){ 
                    // test from 0.001 ether to 10000 ethers
                    let input = web3.utils.toWei((k+j*10**i).toString(), "finney");
                    let resStake = await insPoSHelpers.effectiveStakeTest(input);
                    let result = parseInt(stringifyBigInts(resStake));
                    let expected = Math.floor(Math.pow(parseInt(input)/1e+15,1.25));
                    // bigger the input, lower the relative error
                    expect(await insPoSHelpers.methods["effectiveStakeTest(uint256)"].estimateGas(input)).to.be.below(31000);
                    expect(Math.abs((result-expected)/result)).to.be.below(0.0015);
                }
            }
        }
    });
});
