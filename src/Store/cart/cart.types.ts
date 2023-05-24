import { Product } from "../categories/categories.types";

export class CartItem {
    product: Product;
    quantity: number;

    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }
}

export const CART_ACTION_TYPES = {
    ADD_CART_ITEM: 'cart/ADD_CART_ITEM',
    REMOVE_CART_ITEM: 'cart/REMOVE_CART_ITEM',
    SET_CART_ITEM_QUANTITY: 'cart/SET_CART_ITEM_QUANTITY',
    CHANGE_CART_ITEM_QUANTITY: 'cart/CHANGE_CART_ITEM_QUANTITY',
    SET_IS_CART_HIDDEN: 'cart/SET_IS_CART_HIDDEN',
    CLEAR_CART: 'cart/CLEAR_CART'
}

export type CartState = {
    cartItems: CartItem[],
    isCartHidden: boolean,
}