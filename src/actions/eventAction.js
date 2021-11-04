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
            if (eventDetail.reviews?.length > 0) {
                eventDetail.reviews = eventDetail.reviews.reverse()
            }
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

export const addEventReview = (io_data, userToken) => {
    return async dispatch => {
        try {
            const url = APIs.EVENT_REVIEW_API;
            axios.defaults.headers.Authorization = "Bearer " + userToken;
            await axios.post(url,io_data)
            dispatch({
                type: types.ADD_REVIEW_SUCCESS,
            });
        } catch (error) {
            dispatch({
                type: types.ADD_REVIEW_FAILED
            });
        }
    }
}

export const attendEvent = (eventId, userToken) => {
    return async dispatch => {
        try {
            const url = `${APIs.EVENT_ATTENDEE_API}/${eventId}`;
            axios.defaults.headers.Authorization = "Bearer " + userToken;
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

export const withdrawEvent = (eventId, userToken) => {
    return async dispatch => {
        try {
            const url = APIs.EVENT_ATTENDEE_API + "/" + eventId;
            axios.defaults.headers.Authorization = "Bearer " + userToken;
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