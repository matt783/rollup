import * as CONSTANTS from './constants';
import * as rollup from '../../utils/rollup-cli';
import { forceWithdraw } from '../../actions/forcewithdraw-metamask';

function sendForcewithdraw() {
  return {
    type: CONSTANTS.SEND_FORCEWITHDRAW,
  };
}

function sendForcewithdrawSuccess() {
  return {
    type: CONSTANTS.SEND_FORCEWITHDRAW_SUCCESS,
    error: '',
  };
}

function sendForcewithdrawError(error) {
  return {
    type: CONSTANTS.SEND_FORCEWITHDRAW_ERROR,
    error,
  }
}

export function handleSendForcewithdraw(nodeEth, addressSC, amount, wallet, password, abiRollup, idFrom) {
  return function(dispatch) {
    console.log("FORCEWITHDRAW")
    dispatch(sendForcewithdraw());;
    return new Promise(async (resolve) => {
      try {
        const res = await rollup.onchain.forceWithdraw.forceWithdraw(nodeEth, addressSC, amount, wallet, password, abiRollup, idFrom);
        dispatch(sendForcewithdrawSuccess());
        resolve(res);
      } catch(error) {
        dispatch(sendForcewithdrawError(error.message));
        resolve(error.message)
      }
    })
  }
}


function sendForcewithdrawMetamask() {
  return {
    type: CONSTANTS.SEND_FORCEWITHDRAW_METAMASK,
  };
}

function sendForcewithdrawMetamaskSuccess() {
  return {
    type: CONSTANTS.SEND_FORCEWITHDRAW_METAMASK_SUCCESS,
    error: '',
  };
}

function sendForcewithdrawMetamaskError(error) {
  return {
    type: CONSTANTS.SEND_FORCEWITHDRAW_METAMASK_ERROR,
    error,
  }
}

export function handleSendForcewithdrawMetamask(nodeEth, addressSC, amount, wallet, password, abiRollup, idFrom, web3, account) {
  return function(dispatch) {
    dispatch(sendForcewithdrawMetamask());;
    return new Promise(async (resolve) => {
      try {
        const res = await forceWithdraw(nodeEth, addressSC, amount, wallet, password, abiRollup, idFrom, web3, account);
        dispatch(sendForcewithdrawMetamaskSuccess());
        resolve(res);
      } catch(error) {
        dispatch(sendForcewithdrawMetamaskError(error.message));
        resolve(error.message)
      }
    })
  }
}