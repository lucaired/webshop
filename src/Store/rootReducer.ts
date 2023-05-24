import { combineReducers } from 'redux';
import { userReducer } from './user';
import { categoriesReducer } from './categories/categories.reducer';

export interface RootState {
    user: ReturnType<typeof userReducer>;
    categories: ReturnType<typeof categoriesReducer>;
}

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
});