import * as CONSTANTS from './constants';
const Web3 = require('web3');

function loadWeb3() {
  return {
    type: CONSTANTS.WEB3_LOAD,
  };
}

function loadWeb3Success(data) {
  return {
    type: CONSTANTS.WEB3_LOAD_SUCCESS,
    payload: data,
    error: '',
  };
}

function loadWeb3Error(error) {
  return {
    type: CONSTANTS.WEB3_LOAD_ERROR,
    error,
  }
}

export function handleWeb3Load() {
  return function(dispatch) {
    dispatch(loadWeb3());
    return new Promise((resolve) => {
      try {
        if (window.ethereum) {
          window.ethereum.enable();
        }
        const web3 = new Web3(window.web3.currentProvider);
        dispatch(loadWeb3Success(web3));
        resolve(web3);

      } catch(error) {
        dispatch(loadWeb3Error(error.message));
        resolve(error.message)
      }
    })
  }
}

function loadFiles() {
  return {
    type: CONSTANTS.LOAD_FILES,
  };
}

function loadFilesSuccess(wallet, config, abiRollup, abiTokens) {
  return {
    type: CONSTANTS.LOAD_FILES_SUCCESS,
    payload: { wallet, config, abiRollup, abiTokens },
    error: '',
  }
}

function loadFilesError(error) {
  return {
    type: CONSTANTS.LOAD_FILES_ERROR,
    error,
  }
}

export function handleLoadFiles(wallet, config, abiRollup, abiTokens) {
  return function(dispatch) {
    dispatch(loadFiles());
    return new Promise( async (resolve) => {
      try {
        localStorage.setItem('wallet', JSON.stringify(wallet));
        localStorage.setItem('config', JSON.stringify(config));
        localStorage.setItem('abiRollup', JSON.stringify(abiRollup));
        localStorage.setItem('abiTokens', JSON.stringify(abiTokens));
        dispatch(loadFilesSuccess(wallet, config, abiRollup, abiTokens));
        resolve({wallet, config, abiRollup, abiTokens});
      } catch(error) {
        dispatch(loadFilesError(error));
      }
    })
  }
}