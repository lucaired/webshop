import { combineReducers } from 'redux';
import { userReducer } from './user';
import { categoriesReducer } from './categories/categories.reducer';
import { cartReducer } from './cart/cart.reducer';

export interface RootState {
    user: ReturnType<typeof userReducer>;
    categories: ReturnType<typeof categoriesReducer>;
    cart: ReturnType<typeof cartReducer>;
}

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer,
});