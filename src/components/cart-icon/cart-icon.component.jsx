import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {CartIconContainer, ItemCount, ShoppingIcon} from "./cart-icon.styles";

const CartIcon = () => {
    const { showCart, setShowCart, cartCount } = useContext( CartContext );

    return (
        <CartIconContainer onClick={ () => setShowCart( ! showCart ) }>
            <ShoppingIcon className='shopping-icon' />
            <ItemCount>{ cartCount }</ItemCount>
        </CartIconContainer>
    );
}


export default CartIcon;
