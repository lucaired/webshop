import { Fragment, useContext, useState } from "react"; 
/**
 * Renders nothing, but can have children. This allows us to render the NavBar
 * without having to use a surrounding div. Divs are fine normally, but they
 * can cause problems when using flexbox. See the following link for more info:
 * https://stackoverflow.com/questions/41421596/why-doesnt-flexbox-work-on-direct-child-of-body
 */

import { Link, Outlet } from "react-router-dom"; // shows the child routes
import { LocalUserContext } from "../../contexts/UserContext";
import { signOutUser } from "../../utils/firebase";
import CartIcon from "../../components/Cart/CartIcon";
import CartDropDown from "../../components/Cart/CartDropDown";
import { CartContext } from "../../contexts/CartContext";

const NavBar = () => {

    const { localUser, setLocalUser } = useContext(LocalUserContext);
    
    const signOutHandler = async () => {
         await signOutUser();
         setLocalUser(null);
    }

    const {isCartHidden, setIsCartHidden, cartItemsCount} = useContext(CartContext);

    return (
        <Fragment>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                }}
            >
                <Link className='nav-link' to='/shop'>
                    SHOP
                </Link>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    {localUser && localUser.isLoggedIn
                    ? <p
                            onClick={() => signOutHandler()}
                            style={{
                                textDecoration: 'underline',
                                cursor: 'pointer',
                            }}
                        >
                            SIGN OUT
                        </p>
                    : <Link 
                            to='/sign-in'
                        >
                            SIGN IN
                        </Link>
                    }
                    <CartIcon
                        onClickHandler={() => cartItemsCount && setIsCartHidden(!isCartHidden)}
                    />      
                </div>
                {!isCartHidden && <CartDropDown/>}
            </div>
            <Outlet />
        </Fragment>
    )
}

export default NavBar;