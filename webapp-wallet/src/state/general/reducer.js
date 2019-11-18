import * as CONSTANTS from './constants';

const initialState = {
  errorWeb3: '',
  errorFiles: '',
  isLoading: false,
  web3: '',
  isLoadingFiles: false,
  wallet: '',
  config: '',
  abiRollup: '',
  abiTokens: '',
};

function general(state = initialState, action) {
  switch(action.type) {
    case CONSTANTS.WEB3_LOAD:
      return {
        ...state,
        isLoading: true,
        errorWeb3: '',
      };
    case CONSTANTS.WEB3_LOAD_SUCCESS: 
      return {
        ...state,
        isLoading: false,
        web3: action.payload,
        errorWeb3: '',
      };
    case CONSTANTS.WEB3_LOAD_ERROR:
      return {
        ...state,
        isLoading: false,
        errorWeb3: action.error,
      };
    case CONSTANTS.LOAD_FILES:
      return {
        ...state,
        isLoadingFiles: true,
        errorFiles: '',
      }
    case CONSTANTS.LOAD_FILES_SUCCESS:
          return {
            ...state,
            wallet: action.payload.wallet,
            config: action.payload.config,
            abiRollup: action.payload.abiRollup,
            abiTokens: action.payload.abiTokens,
            isLoadingFiles: false,
            errorFiles: ''
          };
    case CONSTANTS.LOAD_FILES_ERROR:
          return {
            ...state,
            isLoadingFiles: false,
            errorFiles: action.error,
          };
    default:
      return state;
  }
}

export default general;