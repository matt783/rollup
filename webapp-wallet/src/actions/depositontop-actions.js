const ethers = require("ethers");
const { Wallet } = require("../utils/wallet");
const { readFile } = require("../utils/wallet-utils");
const axios = require("axios");

export const beforeDepositOnTop = async (configFile, walletFile, abiFile) => {
    const config = await readFile(configFile);
    const wallet = await readFile(walletFile);
    const abi = await readFile(abiFile);
    const files = {config, wallet, abi}
    return files;
}

export const depositOnTop = async (urlNode, addressSC, balance, tokenId, walletJson, password, abi, UrlOperator) => {
    
    let walletRollup = await Wallet.fromEncryptedJson(walletJson, password);
    let walletEth = walletRollup.ethWallet.wallet;
    let walletBaby = walletRollup.babyjubWallet;

    const provider = new ethers.providers.JsonRpcProvider(urlNode);
    

    walletEth = walletEth.connect(provider);
    let contractWithSigner = new ethers.Contract(addressSC, abi, walletEth);
    
    let overrides = {
        gasLimit: 800000,
        value: ethers.utils.parseEther("1.0"),
    };
   

    try{
        return new Promise ( function (resolve, reject){

            axios.get (`${UrlOperator}/offchain/info/${walletBaby.publicKey[0].toString()}/${walletBaby.publicKey[1].toString()}`).then(async function(response){

                let coorectLeaf = [];
                for ( let leaf of response.data){
                    if (leaf.tokenId === tokenId){
                        coorectLeaf = leaf;
                    }
                }
          
                if (coorectLeaf === []){
                    reject("There're no leafs with this wallet (babyjub) and this tokenID");
                }
            
                let receipt = await contractWithSigner.depositOnTop(coorectLeaf.id, balance, tokenId, overrides);//response.data.value.nonce,
                resolve(receipt);
            })
                .catch(function (error) {
                    reject(error);
                });
     
        });

    }
    catch (error) {
        console.log("error.... ", error); //fires as the contract reverted the payment
    }
}
