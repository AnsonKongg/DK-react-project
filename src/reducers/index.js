import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import loginReducer from './loginReducer';
import peopleReducer from './peopleReducer';

export default combineReducers({
    eventReducer,
    loginReducer,
    peopleReducer,
});