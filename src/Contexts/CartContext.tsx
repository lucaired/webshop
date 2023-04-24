import { createContext, useEffect, useState } from "react";
import { Product } from "./ProductsContext";

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

    const [isCartHidden, setIsCartHidden] = useState(true);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        let count = 0;
        cartItems.forEach(cartItem => count += cartItem.quantity);
        setCartItemsCount(count);

        setCartTotal(
            cartItems.reduce((total, cartItem) => total += cartItem.quantity * cartItem.product.price, 0)
        );
    }, [cartItems])

    const addCartItem = (cartItem: Product) => setCartItems(cartItems => addItemToItems(cartItem, cartItems));
    const removeCartItem = (cartItem: Product) => setCartItems(cartItems => removeItemFromItems(cartItem, cartItems));
    const setCartItemQuantity = (cartItem: Product, quantity: number) => setCartItems(cartItems => setQuantityForCartItem(cartItem, cartItems, quantity));
    const incrementCartItemQuantity = (cartItem: Product, delta: number) => setCartItems(cartItems => incrementQuantityForCartItem(cartItem, cartItems, delta));
    
    const value = { 
        cartItems,
        addCartItem,
        removeCartItem,
        setIsCartHidden,
        setCartItemQuantity,
        incrementCartItemQuantity,
        isCartHidden,
        cartItemsCount,
        cartTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}