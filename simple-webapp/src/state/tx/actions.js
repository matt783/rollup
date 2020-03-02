import * as CONSTANTS from './constants';
import * as rollup from '../../utils/bundle-cli';
import * as operator from '../../utils/bundle-op';

const ethers = require('ethers');

const gasLimit = 5000000;

function sendDeposit() {
  return {
    type: CONSTANTS.SEND_DEPOSIT,
  };
}

function sendDepositSuccess(res, currentBatch) {
  return {
    type: CONSTANTS.SEND_DEPOSIT_SUCCESS,
    payload: { res, currentBatch },
    error: '',
  };
}

function sendDepositError(error) {
  return {
    type: CONSTANTS.SEND_DEPOSIT_ERROR,
    error,
  };
}

export function handleSendDeposit(nodeEth, addressSC, amount, tokenId, wallet, ethAddress,
  abiRollup, gasMultiplier, operatorUrl) {
  return function (dispatch) {
    dispatch(sendDeposit());
    return new Promise(async (resolve) => {
      try {
        const apiOperator = new operator.cliExternalOperator(operatorUrl);
        const resOperator = await apiOperator.getState();
        const currentBatch = resOperator.data.rollupSynch.lastBatchSynched;
        const res = await rollup.onchain.deposit.deposit(nodeEth, addressSC, amount, tokenId, wallet,
          ethAddress, abiRollup, gasLimit, gasMultiplier);
        dispatch(sendDepositSuccess(res, currentBatch));
        resolve(res);
      } catch (error) {
        dispatch(sendDepositError('Deposit Error'));
        resolve(error);
      }
    });
  };
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
  };
}

export function handleGetExitRoot(urlOperator, id) {
  return function (dispatch) {
    dispatch(getNumExitRoot());
    return new Promise(async (resolve) => {
      try {
        const apiOperator = new operator.cliExternalOperator(urlOperator);
        const res = await apiOperator.getExits(id);
        const infoExits = [];
        res.data.map(async (key, index) => {
          // eslint-disable-next-line no-console
          const info = await apiOperator.getExitInfo(id, key).catch((err) => { console.log(err); });
          const amount = ethers.utils.formatEther(info.data.state.amount);
          if (!infoExits.find((leaf) => leaf.value === key)) {
            infoExits.push({
              key: index, value: key, amount, text: `Batch: ${key} Amount: ${amount}`,
            });
          }
        });
        resolve(infoExits);
        dispatch(getNumExitRootSuccess(infoExits));
      } catch (err) {
        resolve([]);
        dispatch(getNumExitRootError(err.message));
      }
    });
  };
}

function sendWithdraw() {
  return {
    type: CONSTANTS.SEND_WITHDRAW,
  };
}

function sendWithdrawSuccess(res, currentBatch) {
  return {
    type: CONSTANTS.SEND_WITHDRAW_SUCCESS,
    payload: { res, currentBatch },
    error: '',
  };
}

function sendWithdrawError(error) {
  return {
    type: CONSTANTS.SEND_WITHDRAW_ERROR,
    error,
  };
}

export function handleSendWithdraw(nodeEth, addressSC, wallet, abiRollup, op,
  idFrom, numExitRoot, gasMultiplier) {
  return function (dispatch) {
    dispatch(sendWithdraw());
    return new Promise(async (resolve) => {
      try {
        if (numExitRoot === -1) {
          dispatch(sendWithdrawError('No numExitRoot'));
          resolve('No numExitRoot');
        } else {
          const apiOperator = new operator.cliExternalOperator(op);
          const resOperator = await apiOperator.getState();
          const currentBatch = resOperator.data.rollupSynch.lastBatchSynched;
          const res = await rollup.onchain.withdraw.withdraw(nodeEth, addressSC, wallet, abiRollup,
            op, idFrom, numExitRoot, gasLimit, gasMultiplier);
          dispatch(sendWithdrawSuccess(res, currentBatch));
          resolve(res);
        }
      } catch (error) {
        dispatch(sendWithdrawError('Withdraw Error'));
        resolve(error);
      }
    });
  };
}

function getIds() {
  return {
    type: CONSTANTS.GET_IDS,
  };
}

function getIdsSuccess(res) {
  return {
    type: CONSTANTS.GET_IDS_SUCCESS,
    payload: res,
    error: '',
  };
}

function getIdsError(error) {
  return {
    type: CONSTANTS.GET_IDS_ERROR,
    error,
  };
}

export function handleGetIds(urlOperator, filters) {
  return function (dispatch) {
    dispatch(getIds());
    return new Promise(async (resolve) => {
      try {
        const apiOperator = new operator.cliExternalOperator(urlOperator);
        const res = await apiOperator.getAccounts(filters);
        const ids = [];
        res.data.map(async (key) => {
          ids.push({
            key: key.idx, value: key.idx, amount: key.amount, text: key.idx,
          });
        });
        resolve(ids);
        dispatch(getIdsSuccess(ids));
      } catch (err) {
        resolve([]);
        dispatch(getIdsError(err.message));
      }
    });
  };
}

