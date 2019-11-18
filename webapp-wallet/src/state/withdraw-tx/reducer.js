import * as CONSTANTS from './constants';

const initialState = {
  isLoadingWithdraw: false,
  successWithdraw: false,
  errorWithdraw: '',
};

function withdrawTx(state = initialState, action) {
  switch(action.type) {
    case CONSTANTS.SEND_WITHDRAW:
        return {
          ...state,
          isLoadingWithdraw: true,
          successWithdraw: false,
          errorWithdraw: '',
        };
    case CONSTANTS.SEND_WITHDRAW_SUCCESS: 
        return {
          ...state,
          isLoadingWithdraw: false,
          successWithdraw: true,
          errorWithdraw: '',
        };
    case CONSTANTS.SEND_WITHDRAW_ERROR:
        return {
          ...state,
          isLoadingWithdraw: false,
          successWithdraw: false,
          errorWithdraw: action.error,
        };
    case CONSTANTS.SEND_WITHDRAW_METAMASK:
        return {
          ...state,
          isLoadingWithdraw: true,
          successWithdraw: false,
          errorWithdraw: '',
        };
    case CONSTANTS.SEND_WITHDRAW_METAMASK_SUCCESS: 
        return {
          ...state,
          isLoadingWithdraw: false,
          successWithdraw: true,
          errorWithdraw: '',
        };
    case CONSTANTS.SEND_WITHDRAW_METAMASK_ERROR:
        return {
          ...state,
          isLoadingWithdraw: false,
          successWithdraw: false,
          errorWithdraw: action.error,
        };
    default:
      return state;
  }
}

export default withdrawTx;