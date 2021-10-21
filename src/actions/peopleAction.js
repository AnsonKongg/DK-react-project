import * as APIs from "../config/APIs";
import * as types from "../config/ActionTypes";
import * as axios from "axios";

export const getAllUsers = date => {
    return async dispatch => {
        try {
            const url = APIs.GET_ALL_USER_API;
            const response = await axios.get(url)
            const userList = response.data
            console.log(userList)
            dispatch({
                type: types.GET_ALL_USER_SUCCESS,
                // eventList,
            });
        } catch (error) {
            dispatch({
                type: types.GET_ALL_USER_FAILED
            });
        }
    }
}
