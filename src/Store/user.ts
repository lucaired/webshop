import { createAction } from "../Utils/Reducer/reducer";
import { RootState } from "./rootReducer";


export class LocalUser {
    name: string;
    email: string;
    isLoggedIn: boolean;

    constructor(name: string, email: string, isLoggedIn: boolean) {
        this.name = name;
        this.email = email;
        this.isLoggedIn = isLoggedIn;
    }
}

export const USER_ACTION_TYPES = {
    'SET_CURRENT_USER': 'user/SET_CURRENT_USER',
}

export const USER_INITIAL_STATE = {
    currentUser: LocalUser,
}

export const selectCurrentUser = (state: RootState) => state.user.currentUser;

interface UserAction {
    type: string;
    payload: any;
}

export const userReducer = (state = USER_INITIAL_STATE, action: UserAction) => {
    switch (action.type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export const setCurrentUser = (user: any) => 
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

