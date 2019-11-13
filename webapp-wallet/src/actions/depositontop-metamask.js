// import * as rollup from '../utils/bundle-cli';
const ethers = require('ethers');

export const depositOnTop = async (urlNode, addressSC, balance, tokenId, walletJson, password, abi, idTo, web3, account) => {
    const contractWithSigner = new web3.eth.Contract(abi, addressSC);

    const overrides = {
        from: account,
        gasLimit: 800000,
        value: ethers.utils.parseEther('1.0'),
    };
    try {
        return await contractWithSigner.methods.depositOnTop(idTo, balance, tokenId).send(overrides);
    } catch (error) {
        throw new Error(`Message error: ${error.message}`);
    }
};

export const approve = async (addressTokens, abiTokens, web3, addressRollup, amountToken, account) => {
    const contractTokensBot = new web3.eth.Contract(abiTokens, addressTokens);
    await contractTokensBot.methods.approve(addressRollup, amountToken).send({from: account});
}
