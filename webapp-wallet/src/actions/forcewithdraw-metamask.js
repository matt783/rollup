const ethers = require('ethers');

export const forceWithdraw = async (urlNode, addressSC, balance, walletJson, password, abi, idFrom, web3, account) => {
    console.log(account);
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