import { combineReducers } from 'redux';
import appReducer from './appReducer';

//tenemos un reducer para cada página de nuestra aplicación
export default combineReducers({
    appReducer: appReducer,
});