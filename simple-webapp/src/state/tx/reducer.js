import * as CONSTANTS from './constants';

const initialState = {
  tx: '',
  isLoadingDeposit: false,
  successDeposit: false,
  errorDeposit: '',
  isLoadingWithdraw: false,
  successWithdraw: false,
  errorWithdraw: '',
  isLoadingSend: false,
  successSend: false,
  errorSend: '',
  isLoadingApprove: false,
  successApprove: false,
  errorApprove: '',
  isLoadingGetTokens: false,
  successGetTokens: false,
  errorGetTokens: '',
  exitRoot: -1,
  isLoadingGetExitRoot: false,
  successGetExitRoot: false,
  errorGetExitRoot: '',
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
            tx: action.payload,
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
            tx: action.payload,
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
      case CONSTANTS.APPROVE:
          return {
                ...state,
                isLoadingApprove: true,
                tx: action.payload,
                successApprove: false,
                errorApprove: '',
              };
      case CONSTANTS.APPROVE_SUCCESS: 
          return {
              ...state,
              isLoadingApprove: false,
              successApprove: true,
              errorApprove: '',
            };
      case CONSTANTS.APPROVE_ERROR:
          return {
              ...state,
              isLoadingApprove: false,
              successApprove: false,
              errorApprove: action.error,
            };
      case CONSTANTS.GET_TOKENS:
          return {
              ...state,
              isLoadingGetTokens: true,
              successGetTokens: false,
              errorGetTokens: '',
          };
      case CONSTANTS.GET_TOKENS_SUCCESS: 
          return {
              ...state,
              isLoadingGetTokens: false,
              tx: action.payload,
              successGetTokens: true,
              errorGetTokens: '',
          };
      case CONSTANTS.GET_TOKENS_ERROR:
          return {
              ...state,
              isLoadingGetTokens: false,
              successGetTokens: false,
              errorGetTokens: action.error,
          };
          case CONSTANTS.GET_EXIT_ROOT:
            return {
                ...state,
                isLoadingGetExitRoot: true,
                successGetExitRoot: false,
                errorGetExitRoot: '',
            };
        case CONSTANTS.GET_EXIT_ROOT_SUCCESS: 
            return {
                ...state,
                isLoadingGetExitRoot: false,
                exitRoot: action.payload,
                successGetExitRoot: true,
                errorGetExitRoot: '',
            };
        case CONSTANTS.GET_EXIT_ROOT_ERROR:
            return {
                ...state,
                isLoadingGetExitRoot: false,
                successGetExitRoot: false,
                errorGetExitRoot: action.error,
            };
      default:
          return state;
  }
}

export default transactions;