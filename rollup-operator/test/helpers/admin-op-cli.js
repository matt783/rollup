/* eslint-disable no-console */
const CliAdminOp = require("../../src/cli-admin-operator");
const ethers = require("ethers");

const { argv } = require("yargs")
    .alias("o", "operator")
    .alias("s", "stake")
    .alias("pk", "privateKey")
    .alias("id", "operatorId");

const operatorUrl = (argv.operator) ? argv.operator : "nooperator";
const stake = (argv.stake) ? argv.stake : "nostake";
const operatorId = (argv.operatorId) ? argv.operatorId : "noid";
const privateKey = (argv.privateKey) ? argv.privateKey : "noprivatekey";
const passphrase = "foo";

(async () => {
    let cliAdminOp;
    try {
        if (operatorUrl === "nooperator") {
            throw new Error("No URL Operator"); 
        } else {
            cliAdminOp = new CliAdminOp(operatorUrl);
        }
        
        if (argv._[0].toUpperCase() === "REGISTER") {
            try {
                if(privateKey === "noprivatekey") {
                    throw new Error("No PK");
                } else if(stake === "nostake") {
                    throw new Error("No stake");
                } else {
                    const walletOp = new ethers.Wallet(privateKey);
                    const walletOpEnc = await walletOp.encrypt(passphrase);
                    await cliAdminOp.loadWallet(walletOpEnc, passphrase);
                    console.log("REGISTER");
                    console.log(cliAdminOp);
                    console.log(stake);
                    const url = "localhost";
                    const seed = "rollup"; 
                    await cliAdminOp.register(stake, url, seed);
                }
            } catch (e) {
                console.log(e);
            }
        }
        if (argv._[0].toUpperCase() === "UNREGISTER") {
            try {
                if(operatorId === "noid") {
                    throw new Error("No OP ID");
                } else {
                    await cliAdminOp.unregister(operatorId);
                }
            } catch (e) {
                console.log(e);
            }
        }
        if (argv._[0].toUpperCase() === "LOADWALLET") {
            try {
                if(privateKey === "noprivatekey") {
                    throw new Error("No PK");
                } else {
                    const walletOp = new ethers.Wallet(privateKey);
                    const walletOpEnc = await walletOp.encrypt(passphrase);
                    await cliAdminOp.loadWallet(walletOpEnc, passphrase);
                }
                
            } catch (e) {
                console.log(e);
            }
        }
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})();
