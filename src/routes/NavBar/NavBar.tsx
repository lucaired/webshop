import { Fragment, useContext } from "react"; 
/**
 * Renders nothing, but can have children. This allows us to render the NavBar
 * without having to use a surrounding div. Divs are fine normally, but they
 * can cause problems when using flexbox. See the following link for more info:
 * https://stackoverflow.com/questions/41421596/why-doesnt-flexbox-work-on-direct-child-of-body
 */

import { Link, Outlet } from "react-router-dom"; // shows the child routes
import { LocalUserContext } from "../../contexts/UserContext";
import { signOutUser } from "../../utils/firebase";

const NavBar = () => {

    const { localUser, setLocalUser } = useContext(LocalUserContext);
    
    const signOutHandler = async () => {
         await signOutUser();
         setLocalUser(null);
    }

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
            </div>
            <Outlet />
        </Fragment>
    )
}

export default NavBar;