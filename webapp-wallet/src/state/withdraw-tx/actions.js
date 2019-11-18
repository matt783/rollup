import * as CONSTANTS from './constants';
import * as rollup from '../../utils/rollup-cli';
import { withdraw } from '../../actions/withdraw-metamask';

function sendWithdraw() {
  return {
    type: CONSTANTS.SEND_WITHDRAW,
  };
}

function sendWithdrawSuccess() {
  return {
    type: CONSTANTS.SEND_WITHDRAW_SUCCESS,
    error: '',
  };
}

function sendWithdrawError(error) {
  return {
    type: CONSTANTS.SEND_WITHDRAW_ERROR,
    error,
  }
}

export function handleSendWithdraw(nodeEth, addressSC, amount, wallet, password, abiRollup, operator, idFrom, numExitRoot) {
  return function(dispatch) {
    console.log("WITHDRAW")
    dispatch(sendWithdraw());;
    return new Promise(async (resolve) => {
      try {
        const res = await rollup.onchain.withdraw.withdraw(nodeEth, addressSC, amount, wallet, password, abiRollup, operator, idFrom, numExitRoot);
        dispatch(sendWithdrawSuccess());
        resolve(res);
      } catch(error) {
        dispatch(sendWithdrawError(error.message));
        resolve(error.message)
      }
    })
  }
}


function sendWithdrawMetamask() {
  return {
    type: CONSTANTS.SEND_WITHDRAW_METAMASK,
  };
}

function sendWithdrawMetamaskSuccess() {
  return {
    type: CONSTANTS.SEND_WITHDRAW_METAMASK_SUCCESS,
    error: '',
  };
}

function sendWithdrawMetamaskError(error) {
  return {
    type: CONSTANTS.SEND_WITHDRAW_METAMASK_ERROR,
    error,
  }
}

export function handleSendWithdrawMetamask(nodeEth, addressSC, amount, wallet, password, abiRollup, operator, idFrom, numExitRoot, web3, account) {
  return function(dispatch) {
    dispatch(sendWithdrawMetamask());;
    return new Promise(async (resolve) => {
      try {
        const res = await withdraw(nodeEth, addressSC, amount, wallet, password, abiRollup, operator, idFrom, numExitRoot, web3, account);
        dispatch(sendWithdrawMetamaskSuccess());
        resolve(res);
      } catch(error) {
        dispatch(sendWithdrawMetamaskError(error.message));
        resolve(error.message)
      }
    })
  }
}