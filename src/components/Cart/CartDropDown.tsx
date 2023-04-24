import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import CartItemCard from "./CartItemCard";

const CartDropDown = () => {
    const { cartItems, cartItemsCount } = useContext(CartContext)

    return (
        <div
            style={{
                width: '240px',
                height: '340px',
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                border: '1px solid black',
                backgroundColor: 'white',
                top: '90px',
                right: '40px',
                zIndex: 5
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
            <button
                style={{
                    marginTop: 'auto',
                }}
            >
                GO TO CHECKOUT
            </button>
        </div>
    )
}

export default CartDropDown;