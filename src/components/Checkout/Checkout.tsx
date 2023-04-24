import { Fragment, useContext } from "react";
import { CartContext, CartItem } from "../../contexts/CartContext";
import './checkout.scss';

interface CheckoutCardProps {
    cartItem: CartItem;
}

const CheckoutCard = (props: CheckoutCardProps) => {
    const { cartItem } = props;
    const { removeCartItem, incrementCartItemQuantity, setIsCartHidden } = useContext(CartContext);
    setIsCartHidden(true);

    const handler = (direction: string) => {
        if (direction === 'up') {
            incrementCartItemQuantity(props.cartItem.product, 1)
        } else if (direction === 'down') {
            const decrementedQuantity = cartItem.quantity - 1;
            if (decrementedQuantity === 0) {
                removeCartItem(props.cartItem.product)
            } else {
                incrementCartItemQuantity(props.cartItem.product, -1)
            }
        }
    }

    return <div
        className="checkout-card"
        style={{
            display: 'grid',
            gridTemplateColumns: '10% 40% 20% 20% 10%',
            alignItems: 'center',
            borderBottom: '1px solid black',
            padding: '10px 0'
        }}
    >
        <img 
            src={cartItem.product.imageUrl}
            alt={cartItem.product.name}
            style={{
                width: '100%',
                height: '100%',
            }}
        />
        <span>{cartItem.product.name}</span>
        <span>
            <span
                style={{
                    fontWeight: 'bold',
                    cursor: 'pointer',
                }}
                onClick={()=>handler('down')}
            >
                {'<  '}
            </span>
            {cartItem.quantity}
            <span
                style={{
                    fontWeight: 'bold',
                    cursor: 'pointer',
                }}
                onClick={()=>handler('up')}
            >
                {'  >'}
            </span>
        </span>
        <span>{cartItem.product.price} €</span>
        <span 
            onClick={()=>removeCartItem(cartItem.product)}
            style={{
                cursor: 'pointer',
            }}
        >
            &#10005;
        </span>
    </div>
}


const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext);
    
    const titles = ["Product", "Description", "Quantity", "Price", "Remove"]

    return (
        <Fragment>
            <div 
                style={{
                    display: 'grid',
                    gridTemplateColumns: '10% 40% 20% 20% 10%',
                    borderBottom: '1px solid black',
                }}
                className="checkout-title-bar"
            >
                {titles.map((title)=><span>{title}</span>)}
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {cartItems.map((cartItem) => <CheckoutCard cartItem={cartItem} />)}
            </div>
            <div>
                <h1>
                Total: {cartTotal} €
                </h1>
            </div>
        </Fragment>
    );
};
export default Checkout;