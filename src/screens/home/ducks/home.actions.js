
import * as HomeActionTypes from "./home.types";

 export function addContact(user, data) {
    return {
      type: HomeActionTypes.ADD_CONTACT_SUCCESS,
      user,
      data
    }
  }
