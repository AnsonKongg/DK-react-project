import * as types from "../config/ActionTypes";
const eventState = {
    type: "",
    eventList: [],
    eventDetail: {},
};

const eventReducer = (state = eventState, action) => {
    switch (action.type) {
        case types.GET_EVENT_SUCCESS:
            return {
                ...state,
                type: action.type,
                eventList: action.eventList,
            };
        case types.GET_EVENT_FAILED:
            return {
                ...state,
                type: action.type,
            };
        case types.GET_EVENT_DETAIL_SUCCESS:
            return {
                ...state,
                type: action.type,
                eventDetail: action.eventDetail,
            };
        case types.GET_EVENT_DETAIL_FAILED:
            return {
                ...state,
                type: action.type,
            };
        case types.ATTEND_EVENT_SUCCESS:
            return {
                ...state,
                type: action.type,
            };
        case types.WITHDRAW_EVENT_SUCCESS:
            return {
                ...state,
                type: action.type,
            };
        case types.WITHDRAW_EVENT_FAILED:
            return {
                ...state,
                type: action.type,
            };
        case types.ATTEND_EVENT_FAILED:
            return {
                ...state,
                type: action.type,
            };
        default:
            return state;
    }
}

export default eventReducer;