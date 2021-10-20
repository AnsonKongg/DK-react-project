import * as APIs from "../config/APIs";
import * as types from "../config/ActionTypes";
import * as axios from "axios";

export const getEventList = date => {
    return async dispatch => {
        try {
            const url = APIs.GET_EVENT_LIST_API;
            const response = await axios.get(url, {
                params: {
                    date: date
                }
            })
            const eventList = response.data
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

export const getEventDetail = (eventId, userToken) => {
    return async dispatch => {
        try {
            const url = APIs.GET_EVENT_LIST_API + "/" + eventId;
            axios.defaults.headers.Authorization = "Bearer " + userToken;
            const response = await axios.get(url)
            const eventDetail = response.data
            dispatch({
                type: types.GET_EVENT_DETAIL_SUCCESS,
                eventDetail,
            });
        } catch (error) {
            dispatch({
                type: types.GET_EVENT_DETAIL_FAILED
            });
        }
    }
}