import * as CONSTANTS from './constants';

const initialState = {
  isLoadingForcewithdraw: false,
  successForcewithdraw: false,
  errorForcewithdraw: '',
};

function ForcewithdrawTx(state = initialState, action) {
  switch(action.type) {
    case CONSTANTS.SEND_FORCEWITHDRAW:
        return {
          ...state,
          isLoadingForcewithdraw: true,
          successForcewithdraw: false,
          errorForcewithdraw: '',
        };
    case CONSTANTS.SEND_FORCEWITHDRAW_SUCCESS: 
        return {
          ...state,
          isLoadingForcewithdraw: false,
          successForcewithdraw: true,
          errorForcewithdraw: '',
        };
    case CONSTANTS.SEND_FORCEWITHDRAW_ERROR:
        return {
          ...state,
          isLoadingForcewithdraw: false,
          successForcewithdraw: false,
          errorForcewithdraw: action.error,
        };
    case CONSTANTS.SEND_FORCEWITHDRAW_METAMASK:
        return {
          ...state,
          isLoadingForcewithdraw: true,
          successForcewithdraw: false,
          errorForcewithdraw: '',
        };
    case CONSTANTS.SEND_FORCEWITHDRAW_METAMASK_SUCCESS: 
        return {
          ...state,
          isLoadingForcewithdraw: false,
          successForcewithdraw: true,
          errorForcewithdraw: '',
        };
    case CONSTANTS.SEND_FORCEWITHDRAW_METAMASK_ERROR:
        return {
          ...state,
          isLoadingForcewithdraw: false,
          successForcewithdraw: false,
          errorForcewithdraw: action.error,
        };
    default:
      return state;
  }
}

export default ForcewithdrawTx;