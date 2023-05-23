import { useContext } from "react";
import { CartContext } from "../../Contexts/CartContext";
import CartItemCard from "./CartItemCard";
import { useNavigate } from "react-router-dom";

const CartDropDown = () => {
    const { cartItems, cartTotal } = useContext(CartContext)
    const navigate = useNavigate();

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
                }}
                onClick={()=>navigate('/checkout')}
            >
                GO TO CHECKOUT
            </button>
        </div>
    )
}

export default CartDropDown;