import {CartIconContainer, ItemCount, ShoppingIcon} from "./cart-icon.styles";
import {useDispatch, useSelector} from "react-redux";
import {setShowCart} from "../../store/cart/cart.action";
import {getCartCount, getShowCart} from "../../store/cart/cart.selector";

const CartIcon = () => {

    const showCart  = useSelector( getShowCart );
    const cartCount = useSelector( getCartCount );

    const dispatch = useDispatch();

    return (
        <CartIconContainer onClick={ () => dispatch( setShowCart( ! showCart ) ) }>
            <ShoppingIcon className='shopping-icon' />
            <ItemCount>{ cartCount }</ItemCount>
        </CartIconContainer>
    );
}


export default CartIcon;
