import * as types from "../config/ActionTypes";
const loginState = {
    type: "",
    userToken: "",
    userID: ""
};

const loginReducer = (state = loginState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                type: action.type,
                userToken: action.userToken,
                userID: action.userID,
            };
        case types.LOGIN_FAILED:
            return {
                ...state,
                type: action.type,
            };
        case types.SIGNUP_SUCCESS:
            return {
                ...state,
                type: action.type,
                userToken: action.userToken,
                userID: action.userID,
            };
        case types.SIGNUP_FAILED:
            return {
                ...state,
                type: action.type,
            };
        default:
            return state;
    }
}

export default loginReducer;