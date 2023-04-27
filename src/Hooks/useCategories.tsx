import { useEffect, useState } from "react"
import { getDocumentsFromCollection } from "../Utils/firebase";
import { Product } from "../Contexts/CategoryContext";

export interface Category {
    title: string;
    items: Product[];
}

export default function useCategories(){

    const [categories, setCategory] = useState<Map<string, Product[]>>(new Map());
    const [error, setError] = useState(null)
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        const queryCategory = async () => {
            try{
                setLoading(true);
                const newCategories = await getDocumentsFromCollection('collections');
                if (newCategories !== undefined) {
                    newCategories.forEach((category: Category) => {
                        const newProducts = category.items.map((item: any, index: number) => new Product(index, item.name, item.imageUrl, item.price));
                        const lowerCaseTitle = category.title.toLowerCase();
                        setCategory((prev) => new Map(prev).set(lowerCaseTitle, newProducts));
                    })
                }
            } catch (error: any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        queryCategory();
    }, []);

    return { categories, error, loading }

}