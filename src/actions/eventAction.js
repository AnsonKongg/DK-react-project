import * as APIs from "../config/APIs";
import * as types from "../config/ActionTypes";
import * as axios from "axios";
const userToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUsImlhdCI6MTYzNDg0OTAxM30.sMoqkGjL4punrVJCGdwvzk6x_n9jBpZNnU45AboPeGo"

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

export const attendEvent = (eventId) => {
    return async dispatch => {
        try {
            const url = APIs.EVENT_ATTENDEE_API+ "/" + eventId;
            axios.defaults.headers.Authorization = userToken;
            await axios.post(url)
            dispatch({
                type: types.ATTEND_EVENT_SUCCESS,
            });
        } catch (error) {
            dispatch({
                type: types.ATTEND_EVENT_FAILED
            });
        }
    }
}

export const withdrawEvent = (eventId) => {
    return async dispatch => {
        try {
            const url = APIs.EVENT_ATTENDEE_API+ "/" + eventId;
            axios.defaults.headers.Authorization = userToken;
            await axios.delete(url)
            dispatch({
                type: types.WITHDRAW_EVENT_SUCCESS,
            });
        } catch (error) {
            dispatch({
                type: types.WITHDRAW_EVENT_FAILED
            });
        }
    }
}