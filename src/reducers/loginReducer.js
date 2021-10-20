import * as types from "../config/ActionTypes";
const loginState = {
    type: "",
    userToken: "",
};

const loginReducer = (state = loginState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                type: action.type,
                userToken: action.userToken,
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