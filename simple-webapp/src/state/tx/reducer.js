import * as CONSTANTS from './constants';

const initialState = {
  isLoadingDeposit: false,
  successDeposit: false,
  errorDeposit: '',
  isLoadingWithdraw: false,
  successWithdraw: false,
  errorWithdraw: '',
  isLoadingSend: false,
  successSend: false,
  errorSend: '',
  isLoadingSend0: false,
  successSend0: false,
  errorSend0: '',
};

function transactions(state = initialState, action) {
  switch(action.type) {
      case CONSTANTS.SEND_DEPOSIT:
          return {
            ...state,
            isLoadingDeposit: true,
            successDeposit: false,
            errorDeposit: '',
          };
      case CONSTANTS.SEND_DEPOSIT_SUCCESS: 
          return {
            ...state,
            isLoadingDeposit: false,
            successDeposit: true,
            errorDeposit: '',
          };
      case CONSTANTS.SEND_DEPOSIT_ERROR:
          return {
            ...state,
            isLoadingDeposit: false,
            successDeposit: false,
            errorDeposit: action.error,
          };
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
      case CONSTANTS.SEND_SEND:
          return {
              ...state,
              isLoadingSend: true,
              successSend: false,
              errorSend: '',
            };
      case CONSTANTS.SEND_SEND_SUCCESS: 
          return {
              ...state,
              isLoadingSend: false,
              successSend: true,
              errorSend: '',
            };
      case CONSTANTS.SEND_SEND_ERROR:
          return {
              ...state,
              isLoadingSend: false,
              successSend: false,
              errorSend: action.error,
            };
      case CONSTANTS.SEND_SEND0:
          return {
              ...state,
              isLoadingSend0: true,
              successSend0: false,
              errorSend0: '',
            };
      case CONSTANTS.SEND_SEND0_SUCCESS: 
          return {
                ...state,
                isLoadingSend0: false,
                successSend0: true,
                errorSend0: '',
              };
      case CONSTANTS.SEND_SEND0_ERROR:
          return {
                ...state,
                isLoadingSend0: false,
                successSend0: false,
                errorSend0: action.error,
              }; 
      default:
          return state;
  }
}

export default transactions;