import './cart-icon.styles.scss';
import {ReactComponent as ShoppingBagIcon} from '../../assets/shopping-bag.svg';
import {useContext} from "react";
import {ShowCartContext} from "../../contexts/show-cart.context";

const CartIcon = () => {
    const { showCart, setShowCart } = useContext( ShowCartContext );

    return (
        <div className='cart-icon-container' onClick={ () => setShowCart( ! showCart ) }>
            <ShoppingBagIcon className='shopping-icon' />
            <span className='item-count'>0</span>
        </div>
    );
}


export default CartIcon;
