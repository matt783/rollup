import { LOAD_FILES } from '../actions/types';
import { CommentActions } from 'semantic-ui-react';

const initialState = {
  wallet: null,
  config: null,
  rollupabi: null,
}

export default function(state = initialState, action){
  switch(action.type){

      case LOAD_FILES:
          return {
              ...state,
              wallet: action.payload.wallet,
              config: action.payload.config,
              rollupabi: action.payload.rollupabi
          }

      default: 
          return state;
  }

}