import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { selectCategories } from "../../Store/categories/categories.selector";
import { useSelector } from "react-redux";
import { Product } from "../../Store/categories/categories.types";

const CategoryFullPage = () => {
    
    const categories = useSelector(selectCategories);
    const { categorySlug } = useParams<{categorySlug: string}>();

    // This seems necessary because categories is first {} and then Map
    if (categories instanceof Map && categories.size === 0) return (<div>There are no categories</div>)
    if (!(categories instanceof Map) && Object.keys(categories).length === 0) return (<div>There are no categories</div>)

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