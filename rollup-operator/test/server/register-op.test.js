/* global artifacts */
/* global contract */
/* global web3 */

const { addBlocks } = require("../../../test/contracts/helpers/timeTravel");
const ethers = require("ethers");
const TokenRollup = artifacts.require("../contracts/test/TokenRollup");
const Rollup = artifacts.require("../contracts/test/Rollup");
const RollupPoS = artifacts.require("../contracts/RollupPoS");
const fs = require("fs");
const path = require("path");
const { timeout } = require("../../src/utils");
const configTestPath = path.join(__dirname, "../config/test.json");

const CliAdminOp = require("../../src/cli-admin-operator");

// This test assumes 'server-proof' is running locally on port 10001
// This test assumes 'operator' api-admin is running locally on port 9000
// This test assumes 'operator' api-external is running locally on port 9001

contract("Operator", (accounts) => {
    const {
        0: owner,
    } = accounts;

    // Clients
    let cliAdminOp;

    // Url
    const urlAdminOp = "http://127.0.0.1:9000";

    // Constants to move to a specific era
    const slotPerEra = 20;
    const blocksPerSlot = 100;
    const blockPerEra = slotPerEra * blocksPerSlot;

    // Operator wallet
    const passphrase = "passphrase";
    const privateKey = "426e207623fe2772c74cc3ffb2797aef4885a0c09ba53795fc58a8d4ca72a7b3";
    let walletOp;
    let walletOpEnc;

    // Contract instances
    let insRollupPoS;

    before(async () => {
        // Load test configuration
        const configTest = JSON.parse(fs.readFileSync(configTestPath));
        // Load TokenRollup
        await TokenRollup.at(configTest.tokenAddress);
        // Load Rollup
        await Rollup.at(configTest.rollupAddress);
        // Load rollup PoS
        insRollupPoS = await RollupPoS.at(configTest.posAddress);

        // Load clients
        cliAdminOp = new CliAdminOp(urlAdminOp);

        // load operator wallet with funds
        walletOp = new ethers.Wallet(privateKey);
        const initBalance = 1000;
        await web3.eth.sendTransaction({to: walletOp.address, from: owner,
            value: web3.utils.toWei(initBalance.toString(), "ether")});
        walletOpEnc = await walletOp.encrypt(passphrase);
    });

    it("Should load operator wallet", async () => {
        console.log(walletOp);
        console.log(passphrase);
        await cliAdminOp.loadWallet(walletOpEnc, passphrase);
    });

    it("Should register operator", async () => {
        const stake = 2;
        const url = "localhost";
        const seed = "rollup"; 
        console.log("REGISTER");
        await cliAdminOp.register(stake, url, seed);
    });

    it("Should move to era 2", async () => {
        const genesisBlock = Number(await insRollupPoS.genesisBlock());
        let currentBlock = await web3.eth.getBlockNumber();
        await addBlocks(genesisBlock - currentBlock + 1); // move to era 0
        await timeout(5000); // wait time to add all blocks
        await addBlocks(blockPerEra); // move to era 1
        await timeout(5000); // wait time to add all blocks
        await addBlocks(blockPerEra); // move to era 2
        await timeout(5000); // wait time to add all blocks
    });

    it("Should set pool conversion table", async () => {
        const conversion = {
            0: {
                token: "ROLL",
                price: 20,
                decimals: 18
            }
        };
        const res = await cliAdminOp.setConversion(conversion);
        console.log(res);
    });
});