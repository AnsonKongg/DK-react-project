import * as APIs from "../config/APIs";
import * as types from "../config/ActionTypes";
import * as axios from "axios";
const userToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUsImlhdCI6MTYzNDAwODU4NH0.2gXar6rVzf7Mq1FMwX2Q-2PKItjXi_krVJ6BufC0pWU"

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

export const getEventDetail = (eventId) => {
    return async dispatch => {
        try {
            const url = APIs.GET_EVENT_LIST_API + "/" + eventId;
            axios.defaults.headers.Authorization = userToken;
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