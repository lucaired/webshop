import CartItemCard from "./CartItemCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../Store/cart/cart.selector";
import { clearCart, setIsCartHidden } from "../../Store/cart/cart.actions";

const CartDropDown = () => {

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const navigate = useNavigate();

    function handleClearCartButtonClick(): void {
        dispatch(clearCart());
        dispatch(setIsCartHidden(true));
    }

    return (
        <div
            style={{
                width: '240px',
                height: '380px',
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                border: '1px solid black',
                backgroundColor: 'white',
                top: '110px',
                right: '55px',
                zIndex: 5,
                boxShadow: '0 0 5px black',
                borderRadius: '0.5rem',
            }}
        >
            <div
                style={{
                    // otherwise the scroll bar will look weird
                    overflowY: cartItems.length > 3 ? 'scroll' : 'hidden',
                }}
            >
                {cartItems.map((cartItem, index) => 
                    <CartItemCard 
                        cartItem={cartItem}
                        key={index+cartItem.product.id}
                    />
                )}
            </div>
            <h3>Total: {cartTotal} €</h3>
            <button
                style={{
                    marginTop: 'auto',
                    marginBottom: '10px',
                }}
                onClick={()=>handleClearCartButtonClick()}
            >
                CLEAR CART
            </button>
            <button
                onClick={()=>navigate('/checkout')}
            >
                GO TO CHECKOUT
            </button>
        </div>
    )
}

export default CartDropDown;