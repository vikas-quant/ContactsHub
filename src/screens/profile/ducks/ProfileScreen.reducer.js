import * as ProfileScreenTypes from "./ProfileScreen.types";

const initialState = {
    usersProfile: {}
};

export default function ProfileReducer(state = initialState, action) {
    switch (action.type) {
        case ProfileScreenTypes.PROFILE_SUCCESS:
            return {
                ...state,
                usersProfile: {
                    ...state.usersProfile,
                    [action.user]: action.data
                }
            }
        default:
            return state;
    }
}

