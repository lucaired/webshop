import { combineReducers } from 'redux';
import { userReducer } from './user';

export interface RootState {
    user: ReturnType<typeof userReducer>;
}

export const rootReducer = combineReducers({
    user: userReducer,
});