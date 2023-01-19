import {
    Arrow,
    CheckoutItemContainer,
    ImageContainer,
    Name,
    Price,
    Quantity,
    RemoveButton, Value
} from "./checkout-item.styles";
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart, clearItemFromCart, removeItemFromCart} from "../../store/cart/cart.action";
import {getCartItems} from "../../store/cart/cart.selector";

const CheckoutItem = ( { checkoutItem } ) => {
    const { imageUrl, name, quantity, price } = checkoutItem;

    const cartItems = useSelector( getCartItems );

    const dispatch = useDispatch();

    const clearItemHandler = () => dispatch( clearItemFromCart( cartItems, checkoutItem ) );
    const addItemToCartHandler = () => dispatch( addItemToCart( cartItems, checkoutItem ) );
    const removeItemFromCartHandler = () => dispatch( removeItemFromCart( cartItems, checkoutItem ) );

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={ imageUrl } alt={ name } />
            </ImageContainer>

            <Name> { name } </Name>

            <Quantity>
                <Arrow onClick={ removeItemFromCartHandler }> &#10094; </Arrow>
                <Value>{ quantity }</Value>
                <Arrow onClick={ addItemToCartHandler }> &#10095; </Arrow>
            </Quantity>

            <Price> ${ price } </Price>
            <RemoveButton onClick={ clearItemHandler }>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
}

export default CheckoutItem;