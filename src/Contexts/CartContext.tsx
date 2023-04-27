import React, { Reducer, createContext, useReducer } from "react";
import { Product } from "./CategoryContext";

export class CartItem {
    product: Product;
    quantity: number;

    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }
}

function changeItemQuanitity(items: CartItem[], index: number, delta: number): CartItem[] {
    /**
     * If new quantity is negative, remove the item if the quantity is 1 or more than apply the delta
     */
    
    const currentItem = items[index];
    if (currentItem.quantity + delta <= 0) return items.filter((currentItem, currentIndex) => currentIndex !== index);

    return items.map((currentItem, currentIndex) => {
        return (currentIndex === index)
            ? new CartItem(currentItem.product, currentItem.quantity + delta)
            : currentItem;
    });
}

function setItemQuanitity(items: CartItem[], index: number, quantity: number): CartItem[] {
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

type updateCartItemsAction = 'ADD_CART_ITEM' | 'REMOVE_CART_ITEM' | 'SET_CART_ITEM_QUANTITY' | 'CHANGE_CART_ITEM_QUANTITY' | 'CLEAR_CART';

const updateCartItems = (target: Product | null, state: CartState, action: updateCartItemsAction, payload?: number): {
    cartItems: CartItem[],
    isCartHidden: boolean,
    cartItemsCount: number,
    cartTotal: number
} => {
    
    if (action === 'CLEAR_CART') {

        return {
            cartItems: [],
            isCartHidden: true,
            cartItemsCount: 0,
            cartTotal: 0
        };

    }

    if (target === null || target === undefined) return state;

    const index = state.cartItems.findIndex((currentItem) => currentItem.product.id === target.id);
    let newItems: CartItem[] = state.cartItems;
    let cartItemsCount = 0;
    let cartTotal = 0;

    if (index !== -1) {
        
        if (action === 'ADD_CART_ITEM') {
            newItems = changeItemQuanitity(state.cartItems, index, 1);
            cartItemsCount = state.cartItemsCount + 1;
            cartTotal = state.cartTotal + target.price;

        } else if (action === 'REMOVE_CART_ITEM') {
            newItems = [...state.cartItems.filter((currentItem) => currentItem.product.id !== target.id)];
            cartItemsCount = state.cartItemsCount -1 * state.cartItems[index].quantity;
            cartTotal = state.cartTotal -1 * state.cartItems[index].quantity * target.price;

        } else if (action === 'SET_CART_ITEM_QUANTITY') {
            if (payload !== undefined) {
                newItems = setItemQuanitity(state.cartItems, index, payload);

                if (payload <= 0) {
                    // remove the old item information
                    cartItemsCount = state.cartItemsCount -1 * state.cartItems[index].quantity;
                    cartTotal = state.cartTotal -1 * state.cartItems[index].quantity * target.price;
                } else {
                    // add the new information and remove the old information
                    cartItemsCount = state.cartItemsCount + payload - state.cartItems[index].quantity;
                    cartTotal = (payload - state.cartItems[index].quantity) * target.price;
                }
            }
        } else if (action === 'CHANGE_CART_ITEM_QUANTITY') {
            if (payload !== undefined) {

                newItems = changeItemQuanitity(state.cartItems, index, payload);
                
                if (payload + state.cartItems[index].quantity <= 0) {
                    // remove the old item information
                    cartItemsCount = state.cartItemsCount -1 * state.cartItems[index].quantity;
                    cartTotal = -1 * state.cartItems[index].quantity * target.price;
                } else {
                    // just apply the delta
                    cartItemsCount = state.cartItemsCount + payload;
                    cartTotal = state.cartItemsCount + payload * target.price;
                }
            } 
        }
    } else {
        if (action === 'ADD_CART_ITEM') {
            newItems = [...state.cartItems, new CartItem(target, 1)];
            cartItemsCount = state.cartItemsCount + 1;
            cartTotal = state.cartItemsCount + target.price;
        }
    }
    
    return {
        cartItems: newItems,
        isCartHidden: state.isCartHidden,
        cartItemsCount: cartItemsCount,
        cartTotal: cartTotal
    };
}

export type CART_ACTION_TYPES = {
    type: 'ADD_CART_ITEM' | 'REMOVE_CART_ITEM' | 'SET_CART_ITEM_QUANTITY' | 'CHANGE_CART_ITEM_QUANTITY' | 'SET_IS_CART_HIDDEN' | 'CLEAR_CART',
    payload: number | Product | CartItem | boolean | { product: Product, quantity: number } | { product: Product, delta: number }
}

export type CartState = {
    cartItems: CartItem[],
    isCartHidden: boolean,
    cartItemsCount: number,
    cartTotal: number
}

const initialState: CartState = {
    cartItems: [],
    isCartHidden: true,
    cartItemsCount: 0,
    cartTotal: 0
}

export const cartReducer: Reducer<CartState, CART_ACTION_TYPES> = (state: CartState, action: CART_ACTION_TYPES) => {
    switch (action.type) {
        case 'ADD_CART_ITEM':
            return updateCartItems(action.payload as Product, state, 'ADD_CART_ITEM');
        case 'REMOVE_CART_ITEM':
            return updateCartItems(action.payload as Product, state, 'REMOVE_CART_ITEM');
        case 'SET_CART_ITEM_QUANTITY':
            return updateCartItems((action.payload as CartItem).product, state, 'SET_CART_ITEM_QUANTITY', (action.payload as CartItem).quantity);
        case 'CHANGE_CART_ITEM_QUANTITY':
            return updateCartItems((action.payload as CartItem).product, state, 'CHANGE_CART_ITEM_QUANTITY', (action.payload as CartItem).quantity);
        case 'SET_IS_CART_HIDDEN':
            return {
                ...state,
                isCartHidden: action.payload as boolean
            };
        case 'CLEAR_CART':
            return updateCartItems(null, state, 'CLEAR_CART');
        default:
            console.error(`Unhandled type ${action.type} in userReducer`);
            return state;
    }
}

export const CartContext = createContext<{
    cartItems: CartItem[],
    addCartItem: (cartItem: Product) => void,
    removeCartItem: (cartItem: Product) => void,
    setCartItemQuantity: (cartItem: Product, quantity: number) => void,
    incrementCartItemQuantity: (cartItem: Product, delta: number) => void,
    isCartHidden: boolean,
    setIsCartHidden: (isCartHidden: boolean) => void,
    cartItemsCount: number
    cartTotal: number
}>({
    cartItems: [],
    addCartItem: (cartItem: Product) => {},
    removeCartItem: (cartItem: Product) => {},
    setIsCartHidden: (isCartHidden: boolean) => {},
    setCartItemQuantity: (cartItem: Product, quantity: number) => {},
    incrementCartItemQuantity: (cartItem: Product, delta: number) => {},
    isCartHidden: true,
    cartItemsCount: 0,
    cartTotal: 0,
});

interface CartContextProviderProps {
    children: React.ReactNode;
}

export const CartContextProvider = (props: CartContextProviderProps) => {
    
    const { children } = props;

    const [ {cartItems, isCartHidden, cartItemsCount, cartTotal }, dispatch ] = useReducer(cartReducer, initialState);

    const addCartItem = (cartItem: Product) => {
        dispatch({ type: 'ADD_CART_ITEM', payload: cartItem });
    }

    const removeCartItem = (cartItem: Product) => {
        dispatch({ type: 'REMOVE_CART_ITEM', payload: cartItem });
    }

    const setCartItemQuantity = (cartItem: Product, quantity: number) => {
        dispatch({ type: 'SET_CART_ITEM_QUANTITY', payload: { product: cartItem, quantity } });
    }

    const incrementCartItemQuantity = (cartItem: Product, delta: number) => {
        dispatch({ type: 'CHANGE_CART_ITEM_QUANTITY', payload: { product: cartItem, delta } });
    }

    const setIsCartHidden = (isCartHidden: boolean) => {
        dispatch({ type: 'SET_IS_CART_HIDDEN', payload: isCartHidden });
    }

    const value = {
        cartItems, isCartHidden, cartItemsCount, cartTotal,
        addCartItem, 
        removeCartItem,
        setCartItemQuantity,
        incrementCartItemQuantity,
        setIsCartHidden
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}