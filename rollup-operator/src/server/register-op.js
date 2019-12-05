const CliAdminOp = require("../cli-admin-operator");
const ethers = require("ethers");
const pathEnvironmentFile = `${__dirname}/config.env`;
require("dotenv").config({ path: pathEnvironmentFile });

const port = process.env.OPERATOR_PORT_ADMIN;
const urlAdminOp = `http://127.0.0.1:${port}`;

async function register(){
    const cliAdminOp = new CliAdminOp(urlAdminOp);

    const passphrase = process.env.PASSWORD;
    const privateKey = process.env.PRIVATE_KEY;

    const walletOp = new ethers.Wallet(privateKey);
    const walletOpEnc = await walletOp.encrypt(passphrase);

    await cliAdminOp.loadWallet(walletOpEnc, passphrase);
    const stake = process.env.STAKE;
    const url = process.env.URL_OPERATOR;
    const seed = process.env.SEED; 
    await cliAdminOp.register(stake, url, seed);
}

register();