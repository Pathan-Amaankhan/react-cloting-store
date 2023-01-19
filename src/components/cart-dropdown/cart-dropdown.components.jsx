import Button from "../button/button.component";
import {Fragment} from "react";
import CartItem from "../cart-item/cart-item.component";
import {useNavigate} from "react-router-dom";
import {ButtonContainer, CartDropDownContainer, CartItems, EmptyMessage} from "./cart-dropdown.styles";
import {useDispatch, useSelector} from "react-redux";
import {setShowCart} from "../../store/cart/cart.action";
import {getCartItems, getCartCount} from "../../store/cart/cart.selector";

const CartDropdown = () => {

    const cartItems = useSelector( getCartItems );
    const cartCount = useSelector( getCartCount );

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const navigateToCheckout = () => {
        dispatch( setShowCart( false ) );
        navigate( '/checkout' );
    }

    return (
        <CartDropDownContainer>
            {
                cartCount ? (
                    <Fragment>
                        <CartItems>
                            { cartItems.map( cartItem => ( <CartItem key={cartItem.id} item={cartItem} /> ) ) }
                        </CartItems>
                    </Fragment>
                ) : ( <EmptyMessage>Cart is empty</EmptyMessage> )
            }

            <ButtonContainer>
                <Button onClick={navigateToCheckout}>GO TO CHECKOUT</Button>
            </ButtonContainer>
        </CartDropDownContainer>
    );
}

export default CartDropdown;