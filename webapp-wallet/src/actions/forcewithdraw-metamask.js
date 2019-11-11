const ethers = require('ethers');

export const forceWithdraw = async (urlNode, addressSC, balance, walletJson, password, abi, idFrom, web3, account) => {

    const contractWithSigner = new web3.eth.Contract(abi, addressSC);
    const overrides = {
        from: account,
        gasLimit: 800000,
        value: ethers.utils.parseEther('0.11'),
    };

    try {
        return await contractWithSigner.methods.forceWithdraw(idFrom, balance).send(overrides);
    } catch (error) {
        throw new Error(`Message error: ${error.message}`);
    }
};

export const approve = async (addressTokens, abiTokens, web3, addressRollup, amountToken, account) => {
    const contractTokensBot = new web3.eth.Contract(abiTokens, addressTokens);
    await contractTokensBot.methods.approve(addressRollup, amountToken).send({from: account});// config.Json address of rollupSC
}