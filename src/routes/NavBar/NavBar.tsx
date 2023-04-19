import { Fragment, useContext } from "react"; 
/**
 * Renders nothing, but can have children. This allows us to render the NavBar
 * without having to use a surrounding div. Divs are fine normally, but they
 * can cause problems when using flexbox. See the following link for more info:
 * https://stackoverflow.com/questions/41421596/why-doesnt-flexbox-work-on-direct-child-of-body
 */

import { Link, Outlet } from "react-router-dom"; // shows the child routes
import { LocalUserContext } from "../../contexts/UserContext";

const NavBar = () => {

    const { localUser } = useContext(LocalUserContext);
    
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
                {localUser && localUser.isLoggedIn
                 ? <p>{localUser?.name}</p>
                 : <Link className='nav-link' to='/sign-in'>
                    SIGN IN
                    </Link>
                }                
            </div>
            <Outlet />
        </Fragment>
    )
}

export default NavBar;