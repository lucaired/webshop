import { useContext } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import ProductCard from "./ProductCard";

const Shop = () => {

    const { products } = useContext(ProductsContext);

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gridGap: '10px'
            }}
        >
            {products.map((product, index) => <ProductCard key={index} product={product} />)}
        </div>
    );
}
export default Shop;