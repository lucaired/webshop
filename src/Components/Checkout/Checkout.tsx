import { Fragment, useEffect } from "react";
import './checkout.scss';
import { useDispatch, useSelector } from "react-redux";
import { changeCartItemQuantity, removeCartItem, setIsCartHidden } from "../../Store/cart/cart.actions";
import { CartItem } from "../../Store/cart/cart.types";
import { selectCartItems, selectCartTotal } from "../../Store/cart/cart.selector";

interface CheckoutCardProps {
    cartItem: CartItem;
}

const CheckoutCard = (props: CheckoutCardProps) => {
    const { cartItem } = props;
    const dispatch = useDispatch();

    const handler = (direction: string) => {
        if (direction === 'up') {
            dispatch(changeCartItemQuantity(props.cartItem.product, 1))
        } else if (direction === 'down') {
            const decrementedQuantity = cartItem.quantity - 1;
            if (decrementedQuantity === 0) {
                dispatch(removeCartItem(props.cartItem.product))
            } else {
                dispatch(changeCartItemQuantity(props.cartItem.product, -1))
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
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    useEffect(() => {
        dispatch(setIsCartHidden(true))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                {titles.map((title, index)=><span key={title+index}>{title}</span>)}
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {cartItems.map((cartItem, index) => <CheckoutCard key={cartItem.product.name + index} cartItem={cartItem} />)}
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