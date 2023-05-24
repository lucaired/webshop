import { useDispatch } from "react-redux";
import { removeCartItem, changeCartItemQuantity, setCartItemQuantity } from "../../Store/cart/cart.actions";
import { CartItem } from "../../Store/cart/cart.types";
import { Product } from "../../Store/categories/categories.types";

const CartItemQuantity = (props: CartItemCardProps) => {

    const dispatch = useDispatch();

    const handler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (parseInt(e.target.value) === 0) {
            dispatch(removeCartItem(props.cartItem.product));
        } else if (parseInt(e.target.value) === 10) {
            dispatch(changeCartItemQuantity(props.cartItem.product, 10))
        } else {
            dispatch(setCartItemQuantity(props.cartItem.product, parseInt(e.target.value)))
        }
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <label htmlFor="quantity">Quantity: </label>
            <select 
                name="quantity" 
                id="quantity"
                onChange={handler}
                value={props.cartItem.quantity}
                title="Quantity"
                style={{
                    marginLeft: '5px',
                    width: '50px'
                }}
            >
                <option value="0">0 (Remove)</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
    )
}

interface  CartItemCardProps {
    cartItem: CartItem
}

const CartItemCard = (props: CartItemCardProps) => {

    const dispatch = useDispatch();

    const { product } = props.cartItem

    function handleRemoveClick(product: Product): void {
        dispatch(removeCartItem(product));
    }

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
                    justifyContent: 'space-between',
                    padding: '0 10px',
                }}
            >   
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <span>{product.name}</span>
                    <span>Price: {' '}
                        <span style={{
                            fontWeight: 'bold',
                        }}>{product.price} €</span>
                    </span>
                </div>
                <CartItemQuantity 
                    cartItem={props.cartItem} 
                />
                <button
                    onClick={() => handleRemoveClick(product)}
                >
                    Remove
                </button>
            </div>
            <div>
            </div>
        </div>
    );
};

export default CartItemCard;