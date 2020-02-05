/* eslint-disable no-console */
const { send } = require('./actions/offchain/send.js');
const { deposit } = require('./actions/onchain/deposit.js');
const { depositOnTop } = require('./actions/onchain//deposit-on-top');
const { withdraw } = require('./actions/onchain/withdraw.js');
const { forceWithdraw } = require('./actions/onchain/force-withdraw.js');
const { transfer } = require('./actions/onchain/transfer.js');
const { depositAndTransfer } = require('./actions/onchain/deposit-and-transfer.js');
const CliExternalOperator = require('../../rollup-operator/src/cli-external-operator');

async function sendTx(urlOperator, to, amount, wallet, passphrase, tokenId, userFee, idFrom, nonce) {
    return send(urlOperator, to, amount, wallet, passphrase, tokenId, userFee, idFrom, nonce);
}

async function depositTx(nodeEth, addressSC, loadAmount, tokenid, wallet, passphrase, ethAddress, abi, gasLimit, gasMultiplier) {
    return deposit(nodeEth, addressSC, loadAmount, tokenid, wallet, passphrase, ethAddress, abi, gasLimit, gasMultiplier);
}

async function depositOnTopTx(nodeEth, addressSC, loadAmount, tokenid, wallet, passphrase, abi, idTo, gasLimit, gasMultiplier) {
    return depositOnTop(nodeEth, addressSC, loadAmount, tokenid, wallet, passphrase, abi, idTo, gasLimit, gasMultiplier);
}

async function withdrawTx(nodeEth, addressSC, wallet, passphrase, abi, urlOperator, idFrom, numExitRoot, gasLimit, gasMultiplier) {
    return withdraw(nodeEth, addressSC, wallet, passphrase, abi, urlOperator, idFrom, numExitRoot, gasLimit, gasMultiplier);
}

async function forceWithdrawTx(nodeEth, addressSC, amount, wallet, passphrase, abi, idFrom, gasLimit, gasMultiplier) {
    return forceWithdraw(nodeEth, addressSC, amount, wallet, passphrase, abi, idFrom, gasLimit, gasMultiplier);
}

async function transferTx(nodeEth, addressSC, amount, tokenid, wallet, passphrase, abi, idFrom, idTo, gasLimit, gasMultiplier) {
    return transfer(nodeEth, addressSC, amount, tokenid, wallet, passphrase, abi, idFrom, idTo, gasLimit, gasMultiplier);
}

async function depositAndTransferTx(nodeEth, addressSC, loadAmount, amount, tokenid, wallet, passphrase, ethAddress, abi,
    toId, gasLimit, gasMultiplier) {
    return depositAndTransfer(nodeEth, addressSC, loadAmount, amount, tokenid, wallet, passphrase,
        ethAddress, abi, toId, gasLimit, gasMultiplier);
}

async function showAccounts(urlOperator, filters) {
    const apiOperator = new CliExternalOperator(urlOperator);
    return apiOperator.getAccounts(filters);
}

async function showExitsBatch(urlOperator, id) {
    const apiOperator = new CliExternalOperator(urlOperator);
    return apiOperator.getExits(id);
}

async function checkNonce(urlOperator, currentBatch, nonceObject, idFrom) {
    const batch = nonceObject.filter((x) => x.batch === currentBatch);
    let nonce;
    if (batch.length > 0) {
        const nonceList = batch.map((x) => x.nonce);
        nonce = Math.max(...nonceList);
    } else {
        const apiOperator = new CliExternalOperator(urlOperator);
        const responseLeaf = await apiOperator.getAccountByIdx(idFrom);
        nonce = responseLeaf.data.nonce;
    }
    const infoTx = { currentBatch, nonce };
    return infoTx;
}

async function addNonce(nonceObject, currentBatch, nonce) {
    const batch = nonceObject.filter((x) => x.batch === currentBatch);
    const newNonce = nonce + 1;
    if (batch.length > 0) {
        batch.push({ batch: currentBatch, nonce: newNonce });
    } else {
        batch.splice(0, batch.length);
        batch.push({ batch: currentBatch, nonce: newNonce });
    }
    return nonceObject;
}

module.exports = {
    sendTx,
    depositTx,
    depositOnTopTx,
    withdrawTx,
    forceWithdrawTx,
    showAccounts,
    transferTx,
    depositAndTransferTx,
    showExitsBatch,
    checkNonce,
    addNonce,
};
