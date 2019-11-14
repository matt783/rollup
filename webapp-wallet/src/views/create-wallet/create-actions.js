import * as rollup from '../../utils/rollup-cli';
const FileSaver = require('file-saver');
const { readFile } = require('../../utils/wallet-utils');

export const createRandomWallet = async (passString, newWalletName) => {
    const wallet = await rollup.wallet.Wallet.createRandom();
    const encWallet = await wallet.toEncryptedJson(passString);
    const blob = new Blob([JSON.stringify(encWallet)], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, newWalletName);
};

export const createWalletfromMnemonic = async (passString, newWalletName, mnemonic) => {
    const wallet = await rollup.wallet.Wallet.fromMnemonic(mnemonic);
    const encWallet = await wallet.toEncryptedJson(passString);
    const blob = new Blob([JSON.stringify(encWallet)], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, newWalletName);
};

export const createWalletfromJson = async (passString, newWalletName, passwordImport, walletFile) => {
    const walletImport = await readFile(walletFile);
    const wallet = await rollup.wallet.Wallet.fromEncryptedJson(walletImport, passwordImport);
    const encWallet = await wallet.toEncryptedJson(passString);
    const blob = new Blob([JSON.stringify(encWallet)], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, newWalletName);
};
