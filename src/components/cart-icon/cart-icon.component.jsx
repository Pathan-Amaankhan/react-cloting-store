import './cart-icon.styles.scss';
import {ReactComponent as ShoppingBagIcon} from '../../assets/shopping-bag.svg';
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";

const CartIcon = () => {
    const { showCart, setShowCart, cartCount } = useContext( CartContext );

    return (
        <div className='cart-icon-container' onClick={ () => setShowCart( ! showCart ) }>
            <ShoppingBagIcon className='shopping-icon' />
            <span className='item-count'>{ cartCount }</span>
        </div>
    );
}


export default CartIcon;
