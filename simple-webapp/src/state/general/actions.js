import * as CONSTANTS from './constants';
// import * as rollup from '../../utils/bundle-cli';
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
    console.log("LOAD")
    dispatch(loadFiles());
    return new Promise( async (resolve) => {
      try {
        console.log("LOADSUC")
        dispatch(loadFilesSuccess(config, abiRollup, abiTokens));
        console.log("LOADSUC2")
        resolve({config, abiRollup, abiTokens});
      } catch(error) {
        console.log("LOADERR")
        dispatch(loadFilesError(error));
      }
    })
  }
}