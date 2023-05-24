import { Product } from "../categories/categories.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";

export const CART_INITIAL_STATE: CartState = {
    cartItems: [],
    isCartHidden: true,
}

interface CartState {
    cartItems: CartItem[],
    isCartHidden: boolean,
}

interface CartAction {
    type: typeof CART_ACTION_TYPES.ADD_CART_ITEM
        | typeof CART_ACTION_TYPES.REMOVE_CART_ITEM
        | typeof CART_ACTION_TYPES.SET_CART_ITEM_QUANTITY
        | typeof CART_ACTION_TYPES.CHANGE_CART_ITEM_QUANTITY
        | typeof CART_ACTION_TYPES.SET_IS_CART_HIDDEN
        | typeof CART_ACTION_TYPES.CLEAR_CART;
    payload: any;
}


export const cartReducer = (state = CART_INITIAL_STATE, action: CartAction) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.ADD_CART_ITEM:
            return addCartItem(payload, state)
        case CART_ACTION_TYPES.REMOVE_CART_ITEM:
            return removeCartItem(payload, state)
        case CART_ACTION_TYPES.SET_CART_ITEM_QUANTITY:
            return setCartItemQuantity(payload.cartItem, state, payload.quantity)
        case CART_ACTION_TYPES.CHANGE_CART_ITEM_QUANTITY:
            return changeCartItemQuantity(payload.cartItem, state, payload.quantity)
        case CART_ACTION_TYPES.SET_IS_CART_HIDDEN:
            return {
                ...state,
                isCartHidden: payload
            }   
        case CART_ACTION_TYPES.CLEAR_CART:
            return {
                ...state,
                cartItems: []
            }
        default:
            return state;
    }
}

export const addCartItem = (target: Product, state = CART_INITIAL_STATE): CartState => {
    if (target === null || target === undefined) return state;

    const index = state.cartItems.findIndex((currentItem) => currentItem.product.id === target.id);
    let newItems: CartItem[] = state.cartItems;
    
    if (index !== -1) {
        newItems = changeItemQuanitity(state.cartItems, index, 1);
    } else {
        newItems = [...state.cartItems, new CartItem(target, 1)];
    }
    
    return {
        cartItems: newItems,
        isCartHidden: false,
    };
}

export const removeCartItem = (target: Product, state = CART_INITIAL_STATE): CartState => {
    if (target === null || target === undefined) return state;

    const index = state.cartItems.findIndex((currentItem) => currentItem.product.id === target.id);

    if (index !== -1) {
        const newItems = [...state.cartItems.filter((currentItem) => currentItem.product.id !== target.id)];
        return {
            cartItems: newItems,
            isCartHidden: false || newItems.length === 0,
        }
    } else {
        return state;
    }
}

const setCartItemQuantity = (target: Product, state = CART_INITIAL_STATE, payload: number): CartState => {
    if (target === null || target === undefined) return state;

    const index = state.cartItems.findIndex((currentItem) => currentItem.product.id === target.id);

    if (index !== -1 || payload !== undefined) {
        const newItems = setItemQuanitity(state.cartItems, index, payload);
        return {
            cartItems: newItems,
            isCartHidden: false,
         }
    } else {
        return state;
    }
}

const changeCartItemQuantity = (target: Product, state = CART_INITIAL_STATE, payload: number): CartState => {
    if (target === null || target === undefined) return state;
    
    const index = state.cartItems.findIndex((currentItem) => currentItem.product.id === target.id);

    if (index !== -1 || payload !== undefined) {
        const newItems = changeItemQuanitity(state.cartItems, index, payload);
        return {
            cartItems: newItems,
            isCartHidden: false,
        }
    } else {
        return state;
    }
}

export function changeItemQuanitity(items: CartItem[], index: number, delta: number): CartItem[] {
    /**
     * If new quantity is negative, remove the item if the quantity is 1 or more than apply the delta
     */
    
    const currentItem = items[index];
    if (currentItem.quantity + delta <= 0) return items.filter((_, currentIndex) => currentIndex !== index);

    return items.map((currentItem, currentIndex) => {
        return (currentIndex === index)
            ? new CartItem(currentItem.product, currentItem.quantity + delta)
            : currentItem;
    });
}

export function setItemQuanitity(items: CartItem[], index: number, quantity: number): CartItem[] {
    /**
     * If new quantity is negative, remove the item if the quantity is 1 or more than set the quantity
     */

    if (quantity <= 0) return items.filter((currentItem, currentIndex) => currentIndex !== index);
    return items.map((currentItem, currentIndex) => {
        return (currentIndex === index)
            ? new CartItem(currentItem.product, quantity)
            : currentItem;
    });
}