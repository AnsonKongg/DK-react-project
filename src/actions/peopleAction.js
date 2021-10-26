import * as APIs from "../config/APIs";
import * as types from "../config/ActionTypes";
import * as axios from "axios";

export const getAllUsers = userToken => {
    return async dispatch => {
        try {
            const url = APIs.GET_ALL_USERS_API;
            axios.defaults.headers.Authorization = "Bearer " + userToken;
            const response = await axios.get(url)
            const userList = response.data
            dispatch({
                type: types.GET_ALL_USER_SUCCESS,
                userList,
            });
        } catch (error) {
            dispatch({
                type: types.GET_ALL_USER_FAILED
            });
        }
    }
}
