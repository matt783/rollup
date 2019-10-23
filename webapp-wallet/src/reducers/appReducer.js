import { ADD_APP } from '../actions/types';

const initialState = {
  wallet: null,
}

export default function(state = initialState, action){
  switch(action.type){

      case ADD_APP:
          return {
              ...state,
              wallet: action.payload.wallet
          }

      default: 
          return state;
  }

}