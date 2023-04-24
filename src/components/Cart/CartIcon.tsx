import { useContext } from 'react';

// Use a SVG as a React Component !!!
import { ReactComponent as ShoppingIcon } from './shopping-bag.svg';
import { ProductsContext } from '../../contexts/ProductsContext';

interface CartIconProps {
    onClickHandler: () => void;
}

const CartIcon = (props: CartIconProps) => {
    const { onClickHandler } = props;

    const {products} = useContext(ProductsContext);

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
                {products.length}
            </span>
        </div>
    )
}

export default CartIcon;