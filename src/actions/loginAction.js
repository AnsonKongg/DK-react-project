import * as APIs from "../config/APIs";
import * as types from "../config/ActionTypes";
import * as axios from "axios";

export const login = io_data => {
    return async dispatch => {
        try {
            const url = APIs.LOGIN_API;
            const response = await axios.post(url, {
                email: io_data.email,
                password: io_data.password,
            })
            const userToken = response.data.token
            dispatch({
                type: types.LOGIN_SUCCESS,
                userToken,
            });
        } catch (error) {
            dispatch({
                type: types.LOGIN_FAILED
            });
        }
    }
}

export const signup = io_data => {
    return async dispatch => {
        try {
            const url = APIs.SIGNUP_API;
            const response = await axios.post(url, {
                email: io_data.email,
                first_name: io_data.firstName,
                last_name: io_data.lastName,
                password: io_data.password,
            })
            const userToken = response.data.token
            dispatch({
                type: types.SIGNUP_SUCCESS,
                userToken,
            });
        } catch (error) {
            dispatch({
                type: types.SIGNUP_FAILED
            });
        }
    }
}