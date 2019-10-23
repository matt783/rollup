import { LOAD_FILES } from './types';

const { readFile } = require("../utils/wallet-utils");

export const loadFiles = (walletFile, configFile, abiFile) => async dispatch => {
  const wallet = await readFile(walletFile);
  const config = await readFile(configFile);
  const rollupabi = await readFile(abiFile);

  dispatch({
    type: LOAD_FILES,
    payload:{ wallet, config, rollupabi}
  })
}

