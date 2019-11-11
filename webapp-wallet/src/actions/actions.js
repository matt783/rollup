import { LOAD_FILES, LOAD_ABI, LOAD_CONFIG, LOAD_WALLET, LOAD_WEB3 } from './types';
// import * as rollup from '../utils/bundle-cli';
const { readFile } = require('../utils/wallet-utils');
const Web3 = require('web3');

export const getApp = () => async dispatch => {

    if (window.ethereum) {
        window.ethereum.enable();
    }
    const web3 = new Web3(window.web3.currentProvider);

    dispatch({
        type: LOAD_WEB3,
        payload: web3,
    })
}

export const loadFiles = (walletFile, configFile, abiFile, abiTokensFile) => async (dispatch) => {
    const wallet = await readFile(walletFile);
    const config = await readFile(configFile);
    const abiRollup = await readFile(abiFile);
    const abiTokens = await readFile(abiTokensFile);
    dispatch({
        type: LOAD_FILES,
        payload: { wallet, config, abiRollup, abiTokens },
    });
};

export const loadWallet = (walletFile) => async (dispatch) => {
    const wallet = await readFile(walletFile);

    dispatch({
        type: LOAD_WALLET,
        payload: wallet,
    });
};
export const loadRollupAbi = (abiFile) => async (dispatch) => {
    const abiRollup = await readFile(abiFile);
    dispatch({
        type: LOAD_ABI,
        payload: abiRollup,
    });
};
export const loadConfig = (configFile) => async (dispatch) => {
    const config = await readFile(configFile);

    dispatch({
        type: LOAD_CONFIG,
        payload: config,
    });
};