import { LOAD_FILES, LOAD_ABI, LOAD_CONFIG, LOAD_WALLET } from './types';
import * as rollup from '../utils/bundle-cli';
const { readFile } = require('../utils/wallet-utils');

export const loadFiles = (walletFile, configFile, abiFile) => async (dispatch) => {
    const wallet = await readFile(walletFile);
    const config = await readFile(configFile);
    const abiRollup = await readFile(abiFile);

    dispatch({
        type: LOAD_FILES,
        payload: { wallet, config, abiRollup },
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
export const loadConfig= (configFile) => async (dispatch) => {
    const config = await readFile(configFile);

    dispatch({
        type: LOAD_CONFIG,
        payload: config,
    });
};