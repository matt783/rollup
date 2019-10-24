
// const axios = require("axios");
// const address = "http://127.0.0.1:9000"
const FileSaver = require('file-saver');
const { Wallet } = require('../utils/wallet');
const { readFile } = require('../utils/wallet-utils');

export const createRandomWallet = async (passString, newWalletName) => {
    const wallet = await Wallet.createRandom();
    const encWallet = await wallet.toEncryptedJson(passString);
    const blob = new Blob([JSON.stringify(encWallet)], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, newWalletName);
};

export const createWalletfromMnemonic = async (passString, newWalletName, mnemonic) => {
    const wallet = await Wallet.fromMnemonic(mnemonic);
    const encWallet = await wallet.toEncryptedJson(passString);
    const blob = new Blob([JSON.stringify(encWallet)], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, newWalletName);
};

export const createWalletfromJson = async (passString, newWalletName, passwordImport, walletFile) => {
    const walletImport = await readFile(walletFile);
    const wallet = await Wallet.fromEncryptedJson(walletImport, passwordImport);
    const encWallet = await wallet.toEncryptedJson(passString);
    const blob = new Blob([JSON.stringify(encWallet)], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, newWalletName);
};
