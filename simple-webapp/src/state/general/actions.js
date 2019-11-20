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
        dispatch(loadWalletSuccess(wallet, password));
      } catch(error) {
        dispatch(loadWalletError(error));
      }
    })
  }
}