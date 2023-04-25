import { Product } from "../../contexts/CategoryContext";
import ProductCard from "./ProductCard";

interface CategoryPreviewProps {
    category: string;
    index: number;
    products: Product[]
}

const CategoryPreview = (props: CategoryPreviewProps) => {
    const { category, index, products } = props;

    return (
        <div key={index}>
        <h2
        >
            {category}</h2>
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gridGap: '10px'
            }}
        >
            {products.slice(0,4).map((product, index) => <ProductCard key={index} product={product} />)}
        </div>
    </div>
    )
}

export default CategoryPreview;