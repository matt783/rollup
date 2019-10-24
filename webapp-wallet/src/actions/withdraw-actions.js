const axios = require('axios');
const ethers = require('ethers');
const { Wallet } = require('../utils/wallet');
const { readFile } = require('../utils/wallet-utils');

export const beforeWithdraw = async (configFile, walletFile, abiFile) => {
    const config = await readFile(configFile);
    const wallet = await readFile(walletFile);
    const abi = await readFile(abiFile);
    const files = { config, wallet, abi };
    return files;
};

export const withdraw = async (urlNode, addressSC, balance, tokenId, walletJson, password, abi, UrlOperator) => {
    const walletRollup = await Wallet.fromEncryptedJson(walletJson, password);
    let walletEth = walletRollup.ethWallet.wallet;
    const walletBaby = walletRollup.babyjubWallet;

    const provider = new ethers.providers.JsonRpcProvider(urlNode);
    const pubKeyBabyjub = [walletBaby.publicKey[0].toString(), walletBaby.publicKey[1].toString()];

    walletEth = walletEth.connect(provider);
    const contractWithSigner = new ethers.Contract(addressSC, abi, walletEth);

    try {
        return new Promise(((resolve, reject) => {
            axios.get(`${UrlOperator}/offchain/info/${walletBaby.publicKey[0].toString()}/${walletBaby.publicKey[1].toString()}`).then(async (response) => {
                let coorectLeaf = [];
                for (const leaf of response.data) {
                    if (leaf.tokenId === tokenId) {
                        coorectLeaf = leaf;
                    }
                }
                if (coorectLeaf === []) {
                    reject("There're no leafs with this wallet (babyjub) and this tokenID");
                }
                console.log('WITHDRAW');
                const receipt = await contractWithSigner.withdraw(coorectLeaf.id, balance, tokenId, coorectLeaf.exitRoot,
                    coorectLeaf.nonce, pubKeyBabyjub, coorectLeaf.sibilings);
                resolve(receipt);
            })
                .catch((error) => {
                    reject(error);
                });
        }));
    } catch (error) {
        console.log('error.... ', error); // fires as the contract reverted the payment
    }
};
