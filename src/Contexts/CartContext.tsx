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

export const CartContext = createContext<{
    cartItems: CartItem[],
    addCartItem: (cartItem: Product) => void
    isCartHidden: boolean,
    setIsCartHidden: (isCartHidden: boolean) => void,
    cartItemsCount: number
}>({
    cartItems: [],
    addCartItem: (cartItem: Product) => {},
    isCartHidden: true,
    setIsCartHidden: (isCartHidden: boolean) => {},
    cartItemsCount: 0
});

interface CartContextProviderProps {
    children: React.ReactNode;
}

export const CartContextProvider = (props: CartContextProviderProps) => {
    const { children } = props;

    const [isCartHidden, setIsCartHidden] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {
        let count = 0;
        cartItems.forEach(cartItem => count += cartItem.quantity);
        setCartItemsCount(count);
    }, [cartItems])

    const addCartItem = (cartItem: Product) => setCartItems(cartItems => addItemToItems(cartItem, cartItems));
    
    const value = { isCartHidden, setIsCartHidden, cartItems, addCartItem, cartItemsCount };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}