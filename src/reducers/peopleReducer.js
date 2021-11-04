import * as types from "../config/ActionTypes";
const peopleState = {
    type: "",
    userList: [],
};

const peopleReducer = (state = peopleState, action) => {
    switch (action.type) {
        case types.GET_ALL_USER_SUCCESS:
            return {
                ...state,
                type: action.type,
                userList: action.userList,
            };
        case types.GET_ALL_USER_FAILED:
            return {
                ...state,
                type: action.type,
            };
        default:
            return state;
    }
}

export default peopleReducer;