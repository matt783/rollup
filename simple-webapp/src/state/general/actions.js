import * as CONSTANTS from './constants';
import * as rollup from '../../utils/bundle-cli';
import * as operator from '../../utils/bundle-op';
const { readFile } = require('../../utils/utils');
const ethers = require('ethers');

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

export function resetWallet() {
  return function(dispatch) {
    return new Promise( async () => {
      try {
        dispatch(loadWalletSuccess('',''));
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

function loadFilesSuccess(config, abiRollup, abiTokens, walletFunder) {
  return {
    type: CONSTANTS.LOAD_FILES_SUCCESS,
    payload: { config, abiRollup, abiTokens, walletFunder },
    error: '',
  }
}

function loadFilesError(error) {
  return {
    type: CONSTANTS.LOAD_FILES_ERROR,
    error,
  }
}

export function handleLoadFiles(config, abiRollup, abiTokens, walletFunder) {
  return function(dispatch) {
    dispatch(loadFiles());
    return new Promise( async (resolve) => {
      try {
        dispatch(loadFilesSuccess(config, abiRollup, abiTokens, walletFunder));
        resolve({config, abiRollup, abiTokens});
      } catch(error) {
        dispatch(loadFilesError(error));
      }
    })
  }
}

function loadOperator() {
  return {
    type: CONSTANTS.LOAD_OPERATOR,
  };
}

function loadOperatorSuccess(apiOperator) {
  return {
    type: CONSTANTS.LOAD_OPERATOR_SUCCESS,
    payload: apiOperator,
    error: '',
  }
}

function loadOperatorError(error) {
  return {
    type: CONSTANTS.LOAD_OPERATOR_ERROR,
    error,
  }
}

export function handleLoadOperator(config) {
  return function(dispatch) {
    dispatch(loadOperator())
    return new Promise( async (resolve) => {
      try{
        const apiOperator = new operator.cliExternalOperator(config.operator);
        dispatch(loadOperatorSuccess(apiOperator));
      } catch(error) {
        console.log(error)
        dispatch(loadOperatorError(error))
      }
    })
  }
}


function infoAccount() {
  return {
    type: CONSTANTS.INFO_ACCOUNT,
  };
}

function infoAccountSuccess(balance, tokens, tokensR, txs) {
  return {
    type: CONSTANTS.INFO_ACCOUNT_SUCCESS,
    payload: {balance, tokens, tokensR, txs},
    error: '',
  }
}

function infoAccountError(error) {
  return {
    type: CONSTANTS.INFO_ACCOUNT_ERROR,
    error,
  }
}

export function handleInfoAccount(node, walletFunder, addressTokens, abiTokens, encWallet, password, operatorUrl) {
  return function(dispatch) {
    dispatch(infoAccount())
    return new Promise( async (resolve) => {
      try{
        const provider = new ethers.providers.JsonRpcProvider(node);
        const wallet = await rollup.wallet.Wallet.fromEncryptedJson(encWallet, password);
        let walletEth = new ethers.Wallet(wallet.ethWallet.privateKey)
        walletEth = walletEth.connect(provider);
        const balanceHex = await walletEth.getBalance();
        const balance = ethers.utils.formatEther(balanceHex);
        let walletEthFunder = new ethers.Wallet(walletFunder.signingKey.privateKey);
        walletEthFunder = walletEthFunder.connect(provider);
        const contractTokensFunder = new ethers.Contract(addressTokens, abiTokens, walletEthFunder);
        const tokensHex = await contractTokensFunder.balanceOf(encWallet.ethWallet.address);
        const tokens = parseInt(tokensHex._hex, 16);
        const apiOperator = new operator.cliExternalOperator(operatorUrl);
        const filters = {
          ethAddr: `0x${encWallet.ethWallet.address}`
        }
        let tokensR = 0;
        let txs = [];
        try {
          const allTxs = await apiOperator.getAccounts(filters);
          const initTx = allTxs.data[0].idx;
          const numTx = allTxs.data[allTxs.data.length-1].idx;
          for(let i = initTx; i <= numTx; i++){
            if(allTxs.data.find(tx => tx.idx === i) !== undefined){
              txs.push(allTxs.data.find(tx => tx.idx === i));
              tokensR = tokensR + parseInt(allTxs.data.find(tx => tx.idx === i).amount);
            }
          }
        } catch(err) {
          tokensR = 0;
        }
        dispatch(infoAccountSuccess(balance, tokens, tokensR, txs));
      } catch(error) {
        console.log(error)
        dispatch(infoAccountError(error))
      }
    })
  }
}
