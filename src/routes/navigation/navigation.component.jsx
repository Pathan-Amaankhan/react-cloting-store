import {Outlet} from 'react-router-dom';
import {Fragment} from "react";
import {ReactComponent as CrownLogo} from "../../assets/crown.svg";
import {signUserOut} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.components";
import {LogoContainer, NavigationContainer, NavLink, NavLinksContainer} from "./navigation.styles";
import {useSelector} from "react-redux";
import {getShowCart} from "../../store/cart/cart.selector";

const Navigation = () => {

    const currentUser = useSelector( state => state.user.currentUser );

    const showCart = useSelector( getShowCart );

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