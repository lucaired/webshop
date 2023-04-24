import { useContext } from 'react';

// Use a SVG as a React Component !!!
import { ReactComponent as ShoppingIcon } from './shopping-bag.svg';
import { CartContext, CartItem } from '../../contexts/CartContext';

interface CartIconProps {
    onClickHandler: () => void;
}

const CartIcon = (props: CartIconProps) => {
    const { onClickHandler } = props;

    const { cartItems } = useContext(CartContext);

    const countProductsInCart = () => {
        let productCount = 0;
        cartItems.forEach((item: CartItem) => productCount += item.quantity)
        return productCount;
    }
    
    return (
        <div
            style={{
                width: '45px',
                height: '45px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
            }}
            onClick={onClickHandler}
        >
            <ShoppingIcon 
                style={{
                    width: '24px',
                    height: '24px'
                }}
            />
            <span
                style={{
                    position: 'absolute',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    bottom: '12px'
                }}
            >
                {countProductsInCart() || ''}
            </span>
        </div>
    )
}

export default CartIcon;