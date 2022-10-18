import {Link, Outlet} from 'react-router-dom';
import {Fragment, useContext, useState} from "react"
import {ReactComponent as CrownLogo} from "../../assets/crown.svg";
import './navigation.styles.scss';
import {UserContext} from "../../contexts/user.context";
import {signUserOut} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.components";
import {CartContext} from "../../contexts/cart.context";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);

    const { showCart } = useContext( CartContext );

    return (
      <Fragment>
          <div className='navigation'>

              <Link className='logo-container' to='/'>
                  <CrownLogo className='logo' />
              </Link>

              <div className='nav-links-container'>
                  <Link className='nav-link' to='/shop'>
                      SHOP
                  </Link>

                  {
                      currentUser ? (
                          <Link className='nav-link' onClick={signUserOut}>
                              SIGN OUT
                          </Link>
                      ) : (
                          <Link className='nav-link' to='/sign-in'>
                              SIGN IN
                          </Link>
                      )
                  }

                  <CartIcon />
              </div>

              { showCart && <CartDropdown /> }
          </div>

          <Outlet />
      </Fragment>
    );
}

export default Navigation;