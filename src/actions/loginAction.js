import * as APIs from "../config/APIs";
import * as types from "../config/ActionTypes";
import * as axios from "axios";
import jwt_decode from "jwt-decode";

export const login = io_data => {
    return async dispatch => {
        try {
            const url = APIs.LOGIN_API;
            const response = await axios.post(url, {
                email: io_data.email,
                password: io_data.password,
            })
            const userToken = response.data.token
            const userInfo = jwt_decode(userToken)
            dispatch({
                type: types.LOGIN_SUCCESS,
                userToken,
                userID: userInfo.id,
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
            const userInfo = jwt_decode(userToken)
            dispatch({
                type: types.SIGNUP_SUCCESS,
                userToken,
                userID: userInfo.id,
            });
        } catch (error) {
            dispatch({
                type: types.SIGNUP_FAILED
            });
        }
    }
}