import { combineReducers } from 'redux';
import general from './general';

//tenemos un reducer para cada página de nuestra aplicación
export default combineReducers({
    general: general.reducer,
});

