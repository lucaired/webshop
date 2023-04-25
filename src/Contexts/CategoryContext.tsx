import { createContext } from "react";

import useCategories from "../hooks/useCategories";

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

export const CategoriesContext = createContext<{
    categories: Map<string, Product[]>,
}>({
    categories: new Map(),
});

interface CategoriesContextProviderProps {
    children: React.ReactNode;
}

export const CategoriesContextProvider = (props: CategoriesContextProviderProps) => {

    const { categories, error, loading } = useCategories()
    const {children} = props;

    return (
        <CategoriesContext.Provider value={{
            categories: categories,
        }}>
            {children}
        </CategoriesContext.Provider>
    )

}