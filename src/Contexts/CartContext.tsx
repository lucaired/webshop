import { createContext, useState } from "react";
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

    if (index !== -1) {
        items[index].quantity += 1
        return items
    } else {
        return [...items, new CartItem(newProduct, 1)]
    }
}

export const CartContext = createContext<{
    cartItems: CartItem[],
    addCartItem: (cartItem: Product) => void
    isCartHidden: boolean,
    setIsCartHidden: (isCartHidden: boolean) => void
}>({
    cartItems: [],
    addCartItem: (cartItem: Product) => {},
    isCartHidden: true,
    setIsCartHidden: (isCartHidden: boolean) => {},
});

interface CartContextProviderProps {
    children: React.ReactNode;
}

export const CartContextProvider = (props: CartContextProviderProps) => {
    const { children } = props;

    const [isCartHidden, setIsCartHidden] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const addCartItem = (cartItem: Product) => setCartItems(addItemToItems(cartItem, cartItems));
    const value = { isCartHidden, setIsCartHidden, cartItems, addCartItem };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}