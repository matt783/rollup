import * as CONSTANTS from './constants';

const initialState = {
  isLoadingDeposit: false,
  successDeposit: false,
  errorDeposit: '',
};

function depositTx(state = initialState, action) {
  switch(action.type) {
    case CONSTANTS.SEND_DEPOSIT_ON_TOP:
        return {
          ...state,
          isLoadingDeposit: true,
          successDeposit: false,
          errorDeposit: '',
        };
    case CONSTANTS.SEND_DEPOSIT_ON_TOP_SUCCESS: 
        return {
          ...state,
          isLoadingDeposit: false,
          successDeposit: true,
          errorDeposit: '',
        };
    case CONSTANTS.SEND_DEPOSIT_ON_TOP_ERROR:
        return {
          ...state,
          isLoadingDeposit: false,
          successDeposit: false,
          errorDeposit: action.error,
        };
    case CONSTANTS.SEND_DEPOSIT_ON_TOP_METAMASK:
        return {
          ...state,
          isLoadingDeposit: true,
          successDeposit: false,
          errorDeposit: '',
        };
    case CONSTANTS.SEND_DEPOSIT_ON_TOP_METAMASK_SUCCESS: 
        return {
          ...state,
          isLoadingDeposit: false,
          successDeposit: true,
          errorDeposit: '',
        };
    case CONSTANTS.SEND_DEPOSIT_ON_TOP_METAMASK_ERROR:
        return {
          ...state,
          isLoadingDeposit: false,
          successDeposit: false,
          errorDeposit: action.error,
        };
    default:
      return state;
  }
}

export default depositTx;