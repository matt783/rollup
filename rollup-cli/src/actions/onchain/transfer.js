/* eslint-disable no-restricted-syntax */
const ethers = require('ethers');
const { fix2float } = require('../../../../js/utils');
const { Wallet } = require('../../wallet.js');
/**
 * @dev deposit on an existing balance tree leaf
 * @param nodeEth URL of the ethereum node
 * @param addressSC rollup address
 * @param amount initial balance on balance tree
 * @param tokenId token type identifier
 * @param walletJson from this one can obtain the ethAddress and babyPubKey
 * @param passphrase for decrypt the Wallet
 * @param abi abi of rollup contract
 * @param UrlOperator URl from operator
*/
async function transfer(nodeEth, addressSC, amount, tokenId, walletJson, passphrase, abi, fromId, toId, gasLimit = 5000000, gasMultiplier = 1) {
    const walletRollup = await Wallet.fromEncryptedJson(walletJson, passphrase);
    let walletEth = walletRollup.ethWallet.wallet;
    const provider = new ethers.providers.JsonRpcProvider(nodeEth);
    walletEth = walletEth.connect(provider);
    const contractWithSigner = new ethers.Contract(addressSC, abi, walletEth);
    const fee_onchain_tx = await contractWithSigner.FEE_ONCHAIN_TX();
    const overrides = {
        gasLimit: gasLimit,
        gasPrice: await _getGasPrice(gasMultiplier, provider),
        value: fee_onchain_tx
    };

    const amountF = fix2float(amount);
    try {
        return contractWithSigner.transfer(fromId, toId, amountF, tokenId, overrides);
    } catch (error) {
        throw new Error(`Message error: ${error.message}`);
    }
}

async function _getGasPrice(multiplier, provider){
    const strAvgGas = await provider.getGasPrice();
    const avgGas = BigInt(strAvgGas);
    const res = (avgGas * BigInt(multiplier))
    return await ethers.utils.bigNumberify(res.toString());
}

module.exports = {
    transfer,
};
