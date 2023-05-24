import { useContext } from "react";
import './product-card.styles.scss'
import { CartContext } from "../../Contexts/CartContext";
import { Product } from "../../Store/categories/categories.reducer";

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
                height: '400px',
                alignItems: 'center',
                position: 'relative',
                boxShadow: '0 0 5px black',
                borderRadius: '0.5rem'
            }}
        >
            <img 
                style={{
                    width: '100%',
                    height: '95%',
                    objectFit: 'cover',
                    borderRadius: '0.5rem',
                    borderBottomLeftRadius: '0',
                    borderBottomRightRadius: '0',
                }}
                src={imageUrl}
                alt={name} 
            />
            <div
                style={{
                    display: 'flex',
                    width: '95%',
                    height: '5%',
                    justifyContent: 'space-between',
                    fontSize: '18px',
                }}
            >
                <span
                    style={{
                        marginBottom: '15px'
                    }}
                >
                    {name}
                </span>
                <span>
                    {price}€
                </span>
            </div>
            <button
                onClick={() => addProductToCart(props.product)}
                style={{
                    borderRadius: '0.5rem',
                    backgroundColor: 'white',
                    opacity: '0.75',
                }}
            >
                ADD TO CART
            </button>
        </div>
    )
}

export default ProductCard;