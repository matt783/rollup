import * as rollup from '../utils/bundle-cli';
const ethers = require('ethers');

export const deposit = async (urlNode, addressSC, balance, tokenId, walletJson, password, abi, web3, account) => {
    const walletRollup = await rollup.wallet.Wallet.fromEncryptedJson(walletJson, password);

    const walletEth = walletRollup.ethWallet.wallet;
    const address = await walletEth.address;
    const walletBaby = walletRollup.babyjubWallet;

    const pubKeyBabyjub = [walletBaby.publicKey[0].toString(), walletBaby.publicKey[1].toString()];
    const contractWithSigner = new web3.eth.Contract(abi, addressSC);

    const overrides = {
        from: account,
        gasLimit: 800000,
        value: ethers.utils.parseEther('0.11'),
    };

    try {
        return new Promise(((resolve) => {
            contractWithSigner.methods.deposit(balance, tokenId, address, pubKeyBabyjub)
            .send(overrides)
            .then((response) => {
                resolve(response);
            });
        }));
    } catch (error) {
        console.log('error.... ', error);
    }
};

export const approve = async (addressTokens, abiTokens, web3, addressRollup, amountToken, account) => {
    const contractTokensBot = new web3.eth.Contract(abiTokens, addressTokens);
    await contractTokensBot.methods.approve(addressRollup, amountToken).send({from: account});// config.Json address of rollupSC
}