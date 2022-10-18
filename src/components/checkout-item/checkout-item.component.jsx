import './checkout-item.styles.scss';
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";

const CheckoutItem = ( { checkoutItem } ) => {
    const { imageUrl, name, quantity, price } = checkoutItem;

    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext( CartContext );

    const clearItemHandler = () => clearItemFromCart( checkoutItem );
    const addItemToCartHandler = () => addItemToCart( checkoutItem );
    const removeItemFromCartHandler = () => removeItemFromCart( checkoutItem );

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={ imageUrl } alt={ name } />
            </div>

            <div className='name'> { name } </div>

            <div className='quantity'>
                <span className='arrow' onClick={ removeItemFromCartHandler }> &#10094; </span>
                <span className='value'>{ quantity }</span>
                <span className='arrow' onClick={ addItemToCartHandler }> &#10095; </span>
            </div>

            <div className='price'> ${ price } </div>
            <div className='remove-button' onClick={ clearItemHandler }>&#10005;</div>
        </div>
    );
}

export default CheckoutItem;