import * as HomeActionTypes from "./home.types";

const initialState = {
    usersContacts: {}
};

export default function HomeReducer(state = initialState, action) {
    switch (action.type) {
        case HomeActionTypes.ADD_CONTACT_SUCCESS:
            let contact = action && action.data && action.data.name;
            let contactsArr = [contact];
            if(state.usersContacts[action.user]){
                contactsArr = [...state.usersContacts[action.user], contact]
            }
            
            return {
                ...state,
                usersContacts: {
                    ...state.usersContacts,
                    [action.user]: contactsArr
                }
            }
        default:
            return state;
    }
}

