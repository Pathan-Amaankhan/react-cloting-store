import {Outlet} from 'react-router-dom';
import {Fragment, useContext} from "react";
import {ReactComponent as CrownLogo} from "../../assets/crown.svg";
import {UserContext} from "../../contexts/user.context";
import {signUserOut} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.components";
import {CartContext} from "../../contexts/cart.context";
import {LogoContainer, NavigationContainer, NavLink, NavLinksContainer} from "./navigation.styles";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);

    const { showCart } = useContext( CartContext );

    return (
      <Fragment>
          <NavigationContainer>

              <LogoContainer to='/'>
                  <CrownLogo className='logo' />
              </LogoContainer>

              <NavLinksContainer>
                  <NavLink to='/shop'>
                      SHOP
                  </NavLink>

                  {
                      currentUser ? (
                          <NavLink as='span' className='nav-link' onClick={signUserOut}>
                              SIGN OUT
                          </NavLink>
                      ) : (
                          <NavLink to='/sign-in'>
                              SIGN IN
                          </NavLink>
                      )
                  }

                  <CartIcon />
              </NavLinksContainer>

              { showCart && <CartDropdown /> }
          </NavigationContainer>

          <Outlet />
      </Fragment>
    );
}

export default Navigation;