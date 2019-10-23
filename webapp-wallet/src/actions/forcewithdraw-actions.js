const axios = require("axios");
const { Wallet } = require("../utils/wallet");
const { readFile } = require("../utils/wallet-utils");
const ethers = require("ethers");

export const beforeForceWithdraw = async (configFile, walletFile, abiFile) => {
    const config = await readFile(configFile);
    const wallet = await readFile(walletFile);
    const abi = await readFile(abiFile);
    const files = {config, wallet, abi}
    return files;
}

export const forceWithdraw = async (urlNode, addressSC, balance, tokenId, walletJson, password, abi, UrlOperator) => {
    const walletRollup = await Wallet.fromEncryptedJson(walletJson, password);
    let walletEth = walletRollup.ethWallet.wallet;
    const walletBaby = walletRollup.babyjubWallet;
    const provider = new ethers.providers.JsonRpcProvider(urlNode);
    walletEth = walletEth.connect(provider);
    const contractWithSigner = new ethers.Contract(addressSC, abi, walletEth);
    const overrides = {
        gasLimit: 800000,
        value: ethers.utils.parseEther('0.11'), // 0.1 minimum fee for onchian Tx
    };

    try {
        return new Promise(((resolve, reject) => {
            axios.get(`${UrlOperator}/offchain/info/${walletBaby.publicKey[0].toString()}/${walletBaby.publicKey[1].toString()}`)
                .then(async (response) => {
                    let correctLeaf = [];
                    for (const leaf of response.data) {
                        if (leaf.tokenId === tokenId) {
                            correctLeaf = leaf;
                        }
                    }
                    if (correctLeaf === []) {
                        reject(new Error("There're no leafs with this wallet (babyjub) and this tokenID"));
                    }
                    console.log("FORCE");
                    const receipt = await contractWithSigner.forceWithdraw(correctLeaf.id, balance, overrides);
                    resolve(receipt);
                })
                .catch((error) => {
                    reject(error);
                });
        }));
    } catch (error) {
        return ('error.... ', error);
    }
}