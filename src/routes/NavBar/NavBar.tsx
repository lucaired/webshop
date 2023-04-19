import { Fragment, useContext } from "react"; 
import './NavBar.scss';
/**
 * Renders nothing, but can have children. This allows us to render the NavBar
 * without having to use a surrounding div. Divs are fine normally, but they
 * can cause problems when using flexbox. See the following link for more info:
 * https://stackoverflow.com/questions/41421596/why-doesnt-flexbox-work-on-direct-child-of-body
 */

import { Link, Outlet } from "react-router-dom"; // shows the child routes
import { UserContext } from "../../contexts/UserContext";

const NavBar = () => {

    const {user} = useContext(UserContext);
    
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                </Link>
                <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>
                    SHOP
                </Link>
                {user && user.isLoggedIn
                 ? <p>{user?.name}</p>
                 : <Link className='nav-link' to='/sign-in'>
                    SIGN IN
                    </Link>
                }                
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default NavBar;