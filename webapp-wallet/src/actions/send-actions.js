const axios = require("axios");
const { Wallet } = require("../utils/wallet");
const { readFile } = require("../utils/wallet-utils");

export const beforeSend = async (configFile, walletFile) => {
    const config = await readFile(configFile);
    const wallet = await readFile(walletFile);
    const files = {config, wallet}
    return files;
}

export const send = async (UrlOperator, idTo, amount, walletJson, password, tokenId, userFee) => {

    let walletRollup = await Wallet.fromEncryptedJson(walletJson, password);
    let walletBaby = walletRollup.babyjubWallet;

    return new Promise (function (resolve, reject){

        axios.get (`${UrlOperator}/offchain/info/${walletBaby.publicKey[0].toString()}/${walletBaby.publicKey[1].toString()}`).then(function(response){
            let coorectLeaf = [];
            for ( let leaf of response.data){
                if (leaf.tokenId === tokenId){
                    coorectLeaf = leaf;
                }
            }
            if (coorectLeaf === []){
                reject("There're no leafs with this wallet (babyjub) and this tokenID");
            }
            const transaction = {
                fromIdx: coorectLeaf.id,
                toIdx: idTo,
                coin: tokenId,
                amount: amount,
                nonce: coorectLeaf.nonce,
                userFee: userFee,
                rqOffset: 0,
                onChain: 0,
                newAccount:0
            };

            walletRollup.signRollupTx(transaction); //sign included in transaction
            let parsetransaction = JSON.parse(JSON.stringify({transaction}, (key, value) =>//convert bigint to Strings
                typeof value === "bigint"
                    ? value.toString()
                    : value // return everything else unchanged
            ));
            console.log("SEND");
            axios.post(`${UrlOperator}/offchain/send`,parsetransaction).then(function(response){
                resolve(response.status);
            }) 
                .catch(function (error) {
                    reject(error);
                });

        })
            .catch(function (error) {
                reject(error);
            });
     
    });
    


}
