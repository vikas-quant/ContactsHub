import * as LoginActionTypes from "./LoginScreen.types";

const initialState = {
    isLoggedin: false
};

export default function LoginReducer(state = initialState, action) {
    switch (action.type) {
        case LoginActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedin: action.value
            }
        default:
            return state;
    }
}

