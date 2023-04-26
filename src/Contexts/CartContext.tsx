import React, { Reducer, createContext, useEffect, useReducer } from "react";
import { Product } from "./CategoryContext";

export class CartItem {
    product: Product;
    quantity: number;

    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }
}

function increaseItemQuanitity(items: CartItem[], index: number): CartItem[] {
    return items.map((currentItem, currentIndex) => {
        return (currentIndex === index)
            ? new CartItem(currentItem.product, currentItem.quantity + 1)
            : currentItem;
    });
}

type updateCartItemsAction = 'ADD_CART_ITEM' | 'REMOVE_CART_ITEM' | 'SET_CART_ITEM_QUANTITY' | 'INCREMENT_CART_ITEM_QUANTITY' | 'CLEAR_CART';

const updateCartItems = (target: Product, items: CartItem[], action: updateCartItemsAction, payload?: number): CartItem[] => {
    if (action === 'CLEAR_CART') {
        return [];
    } else {
        const index = items.findIndex((currentItem) => currentItem.product.id === target.id);
        let newItems: CartItem[] = items;

        if (index !== -1) {
            if (action === 'ADD_CART_ITEM') {
                newItems = increaseItemQuanitity(items, index)
            } else if (action === 'REMOVE_CART_ITEM') {
                newItems = [...items.filter((currentItem) => currentItem.product.id !== target.id)];

            } else if (action === 'SET_CART_ITEM_QUANTITY') {
                if (payload !== undefined && payload > 0) {
                    newItems = items.map((currentItem, currentIndex) => {
                            return (currentIndex === index) 
                            ? new CartItem(currentItem.product, payload)
                            : currentItem;
                        });
                }
            } else if (action === 'INCREMENT_CART_ITEM_QUANTITY') {
                if (payload !== undefined && payload > 0) {
                    newItems = items.map((currentItem, currentIndex) => {
                            return (currentIndex === index) 
                            ? new CartItem(currentItem.product, currentItem.quantity + payload)
                            : currentItem;
                    });
                } 
            }
        } else {
            if (action === 'ADD_CART_ITEM') {
                newItems = [...items, new CartItem(target, 1)];
            }
        }
        return newItems;
    }
}

export type CART_ACTION_TYPES = {
    type: 'ADD_CART_ITEM' | 'REMOVE_CART_ITEM' | 'SET_CART_ITEM_QUANTITY' | 'INCREMENT_CART_ITEM_QUANTITY' | 'SET_IS_CART_HIDDEN' | 'SET_CART_TOTAL' | 'SET_CART_ITEMS_COUNT',
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
            return {
                ...state,
                cartItems: updateCartItems(action.payload as Product, state.cartItems, 'ADD_CART_ITEM')
            };
        case 'REMOVE_CART_ITEM':
            return {
                ...state,
                cartItems: updateCartItems(action.payload as Product, state.cartItems, 'REMOVE_CART_ITEM')
            };
        case 'SET_CART_ITEM_QUANTITY':
            return {
                ...state,
                cartItems: updateCartItems((action.payload as CartItem).product, state.cartItems, 'SET_CART_ITEM_QUANTITY', (action.payload as CartItem).quantity)
            };
        case 'INCREMENT_CART_ITEM_QUANTITY':
            return {
                ...state,
                cartItems: updateCartItems((action.payload as CartItem).product, state.cartItems, 'INCREMENT_CART_ITEM_QUANTITY', (action.payload as CartItem).quantity)
            };
        case 'SET_IS_CART_HIDDEN':
            return {
                ...state,
                isCartHidden: action.payload as boolean
            };
        case 'SET_CART_ITEMS_COUNT':
            return {
                ...state,
                cartItemsCount: action.payload as number
            };
        case 'SET_CART_TOTAL':
            return {
                ...state,
                cartTotal: action.payload as number
            };
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

    /*
    useEffect(() => {
        // TODO: bring this functionality into the reducer
        const count = cartItems.reduce((total: number, cartItem: CartItem) => total += cartItem.quantity, 0);
        dispatch({ type: 'SET_CART_ITEMS_COUNT', payload: count });
        
        if (count === 0) {
            dispatch({ type: 'SET_IS_CART_HIDDEN', payload: true });
        }

        dispatch({ type: 'SET_CART_TOTAL', payload: cartItems.reduce((total: number, cartItem: CartItem) => total += cartItem.quantity * cartItem.product.price, 0) });

    }, [cartItems])
    */

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
        dispatch({ type: 'INCREMENT_CART_ITEM_QUANTITY', payload: { product: cartItem, delta } });
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