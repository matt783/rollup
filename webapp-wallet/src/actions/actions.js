import { LOAD_FILES } from './types';
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

