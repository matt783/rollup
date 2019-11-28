import * as CONSTANTS from './constants';
import * as rollup from '../../utils/bundle-cli';
import * as operator from '../../utils/bundle-op';
const ethers = require('ethers');

function sendDeposit() {
  return {
    type: CONSTANTS.SEND_DEPOSIT,
  };
}

function sendDepositSuccess(res) {
  return {
    type: CONSTANTS.SEND_DEPOSIT_SUCCESS,
    payload: res,
    error: '',
  };
}

function sendDepositError(error) {
  return {
    type: CONSTANTS.SEND_DEPOSIT_ERROR,
    error,
  }
}

export function handleSendDeposit(nodeEth, addressSC, amount, tokenId, wallet, password, ethAddress, abiRollup) {
  return function(dispatch) {
    dispatch(sendDeposit());
    return new Promise(async (resolve) => {
      try {
        const res = await rollup.onchain.deposit.deposit(nodeEth, addressSC, amount, tokenId, wallet, password, ethAddress, abiRollup);
        resolve(res);
        dispatch(sendDepositSuccess(res));
      } catch(error) {
        resolve(error.message)
        dispatch(sendDepositError(error.message));
      }
    })
  }
}


function getNumExitRoot() {
  return {
    type: CONSTANTS.GET_EXIT_ROOT,
  };
}

function getNumExitRootSuccess(res) {
  return {
    type: CONSTANTS.GET_EXIT_ROOT_SUCCESS,
    payload: res,
    error: '',
  };
}

function getNumExitRootError(error) {
  return {
    type: CONSTANTS.GET_EXIT_ROOT_ERROR,
    error,
  }
}

export function handleGetExitRoot(urlOperator, id) {
  return function(dispatch) {
    dispatch(getNumExitRoot());
    return new Promise(async (resolve) => {
      try {
        const apiOperator = new operator.cliExternalOperator(urlOperator);
        const res = await apiOperator.getExits(id);
        const infoExits = [];
        res.data.map(async (key, index) => {
          const info = await apiOperator.getExitInfo(id, key);
          const amount = info.data.state.amount;
          infoExits.push({key: index, value: key, amount, text: `Num: ${key} Amount: ${amount}`});
        })
        resolve(infoExits);
        dispatch(getNumExitRootSuccess(infoExits));
      } catch(err) {
        resolve(err);
        dispatch(getNumExitRootError(err));
      }
    })
  }
}

function sendWithdraw() {
  return {
    type: CONSTANTS.SEND_WITHDRAW,
  };
}

function sendWithdrawSuccess(res) {
  return {
    type: CONSTANTS.SEND_WITHDRAW_SUCCESS,
    payload: res,
    error: '',
  };
}

function sendWithdrawError(error) {
  return {
    type: CONSTANTS.SEND_WITHDRAW_ERROR,
    error,
  }
}

export function handleSendWithdraw(nodeEth, addressSC, wallet, password, abiRollup, operator, idFrom, numExitRoot) {
  return function(dispatch) {
    dispatch(sendWithdraw());
    return new Promise(async (resolve) => {
      try {
        const res = await rollup.onchain.withdraw.withdraw(nodeEth, addressSC, wallet, password, abiRollup, operator, idFrom, numExitRoot);
        dispatch(sendWithdrawSuccess(res));
        resolve(res);
      } catch(error) {
        dispatch(sendWithdrawError(error.message));
        resolve(error.message)
      }
    })
  }
}

function sendSend() {
  return {
    type: CONSTANTS.SEND_SEND,
  };
}

function sendSendSuccess() {
  return {
    type: CONSTANTS.SEND_SEND_SUCCESS,
    error: '',
  };
}

function sendSendError(error) {
  return {
    type: CONSTANTS.SEND_SEND_ERROR,
    error,
  }
}

export function handleSendSend(operator, idTo, amount, wallet, password, tokenId, fee, idFrom) {
  return function(dispatch) {
    dispatch(sendSend());
    return new Promise(async (resolve) => {
      try {
        const res = await rollup.offchain.send.send(operator, idTo, amount, wallet, password, tokenId, fee, idFrom);
        dispatch(sendSendSuccess());
        resolve(res);
      } catch(error) {
        dispatch(sendSendError(error.message));
        resolve(error.message);
      }
    })
  }
}

function approve() {
  return {
    type: CONSTANTS.APPROVE,
  }
}

function approveSuccess(res) {
  return {
    type: CONSTANTS.APPROVE_SUCCESS,
    payload: res,
    error: '',
  }
}

function approveError(error) {
  return {
    type: CONSTANTS.APPROVE_ERROR,
    error,
  }
}

export function handleApprove(addressTokens, abiTokens, encWallet, amountToken, addressRollup, password, node) {
  return function(dispatch) {
    dispatch(approve());
    return new Promise(async (resolve) => {
      try {
        const provider = new ethers.providers.JsonRpcProvider(node);
        const wallet = await rollup.wallet.Wallet.fromEncryptedJson(encWallet, password);
        let walletEth = new ethers.Wallet(wallet.ethWallet.privateKey);
        walletEth = walletEth.connect(provider);
        const contractTokensBot = new ethers.Contract(addressTokens, abiTokens, walletEth);
        const res = await contractTokensBot.approve(addressRollup, amountToken);// config.Json address of rollupSC
        dispatch(approveSuccess(res));
        resolve(res);
      } catch(error) {
        dispatch(approveError(error.message));
        console.log(error.message);
      }
    })
  }
}


function getTokens() {
  return {
    type: CONSTANTS.GET_TOKENS,
  }
}

function getTokensSuccess(res) {
  return {
    type: CONSTANTS.GET_TOKENS_SUCCESS,
    payload: res,
    error: '',
  }
}

function getTokensError(error) {
  return {
    type: CONSTANTS.GET_TOKENS_ERROR,
    error,
  }
}

export function handleGetTokens(node, walletFunder, addressTokens, abiTokens, encWallet, password, amount) {
  return function(dispatch) {
    dispatch(getTokens());
    return new Promise(async (resolve) => {
      try {
        let walletEthFunder = new ethers.Wallet(walletFunder.signingKey.privateKey);
        const provider = new ethers.providers.JsonRpcProvider(node);
        walletEthFunder = walletEthFunder.connect(provider);
        const contractTokensFunder = new ethers.Contract(addressTokens, abiTokens, walletEthFunder);
        const wallet = await rollup.wallet.Wallet.fromEncryptedJson(encWallet, password);
        let walletEth = new ethers.Wallet(wallet.ethWallet.privateKey);
        walletEth = walletEth.connect(provider);
        const address = await walletEth.getAddress();
        const res = await contractTokensFunder.transfer(address, amount);
        dispatch(getTokensSuccess(res));
        resolve(res);
      } catch(error) {
        dispatch(getTokensError(error.message));
        console.log(error.message);
      }
    })
  }
}

function getInitStateTx() {
  return {
    type: CONSTANTS.GET_INIT,
  }
}

export function handleInitStateTx() {
  return function(dispatch) {
    dispatch(getInitStateTx())
  }
}