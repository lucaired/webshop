import { useNavigate } from "react-router-dom";

import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { selectCategories } from "../../Store/categories/categories.selector";
import { Product } from "../../Store/categories/categories.types";

const CategoryPreview = () => {

    const categories = useSelector(selectCategories);

    const navigate = useNavigate();

    if (categories instanceof Map && categories.size === 0) return (<div>There are no categories</div>)
    if (!(categories instanceof Map) && Object.keys(categories).length === 0) return (<div>There are no categories</div>)

    return (
        <div>
            {Array.from(categories.keys()).map((category, index) => {
                const products: Product[] = categories.get(category) || [];
                
                return (
                        <div key={index}>
                            <h2
                                style={{
                                    fontSize: '1.5rem',
                                    marginBottom: '1rem',
                                    cursor: 'pointer'
                                }}
                                onClick={()=>navigate(`/shop/${category}`)}
                            >
                                {category.toUpperCase()}
                            </h2>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(4, 1fr)',
                                    gridGap: '20px'
                                }}
                            >
                                {products.slice(0,4).map((product, index) => <ProductCard key={index} product={product} />)}
                            </div>
                        </div>
                )
            })}
        </div>
    )
}

export default CategoryPreview;