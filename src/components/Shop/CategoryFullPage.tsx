import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CategoriesContext, Product } from "../../contexts/CategoryContext";
import ProductCard from "./ProductCard";

const CategoryFullPage = () => {
    
    const { categories } = useContext(CategoriesContext);
    const { categorySlug } = useParams<{categorySlug: string}>();
    console.log(categorySlug);
    const products: Product[] = categorySlug ? categories.get(categorySlug) || [] : []; 

    return (
        <div>
            <h2
                style={{
                    fontSize: '1.5rem',
                    marginBottom: '1rem',
                    cursor: 'pointer'
                }}
            >
                {categorySlug?.toUpperCase()}
            </h2>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gridGap: '20px'
                }}
            >
                {products.map((product, index) => <ProductCard key={index} product={product} />)}
            </div>
    </div>
    )
}

export default CategoryFullPage;