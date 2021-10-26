import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import loginReducer from './loginReducer';

export default combineReducers({
    eventReducer,
    loginReducer,
});