function sendSend() {
  return {
    type: CONSTANTS.SEND_SEND,
  };
}

function sendSendSuccess(currentBatch) {
  return {
    type: CONSTANTS.SEND_SEND_SUCCESS,
    payload: currentBatch,
    error: '',
  };
}

function sendSendError(error) {
  return {
    type: CONSTANTS.SEND_SEND_ERROR,
    error,
  };
}

export function handleSendSend(op, idTo, amount, wallet, tokenId, fee, idFrom, urlOperator) {
  return function (dispatch) {
    dispatch(sendSend());
    return new Promise(async (resolve) => {
      try {
        const item = localStorage.getItem('nonceObject');
        let nonceObject;
        if (item === null) {
          nonceObject = undefined;
        } else {
          nonceObject = JSON.parse(item);
        }
        const apiOperator = new operator.cliExternalOperator(urlOperator);
        const resId = await apiOperator.getAccountByIdx(idFrom);
        let { address } = wallet.ethWallet;
        if (!wallet.ethWallet.address.startsWith('0x')) {
          address = `0x${wallet.ethWallet.address}`;
        }
        if (resId && resId.data.ethAddress.toUpperCase() === address.toUpperCase()) {
          const resOperator = await apiOperator.getState();
          const currentBatch = resOperator.data.rollupSynch.lastBatchSynched;
          const res = await rollup.offchain.send.send(op, idTo, amount, wallet, tokenId,
            fee, idFrom, undefined, nonceObject);
          localStorage.setItem('nonceObject', JSON.stringify(res.nonceObject));
          dispatch(sendSendSuccess(currentBatch));
          resolve(res);
        } else {
          throw new Error('This is not your ID');
        }
      } catch (error) {
        dispatch(sendSendError('Send Error'));
        resolve(error);
      }
    });
  };
}

function approve() {
  return {
    type: CONSTANTS.APPROVE,
  };
}

function approveSuccess(res) {
  return {
    type: CONSTANTS.APPROVE_SUCCESS,
    payload: res,
    error: '',
  };
}

function approveError(error) {
  return {
    type: CONSTANTS.APPROVE_ERROR,
    error,
  };
}

export function handleApprove(addressTokens, abiTokens, wallet, amountToken, addressRollup,
  node, gasMultiplier) {
  return function (dispatch) {
    dispatch(approve());
    return new Promise(async (resolve) => {
      try {
        const provider = new ethers.providers.JsonRpcProvider(node);
        let walletEth = new ethers.Wallet(wallet.ethWallet.privateKey);
        walletEth = walletEth.connect(provider);
        const contractTokens = new ethers.Contract(addressTokens, abiTokens, walletEth);
        const gasPrice = await rollup.onchain.utils.getGasPrice(gasMultiplier, provider);
        const overrides = {
          gasLimit,
          gasPrice: gasPrice._hex,
        };
        const res = await contractTokens.approve(addressRollup, amountToken, overrides);
        dispatch(approveSuccess(res));
        resolve(res);
      } catch (error) {
        dispatch(approveError('Approve Error'));
        resolve(error.message);
      }
    });
  };
}


function getTokens() {
  return {
    type: CONSTANTS.GET_TOKENS,
  };
}

function getTokensSuccess(res) {
  return {
    type: CONSTANTS.GET_TOKENS_SUCCESS,
    payload: res,
    error: '',
  };
}

function getTokensError(error) {
  return {
    type: CONSTANTS.GET_TOKENS_ERROR,
    error,
  };
}

export function handleGetTokens(node, addressTokens, wallet) {
  return function (dispatch) {
    dispatch(getTokens());
    return new Promise(async (resolve) => {
      try {
        const provider = new ethers.providers.JsonRpcProvider(node);
        let walletEth = new ethers.Wallet(wallet.ethWallet.privateKey);
        walletEth = walletEth.connect(provider);
        const tx = {
          to: addressTokens,
          value: ethers.utils.parseEther('0'),
        };
        const res = await walletEth.sendTransaction(tx);
        dispatch(getTokensSuccess(res));
        resolve(res);
      } catch (error) {
        dispatch(getTokensError(error.message));
      }
    });
  };
}

function getInitStateTx() {
  return {
    type: CONSTANTS.GET_INIT,
  };
}

export function handleInitStateTx() {
  return function (dispatch) {
    localStorage.clear();
    dispatch(getInitStateTx());
  };
}

function closeMessage() {
  return {
    type: CONSTANTS.CLOSE_MESSAGE,
  };
}

export function handleCloseMessage() {
  return function (dispatch) {
    dispatch(closeMessage());
  };
}
