import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Renders nothing, but can have children. This allows us to render the NavBar
 * without having to use a surrounding div. Divs are fine normally, but they
 * can cause problems when using flexbox. See the following link for more info:
 * https://stackoverflow.com/questions/41421596/why-doesnt-flexbox-work-on-direct-child-of-body
 */

import { Outlet } from "react-router-dom"; // shows the child routes
import { signOutUser } from "../../Utils/Firebase/firebase";
import CartIcon from "../../Components/Cart/CartIcon";
import CartDropDown from "../../Components/Cart/CartDropDown";
import NavBarElement from "./NavBarElement";
import NavBarElementLink from "./NavBarElementLink";
import NavBarIcon from "./NavBarIcon";
import { selectIsCartHidden, selectCartItemsCount } from "../../Store/cart/cart.selector";
import { setIsCartHidden } from "../../Store/cart/cart.actions";
import { setCurrentUser } from "../../Store/user/user.actions";
import { LocalUser } from "../../Store/user/user.types";
import { selectCurrentUser } from "../../Store/user/user.selectors";

const NavBar = () => {
  const dispatch = useDispatch();

  const localUser: LocalUser = useSelector(selectCurrentUser);

  const signOutHandler = async () => {
    try {
      await signOutUser();
      dispatch(setCurrentUser(undefined));
    } catch (error) {
      console.log(error);
    }
  };

  const isCartHidden = useSelector(selectIsCartHidden);
  const cartItemsCount = useSelector(selectCartItemsCount);

  function handleCartIconClick(): void {
    cartItemsCount && dispatch(setIsCartHidden(!isCartHidden))
  }

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <NavBarElement
            style={{
              paddingRight: "10px",
            }}
          >
            <NavBarIcon/>
          </NavBarElement>
          <NavBarElement>
            <NavBarElementLink link="/home" text="HOME" />
          </NavBarElement>
          <NavBarElement>
            <NavBarElementLink link="/shop" text="SHOP" />
          </NavBarElement>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {localUser && localUser.isLoggedIn ? (
            <NavBarElement>
              <span onClick={() => signOutHandler()}>
                <span style={{ textDecoration: "none" }}>
                  {localUser.name} |{" "}
                </span>
                SIGN OUT
              </span>
            </NavBarElement>
          ) : (
            <NavBarElement>
              <NavBarElementLink link="/sign-in" text="SIGN IN" />
            </NavBarElement>
          )}
          <NavBarElement>
          <CartIcon
            onClickHandler={() => handleCartIconClick()}
          />
          </NavBarElement>
        </div>
        {!isCartHidden && <CartDropDown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default NavBar;
