import * as APIs from "../config/APIs";
import * as types from "../config/ActionTypes";
const axios = require('axios');
const userToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUsImlhdCI6MTYzMzkxODIwN30.JWGY_NJoxd0uxxmuFZYZUzYjA3cGHp9aWFesNNgZCe8"

export const getEventList = () => {
    return async dispatch => {
        try {
            const url = APIs.GET_EVENT_LIST_API;
            const response = await axios.get(url)
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