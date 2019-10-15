/*const axios = require("axios");
const { Wallet } = require("../utils/wallet");
const ethers = require("ethers");

// forceWithdraw
export const forceWithdraw = async (urlNode, addressSC, balance, tokenId, walletJson, password, abi, UrlOperator) => {

  let walletRollup= await Wallet.fromEncryptedJson(walletJson, password);
  let walletEth = walletRollup.ethWallet.wallet;
  let walletBaby = walletRollup.babyjubWallet;

  const provider = new ethers.providers.JsonRpcProvider(urlNode);
  let pubKeyBabyjub = [walletBaby.publicKey[0].toString(), walletBaby.publicKey[1].toString()] ;

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
              let receipt = await contractWithSigner.forceWithdraw(coorectLeaf.id, balance, pubKeyBabyjub, overrides);
              resolve(receipt);
          })
              .catch(function (error) {
                  reject(error);
              });
      });
  }
  catch (error) {
      console.log("error.... ", error);
  }
}
// forgeBlock


// withdraw
export const withdraw = async (urlNode, addressSC, balance, tokenId, walletJson, password, abi, UrlOperator) => {

  let walletRollup= await Wallet.fromEncryptedJson(walletJson, password);
  let walletEth = walletRollup.ethWallet.wallet;
  let walletBaby = walletRollup.babyjubWallet;

  const provider = new ethers.providers.JsonRpcProvider(urlNode);
  let pubKeyBabyjub = [walletBaby.publicKey[0].toString(), walletBaby.publicKey[1].toString()] ;

  walletEth = walletEth.connect(provider);
  let contractWithSigner = new ethers.Contract(addressSC, abi, walletEth);

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
              let receipt = await contractWithSigner.withdraw(coorectLeaf.id, balance, tokenId, coorectLeaf.exitRoot,
                  coorectLeaf.nonce, pubKeyBabyjub, coorectLeaf.sibilings);
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
}*/