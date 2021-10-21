import * as APIs from "../config/APIs";
import * as types from "../config/ActionTypes";
import * as axios from "axios";
const userToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUsImlhdCI6MTYzNDg0OTAxM30.sMoqkGjL4punrVJCGdwvzk6x_n9jBpZNnU45AboPeGo"

export const getAllUsers = () => {
    return async dispatch => {
        try {
            const url = APIs.GET_ALL_USERS_API;
            axios.defaults.headers.Authorization = userToken;
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
