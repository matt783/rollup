const ethers = require('ethers');
const { Wallet } = require('../utils/wallet');
const { readFile } = require('../utils/wallet-utils');

export const beforeDeposit = async (configFile, walletFile, abiFile) => {
    const config = await readFile(configFile);
    const wallet = await readFile(walletFile);
    const abi = await readFile(abiFile);
    const files = { config, wallet, abi };
    return files;
};

export const deposit = async (urlNode, addressSC, balance, tokenId, walletJson, password, abi) => {
    console.log(walletJson);
    console.log(password)
    const walletRollup = await Wallet.fromEncryptedJson(walletJson, password);
    let walletEth = walletRollup.ethWallet.wallet;
    const walletBaby = walletRollup.babyjubWallet;

    const provider = new ethers.providers.JsonRpcProvider(urlNode);
    const pubKeyBabyjub = [walletBaby.publicKey[0].toString(), walletBaby.publicKey[1].toString()];

    walletEth = walletEth.connect(provider);
    const address = await walletEth.getAddress();
    const contractWithSigner = new ethers.Contract(addressSC, abi, walletEth);
    const overrides = {
        gasLimit: 800000,
        value: ethers.utils.parseEther('0.11'),
    };

    try {
        return new Promise(((resolve) => {
            console.log('DEPOSIT');
            console.log(balance);
            console.log(tokenId);
            console.log(address);
            contractWithSigner.deposit(balance, tokenId, address, pubKeyBabyjub, overrides).then((response) => {
                resolve(response);
            });
        }));
    } catch (error) {
        console.log('error.... ', error);
    }
};
