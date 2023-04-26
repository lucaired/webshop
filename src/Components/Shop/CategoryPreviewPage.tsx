import { useNavigate } from "react-router-dom";
import { CategoriesContext, Product } from "../../Contexts/CategoryContext";
import ProductCard from "./ProductCard";
import { useContext } from "react";

const CategoryPreview = () => {

    const { categories } = useContext(CategoriesContext);

    const navigate = useNavigate();

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