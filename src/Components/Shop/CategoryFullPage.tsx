import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { selectCategories } from "../../Store/categories/categories.selector";
import { useSelector } from "react-redux";
import { Product } from "../../Store/categories/categories.reducer";

const CategoryFullPage = () => {
    
    const categories = useSelector(selectCategories);
    const { categorySlug } = useParams<{categorySlug: string}>();
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