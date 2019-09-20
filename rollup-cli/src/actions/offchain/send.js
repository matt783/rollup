const { BabyJubWallet } = require('../../../../rollup-utils/babyjub-wallet');
const axios = require('axios');

function send(UrlOperator, idTo, amount, BabyjubJson, password) {

    console.log({UrlOperator}, {idTo}, {amount}, {BabyjubJson}, {password});
    let walletBaby = BabyJubWallet.fromEncryptedJson(BabyjubJson, password)
  

    return new Promise (function (resolve, reject){

        axios.get (`${UrlOperator}/offchain/info/${walletBaby.publicKey.toString()}`).then(function(response){

            const transaction = {
                IdFrom: response.data.value.id,//IdFrom,
                idTo: idTo,
                amount: amount,
                nonce:response.data.value.nonce
            }
            let sign = walletBaby.signMessage(JSON.stringify(transaction));

            axios.post(`${UrlOperator}/offchain/send`,{transaction,sign}).then(function(response){
                resolve(response.status)
            }) 
            .catch(function (error) {
                reject(error);
              });

        })
        .catch(function (error) {
            reject(error);
          });
     
    })
    


}

module.exports = { send };