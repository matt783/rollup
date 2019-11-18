import { combineReducers } from 'redux';
import general from './general';
import depositTx from './deposit-tx';
import depositOnTopTx from './deposit-on-top-tx';
import forcewithdrawTx from './forcewithdraw-tx';
import withdrawTx from './withdraw-tx';
import sendTx from './send-tx';

export default combineReducers({
    general: general.reducer,
    depositTx: depositTx.reducer,
    depositOnTopTx: depositOnTopTx.reducer,
    forcewithdrawTx: forcewithdrawTx.reducer,
    withdrawTx: withdrawTx.reducer,
    sendTx: sendTx.reducer,
});

