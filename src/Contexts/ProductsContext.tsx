import { createContext, useState } from "react";

import SHOP_DATA from './shop-data.json';

/**
 * - Define the Product class
 * - Define the ProductsContext with the products and setProducts
 * - Define the ProductsContextProvider that will be used in the App.tsx
 *   it has to wrap the shop component.
 * - The ProductsContextProvider will be used in the index.tsx
 *
 */

export class Product {
    id: number;
    name: string;
    imageUrl: string;
    price: number;

    constructor(id: number, name: string, imageUrl: string, price: number) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.price = price;
    }
}

export const ProductsContext = createContext<{
    products: Product[],
    setProducts: (products: Product[]) => void
}>({
    products: [],
    setProducts: (products: Product[]) => {}
});

interface ProductsContextProviderProps {
    children: React.ReactNode;
}

export const ProductsContextProvider = (props: ProductsContextProviderProps) => {

    const {children} = props;

    const [products, setProducts] = useState<Product[]>(
        SHOP_DATA.map((item, index) => new Product(index, item.name, item.imageUrl, item.price))
    );

    return (
        <ProductsContext.Provider value={{
            products: products,
            setProducts: setProducts
        }}>
            {children}
        </ProductsContext.Provider>
    )

}