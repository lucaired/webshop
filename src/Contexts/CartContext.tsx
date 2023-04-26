import { Reducer, createContext, useEffect, useReducer } from "react";
import { Product } from "./CategoryContext";

export class CartItem {
    product: Product;
    quantity: number;

    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }
}

const addItemToItems = (newProduct: Product, items: CartItem[]): CartItem[] => {
    let index = -1;
    
    items.forEach((currentItem, currentIndex) => {
        if (currentItem.product.id === newProduct.id) {
            index = currentIndex
        }
    })

    // make sure to always return a new array when doing state updates, otherwise stuff will not fire

    if (index !== -1) {
        return items.map((currentItem, currentIndex) => {
            return (currentIndex === index) 
            ? new CartItem(currentItem.product, currentItem.quantity + 1)
            : currentItem;
        });
    } else {
        return [...items, new CartItem(newProduct, 1)]
    }
}

const removeItemFromItems = (productToRemove: Product, items: CartItem[]): CartItem[] => {
    return [...items.filter((currentItem) => currentItem.product.id !== productToRemove.id)];
}

const setQuantityForCartItem = (product: Product, items: CartItem[], quantity: number): CartItem[] => {
    return items.map((currentItem) => {
        if (currentItem.product.id === product.id) {
            return new CartItem(currentItem.product, quantity);
        } else {
            return currentItem;
        }
    })
}

const incrementQuantityForCartItem = (product: Product, items: CartItem[], delta: number): CartItem[] => {
    return items.map((currentItem) => {
        if (currentItem.product.id === product.id) {
            return new CartItem(currentItem.product, currentItem.quantity + delta);
        } else {
            return currentItem;
        }
    })
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
                cartItems: addItemToItems(action.payload as Product, state.cartItems)
            };
        case 'REMOVE_CART_ITEM':
            return {
                ...state,
                cartItems: removeItemFromItems(action.payload as Product, state.cartItems)
            };
        case 'SET_CART_ITEM_QUANTITY':
            return {
                ...state,
                cartItems: setQuantityForCartItem((action.payload as CartItem).product, state.cartItems, (action.payload as CartItem).quantity)
            };
        case 'INCREMENT_CART_ITEM_QUANTITY':
            return {
                ...state,
                cartItems: incrementQuantityForCartItem((action.payload as CartItem).product, state.cartItems, (action.payload as CartItem).quantity)
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

    useEffect(() => {
        const count = cartItems.reduce((total: number, cartItem: CartItem) => total += cartItem.quantity, 0);
        dispatch({ type: 'SET_CART_ITEMS_COUNT', payload: count });
        
        if (count === 0) {
            dispatch({ type: 'SET_IS_CART_HIDDEN', payload: true });
        }

        dispatch({ type: 'SET_CART_TOTAL', payload: cartItems.reduce((total: number, cartItem: CartItem) => total += cartItem.quantity * cartItem.product.price, 0) });

    }, [cartItems])

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