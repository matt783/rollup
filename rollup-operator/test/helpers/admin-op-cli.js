/* eslint-disable no-console */
const CliAdminOp = require("../../src/cli-admin-operator");
const ethers = require("ethers");

const { argv } = require("yargs")
    .alias("o", "operator")
    .alias("s", "stake")
    .alias("pk", "privateKey")
    .alias("id", "operatorid");

const operatorUrl = (argv.operator) ? argv.operator : "nooperator";
const stake = (argv.stake) ? argv.stake : "nostake";
const operatorid = (argv.operatorid) ? argv.operatorid : "noid";
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
                    console.log(walletOp);
                    const walletOpEnc = await walletOp.encrypt(passphrase);
                    await cliAdminOp.loadWallet(walletOpEnc, passphrase);
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
                if(operatorid === "noid") {
                    console.log(operatorid);
                    throw new Error("No OP ID");
                } else if (privateKey === "noprivatekey") {
                    throw new Error("No PK");
                }else {
                    const walletOp = new ethers.Wallet(privateKey);
                    console.log(walletOp);
                    const walletOpEnc = await walletOp.encrypt(passphrase);
                    await cliAdminOp.loadWallet(walletOpEnc, passphrase);
                    await cliAdminOp.unregister(operatorid);
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
