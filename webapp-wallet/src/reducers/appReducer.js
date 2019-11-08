import { LOAD_FILES, LOAD_ABI, LOAD_CONFIG, LOAD_WALLET, LOAD_WEB3 } from '../actions/types';
// import { CommentActions } from 'semantic-ui-react';

const initialState = {
  wallet: null,
  config: null,
  abiRollup: null,
  web3: null,
  abiTokens: null,
}

export default function(state = initialState, action){
  switch(action.type){

        case LOAD_WEB3:
            return {
              ...state,
              web3: action.payload,
            }
        case LOAD_FILES:
            return {
              ...state,
              wallet: action.payload.wallet,
              config: action.payload.config,
              abiRollup: action.payload.abiRollup,
              abiTokens: action.payload.abiTokens,
            }

        case LOAD_WALLET:
            return {
                ...state,
                wallet: action.payload.wallet,
            }
  
        case LOAD_CONFIG:
            return {
                ...state,
                config: action.payload.config,
            }
              
        case LOAD_ABI:
            return {
                ...state,
                abiRollup: action.payload.abiRollup
            }
    
        default: 
            return state;
  }

}