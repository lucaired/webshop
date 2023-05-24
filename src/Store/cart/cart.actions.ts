import { Product } from "../categories/categories.types";
import { createAction } from "../../Utils/Reducer/reducer";
import { CART_ACTION_TYPES } from "./cart.types";

export const addCartItem = (cartItem: Product) => 
    createAction(CART_ACTION_TYPES.ADD_CART_ITEM, cartItem);

export const removeCartItem = (cartItem: Product) => 
    createAction(CART_ACTION_TYPES.REMOVE_CART_ITEM, cartItem);

export const setCartItemQuantity = (cartItem: Product, quantity: number) => 
    createAction(CART_ACTION_TYPES.SET_CART_ITEM_QUANTITY, { cartItem, quantity });

export const changeCartItemQuantity = (cartItem: Product, quantity: number) => 
    createAction(CART_ACTION_TYPES.CHANGE_CART_ITEM_QUANTITY, { cartItem, quantity });

export const setIsCartHidden = (isCartHidden: boolean) => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_HIDDEN, isCartHidden);

export const clearCart = () => createAction(CART_ACTION_TYPES.CLEAR_CART, null);
