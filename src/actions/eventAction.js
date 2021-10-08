import * as APIs from "../config/APIs";
import * as types from "../config/ActionTypes";
// import { notification } from 'antd';

export const getEventList = () => {
    return async dispatch => {
        try {
            const url = APIs.GET_EVENT_LIST_API;
            const response = await fetch(url)
            const eventList = await response.json()
            console.log(eventList)
            dispatch({
                type: types.GET_EVENT_SUCCESS,
                eventList,
            });
        } catch (error) {
            dispatch({
                type: types.GET_EVENT_FAILED
            });
        }
    }
}