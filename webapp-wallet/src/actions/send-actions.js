import * as rollup from '../utils/bundle-cli';
import * as operator from '../utils/bundle-op';

const { stringifyBigInts } = require('snarkjs');
const CliExternalOperator = require('../../../../rollup-operator/src/cli-external-operator');

export const send = async (urlOperator, idTo, amount, walletJson, password, tokenId, userFee, idFrom) => {

    const apiOperator = new operator.cliExternalOperator.CliExternalOperator(urlOperator);
    const walletRollup = await rollup.wallet.Wallet.fromEncryptedJson(walletJson, password);

    const responseLeaf = await apiOperator.getInfoByIdx(idFrom);
    const tx = {
        fromIdx: responseLeaf.data.idx,
        toIdx: idTo,
        coin: tokenId,
        amount,
        nonce: responseLeaf.data.nonce,
        userFee,
        rqOffset: 0,
        onChain: 0,
        newAccount: 0,
    };

    walletRollup.signRollupTx(tx); // sign included in transaction
    const parseTx = stringifyBigInts(tx);// convert bigint to Strings

    const res = await apiOperator.sendOffChainTx(parseTx);
    return res.status;
}