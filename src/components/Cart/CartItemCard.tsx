import { CartItem } from "../../contexts/CartContext";

interface  CartItemCardProps {
    cartItem: CartItem
}

const CartItemCard = (props: CartItemCardProps) => {
    const { product, quantity } = props.cartItem

    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                height: '80px',
                marginBottom: '15px'
            }}
        >
            <img 
                src={product.imageUrl} 
                alt={product.name} 
                style={{
                    width: '30%'
                }}
            />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    padding: '10px 20px'
                }}
            >
                <span>{product.name}</span>
                <span>{product.price} x {quantity}</span>
            </div>
        </div>
    );
};

export default CartItemCard;