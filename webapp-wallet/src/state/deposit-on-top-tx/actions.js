import * as CONSTANTS from './constants';
import * as rollup from '../../utils/rollup-cli';
import { depositOnTop, approve } from '../../actions/depositontop-metamask';

function sendDepositOnTop() {
  return {
    type: CONSTANTS.SEND_DEPOSIT_ON_TOP,
  };
}

function sendDepositOnTopSuccess() {
  return {
    type: CONSTANTS.SEND_DEPOSIT_ON_TOP_SUCCESS,
    error: '',
  };
}

function sendDepositOnTopError(error) {
  return {
    type: CONSTANTS.SEND_DEPOSIT_ON_TOP_ERROR,
    error,
  }
}

export function handleSendDepositOnTop(nodeEth, addressSC, amount, tokenId, wallet, password, abiRollup, idTo) {
  return function(dispatch) {
    dispatch(sendDepositOnTop());;
    return new Promise(async (resolve) => {
      try {
        const res = await rollup.onchain.deposit.depositOnTop(nodeEth, addressSC, amount, tokenId, wallet, password, abiRollup, idTo);
        dispatch(sendDepositOnTopSuccess());
        resolve(res);
      } catch(error) {
        dispatch(sendDepositOnTopError(error.message));
        resolve(error.message)
      }
    })
  }
}


function sendDepositOnTopMetamask() {
  return {
    type: CONSTANTS.SEND_DEPOSIT_ON_TOP_METAMASK,
  };
}

function sendDepositOnTopMetamaskSuccess() {
  return {
    type: CONSTANTS.SEND_DEPOSIT_ON_TOP_METAMASK_SUCCESS,
    error: '',
  };
}

function sendDepositOnTopMetamaskError(error) {
  return {
    type: CONSTANTS.SEND_DEPOSIT_ON_TOP_METAMASK_ERROR,
    error,
  }
}

export function handleSendDepositOnTopMetamask(nodeEth, addressSC, amount, tokenId, wallet, password, abiRollup, idTo, web3, account, addressTokens, abiTokens) {
  return function(dispatch) {
    dispatch(sendDepositOnTopMetamask());;
    return new Promise(async (resolve) => {
      try {
        await approve(addressTokens, abiTokens, web3, addressSC, amount, account);
        const res = await depositOnTop(nodeEth, addressSC, amount, tokenId, wallet, password, abiRollup, idTo, web3, account);
        dispatch(sendDepositOnTopMetamaskSuccess());
        resolve(res);
      } catch(error) {
        dispatch(sendDepositOnTopMetamaskError(error.message));
        resolve(error.message)
      }
    })
  }
}