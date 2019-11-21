import * as CONSTANTS from './constants';
import * as rollup from '../../utils/bundle-cli';
const { readFile } = require('../../utils/utils');

function loadWallet() {
  return {
    type: CONSTANTS.LOAD_WALLET,
  };
}

function loadWalletSuccess(wallet, password) {
  return {
    type: CONSTANTS.LOAD_WALLET_SUCCESS,
    payload: { wallet, password },
    error: '',
  }
}

function loadWalletError(error) {
  return {
    type: CONSTANTS.LOAD_WALLET_ERROR,
    error,
  }
}

export function handleLoadWallet(walletFile, password) {
  return function(dispatch) {
    dispatch(loadWallet());
    return new Promise( async () => {
      try {
        const wallet = await readFile(walletFile);
        await rollup.wallet.Wallet.fromEncryptedJson(wallet, password);
        dispatch(loadWalletSuccess(wallet, password));
      } catch(error) {
        dispatch(loadWalletError(error));
      }
    })
  }
}

function loadFiles() {
  return {
    type: CONSTANTS.LOAD_FILES,
  };
}

function loadFilesSuccess(config, abiRollup, abiTokens) {
  return {
    type: CONSTANTS.LOAD_FILES_SUCCESS,
    payload: { config, abiRollup, abiTokens },
    error: '',
  }
}

function loadFilesError(error) {
  return {
    type: CONSTANTS.LOAD_FILES_ERROR,
    error,
  }
}

export function handleLoadFiles(config, abiRollup, abiTokens) {
  return function(dispatch) {
    dispatch(loadFiles());
    return new Promise( async (resolve) => {
      try {
        dispatch(loadFilesSuccess(config, abiRollup, abiTokens));
        resolve({config, abiRollup, abiTokens});
      } catch(error) {
        dispatch(loadFilesError(error));
      }
    })
  }
}