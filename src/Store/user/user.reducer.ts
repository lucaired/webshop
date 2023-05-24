import { USER_ACTION_TYPES } from "./user.actions";
import { USER_INITIAL_STATE } from "./user.types";

interface UserAction {
  type: string;
  payload: any;
}

export const userReducer = (
  state = USER_INITIAL_STATE,
  action: UserAction
) => {
  switch (action.type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};