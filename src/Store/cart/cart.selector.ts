import { RootState } from "../rootReducer";
import { CartItem } from "./cart.types";

export const selectIsCartHidden = (state: RootState): boolean => state.cart.isCartHidden;
export const selectCartItems = (state: RootState): CartItem[] => state.cart.cartItems;
export const selectCartItemsCount = (state: RootState): number => state.cart.cartItems.reduce((acc, item) => acc + item.quantity, 0);
export const selectCartTotal = (state: RootState): number => state.cart.cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);