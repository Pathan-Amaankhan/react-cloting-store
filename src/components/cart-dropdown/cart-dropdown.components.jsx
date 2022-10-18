import Button from "../button/button.component";
import './cart-dropdown.styles.scss';
import {Fragment, useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";
import {useNavigate} from "react-router-dom";

const CartDropdown = () => {

    const { cartItems, cartCount } = useContext( CartContext );

    const navigate = useNavigate();

    return (
        <div className='cart-dropdown-container'>
            {
                cartCount ? (
                    <Fragment>
                    <div className='cart-items'>
                        { cartItems.map( cartItem => ( <CartItem key={cartItem.id} item={cartItem} /> ) ) }
                    </div>
                    </Fragment>
                ) : ( <div className='empty-message'>Cart is empty</div> )
            }

            <Button onClick={() => navigate( '/checkout' )}>GO TO CHECKOUT</Button>
        </div>
    );
}

export default CartDropdown;