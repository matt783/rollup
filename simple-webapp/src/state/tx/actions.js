import * as CONSTANTS from './constants';
import * as rollup from '../../utils/bundle-cli';

function sendDeposit() {
  return {
    type: CONSTANTS.SEND_DEPOSIT,
  };
}

function sendDepositSuccess() {
  return {
    type: CONSTANTS.SEND_DEPOSIT_SUCCESS,
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
    dispatch(sendDeposit());;
    return new Promise(async (resolve) => {
      try {
        const res = await rollup.onchain.deposit.deposit(nodeEth, addressSC, amount, tokenId, wallet, password, ethAddress, abiRollup);
        dispatch(sendDepositSuccess());
        resolve(res);
      } catch(error) {
        dispatch(sendDepositError(error.message));
        resolve(error.message)
      }
    })
  }
}

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
        console.log(operator)
        console.log(idTo)
        console.log(amount)
        console.log(wallet)
        console.log(password)
        console.log(tokenId)
        console.log(fee)
        console.log(idFrom)

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