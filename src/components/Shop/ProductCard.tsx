import { useContext } from "react";
import { Product } from "../../contexts/ProductsContext";
import './product-card.styles.scss'
import { CartContext } from "../../contexts/CartContext";

interface ProductCardProps {
    product: Product;
}

const ProductCard = (props: ProductCardProps) => {
    const { name, price, imageUrl } = props.product;

    const { addCartItem } = useContext(CartContext);

    const addProductToCart = (product: Product) => {
        addCartItem(product)
    }

    return (
        <div
            className={"product-card-container"}
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '350px',
                alignItems: 'center',
                position: 'relative',
            }}
        >
            <img 
                style={{
                    width: '100%',
                    height: '95%',
                    objectFit: 'cover',
                    marginBottom: '5px'
                }}
                src={imageUrl}
                alt={name} 
            />
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    height: '5%',
                    justifyContent: 'space-between',
                    fontSize: '18px',
                }}
            >
                <span
                    style={{
                        width:"90%",
                        marginBottom: '15px'
                    }}
                >
                    {name}
                </span>
                <span
                    style={{
                        width:"10%",
                    }}
                >
                    {price}
                </span>
            </div>
            <button
                onClick={() => addProductToCart(props.product)}
            >
                ADD TO CART
            </button>
        </div>
    )
}

export default ProductCard;