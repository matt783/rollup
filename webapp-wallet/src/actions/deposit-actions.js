const ethers = require("ethers");
const { Wallet } = require("../utils/wallet");
const { readFile } = require("../utils/wallet-utils");

export const beforeDeposit = async (configFile, walletFile, abiFile) => {
    const config = await readFile(configFile);
    const wallet = await readFile(walletFile);
    const abi = await readFile(abiFile);
    const files = {config, wallet, abi}
    return files;
}

export const deposit = async (urlNode, addressSC, balance, tokenId, walletJson, password, abi) => {
    let walletRollup= await Wallet.fromEncryptedJson(walletJson, password);
    let walletEth = walletRollup.ethWallet.wallet;
    let walletBaby = walletRollup.babyjubWallet;

    const provider = new ethers.providers.JsonRpcProvider(urlNode);
    let pubKeyBabyjub = [walletBaby.publicKey[0].toString(), walletBaby.publicKey[1].toString()] ;

    walletEth = walletEth.connect(provider);
    let address = await walletEth.getAddress();
    let contractWithSigner = new ethers.Contract(addressSC, abi, walletEth);
    
    let overrides = {
        gasLimit: 800000,
        value: ethers.utils.parseEther("0.11"),
    };
    
    try{
        return new Promise (function (resolve){
            contractWithSigner.deposit(balance, tokenId, address, pubKeyBabyjub, overrides).then(response => {
                resolve(response);
            });
        });
    }
    catch (error) {
        console.log("error.... ", error);
    }

}
