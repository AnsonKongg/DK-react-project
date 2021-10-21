import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import peopleReducer from './peopleReducer';

export default combineReducers({
    eventReducer,
    peopleReducer,
});