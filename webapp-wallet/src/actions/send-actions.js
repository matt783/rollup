const axios = require('axios');
const { Wallet } = require('../utils/wallet');
const { readFile } = require('../utils/wallet-utils');

export const beforeSend = async (configFile, walletFile) => {
    const config = await readFile(configFile);
    const wallet = await readFile(walletFile);
    const files = { config, wallet };
    return files;
};

export const send = async (UrlOperator, idTo, amount, walletJson, password, tokenId, userFee) => {
    const walletRollup = await Wallet.fromEncryptedJson(walletJson, password);
    const walletBaby = walletRollup.babyjubWallet;

    return new Promise(((resolve, reject) => {
        axios.get(`${UrlOperator}/offchain/info/${walletBaby.publicKey[0].toString()}/${walletBaby.publicKey[1].toString()}`).then((response) => {
            let coorectLeaf = [];
            for (const leaf of response.data) {
                if (leaf.tokenId === tokenId) {
                    coorectLeaf = leaf;
                }
            }
            if (coorectLeaf === []) {
                reject("There're no leafs with this wallet (babyjub) and this tokenID");
            }
            const transaction = {
                fromIdx: coorectLeaf.id,
                toIdx: idTo,
                coin: tokenId,
                amount,
                nonce: coorectLeaf.nonce,
                userFee,
                rqOffset: 0,
                onChain: 0,
                newAccount: 0,
            };

            walletRollup.signRollupTx(transaction); // sign included in transaction
            const parsetransaction = JSON.parse(JSON.stringify({ transaction }, (key, value) =>// convert bigint to Strings
                (typeof value === 'bigint'
                    ? value.toString()
                    : value), // return everything else unchanged
            ));
            console.log('SEND');
            axios.post(`${UrlOperator}/offchain/send`, parsetransaction).then((response) => {
                resolve(response.status);
            })
                .catch((error) => {
                    reject(error);
                });
        })
            .catch((error) => {
                reject(error);
            });
    }));
};
