import { LOAD_FILES, LOAD_ABI, LOAD_CONFIG, LOAD_WALLET  } from '../actions/types';
// import { CommentActions } from 'semantic-ui-react';

const initialState = {
  wallet: null,
  config: null,
  abiRollup: null,
}

export default function(state = initialState, action){
  switch(action.type){

      case LOAD_FILES:
          return {
              ...state,
              wallet: action.payload.wallet,
              config: action.payload.config,
              abiRollup: action.payload.abiRollup
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