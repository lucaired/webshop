import { createContext, useState } from "react";

export class CartItem {
    name: string;
    price: number;
    quantity: number;

    constructor(name: string, price: number, quantity: number) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

export const CartContext = createContext<{
    cartItems: CartItem[],
    setCartItems: (cartItems: CartItem[]) => void
    isCartHidden: boolean,
    setIsCartHidden: (isCartHidden: boolean) => void
}>({
    cartItems: [],
    setCartItems: (cartItems: CartItem[]) => {},
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
    const value = { isCartHidden, setIsCartHidden, cartItems, setCartItems };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}