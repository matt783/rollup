import * as CONSTANTS from './constants';

const initialState = {
  errorWallet: '',
  isLoadingWallet: false,
  wallet: '',
  password: '',
};

function general(state = initialState, action) {
  switch(action.type) {
    case CONSTANTS.LOAD_WALLET:
      return {
        ...state,
        isLoadingWallet: true,
        errorWallet: '',
      }
    case CONSTANTS.LOAD_WALLET_SUCCESS:
          return {
            ...state,
            isLoadingWallet: false,
            wallet: action.payload.wallet,
            password: action.payload.password,
            errorWallet: '',
          }
    case CONSTANTS.LOAD_WALLET_ERROR:
      return {
        ...state,
        isLoadingWallet: false,
        errorWallet: action.error,
      }
    default:
      return state;
  }
}

export default general;