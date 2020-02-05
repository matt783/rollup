/* eslint-disable no-restricted-syntax */
const { stringifyBigInts } = require('snarkjs');
const { Wallet } = require('../../wallet.js');
const { checkNonce } = require('../../cli-utils');
const CliExternalOperator = require('../../../../rollup-operator/src/cli-external-operator');

/**
 * @dev sends off-chain transaction
 * @param urlOperator url from operator
 * @param idTo receiver
 * @param amount initial balance on balance tree
 * @param walletJson from this one can obtain the ethAddress and babyPubKey
 * @param password for decrypt the Wallet
 * @param tokenId token type identifier, the sender and the reciever must use the same token
 * @param userFee amount of fee that the user is willing to pay
 * @param idFrom Self balance tree identifier
*/
async function send(urlOperator, idTo, amount, walletJson, password, tokenId, userFee, idFrom, nonce, nonceObject) {
    const apiOperator = new CliExternalOperator(urlOperator);
    const walletRollup = await Wallet.fromEncryptedJson(walletJson, password);

    const responseLeaf = await apiOperator.getAccountByIdx(idFrom);
    const generalInfo = await apiOperator.getGeneralInfo();
    const currentBatch = generalInfo.rollupSynch.lastBatchSynched;
    let nonceToSend;
    if (nonce !== undefined) nonceToSend = nonce;
    else if (nonceObject !== undefined) nonceToSend = checkNonce(urlOperator, currentBatch, nonceObject, idFrom);
    else nonceToSend = responseLeaf.data.nonce;

    const tx = {
        fromIdx: responseLeaf.data.idx,
        toIdx: idTo,
        coin: tokenId,
        amount,
        nonce: nonceToSend,
        userFee,
        rqOffset: 0,
        onChain: 0,
        newAccount: 0,
    };

    walletRollup.signRollupTx(tx); // sign included in transaction
    const parseTx = stringifyBigInts(tx);// convert bigint to Strings

    const resTx = await apiOperator.sendTx(parseTx);
    const res = {
        status: resTx.status,
        currentBatch,
        nonce: nonceToSend,
    };
    return res;
}

module.exports = { send };
