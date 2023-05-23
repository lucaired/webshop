import { Fragment, useContext } from "react"; 
import { useDispatch, useSelector } from 'react-redux';

/**
 * Renders nothing, but can have children. This allows us to render the NavBar
 * without having to use a surrounding div. Divs are fine normally, but they
 * can cause problems when using flexbox. See the following link for more info:
 * https://stackoverflow.com/questions/41421596/why-doesnt-flexbox-work-on-direct-child-of-body
 */

import { Link, Outlet } from "react-router-dom"; // shows the child routes
import { signOutUser } from "../../Utils/Firebase/firebase";
import CartIcon from "../../Components/Cart/CartIcon";
import CartDropDown from "../../Components/Cart/CartDropDown";
import { CartContext } from "../../Contexts/CartContext";
import { LocalUser, selectCurrentUser, setCurrentUser } from "../../Store/user";
import NavBarElement from "./NavBarElement";

const NavBar = () => {

    const dispatch = useDispatch();

    const localUser: LocalUser = useSelector(selectCurrentUser);

    const signOutHandler = async () => {
         await signOutUser();
         dispatch(setCurrentUser(null));
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
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '1rem',
                    }}
                >
                <NavBarElement link='/home' text='HOME'/>
                <NavBarElement link='/shop' text='SHOP'/>
                </div>
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
                            <span style={{textDecoration: 'none'}}>{localUser.name}{' '}|{' '}</span>SIGN OUT
                        </p>
                    : <NavBarElement link='/sign-in' text='SIGN IN'/>
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