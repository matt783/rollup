import * as CONSTANTS from './constants';
import * as rollup from '../../utils/rollup-cli';
import { deposit, approve } from '../../actions/deposit-metamask';

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
    console.log("DEPOSIT")
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


function sendDepositMetamask() {
  return {
    type: CONSTANTS.SEND_DEPOSIT_METAMASK,
  };
}

function sendDepositMetamaskSuccess() {
  return {
    type: CONSTANTS.SEND_DEPOSIT_METAMASK_SUCCESS,
    error: '',
  };
}

function sendDepositMetamaskError(error) {
  return {
    type: CONSTANTS.SEND_DEPOSIT_METAMASK_ERROR,
    error,
  }
}

export function handleSendDepositMetamask(nodeEth, addressSC, amount, tokenId, wallet, password, ethAddress, abiRollup, web3, account, addressTokens, abiTokens) {
  return function(dispatch) {
    dispatch(sendDepositMetamask());;
    return new Promise(async (resolve) => {
      try {
        await approve(addressTokens, abiTokens, web3, addressSC, amount, account);
        const res = await deposit(nodeEth, addressSC, amount, tokenId, wallet, password, ethAddress, abiRollup, web3, account);
        dispatch(sendDepositMetamaskSuccess());
        resolve(res);
      } catch(error) {
        dispatch(sendDepositMetamaskError(error.message));
        resolve(error.message)
      }
    })
  }
}