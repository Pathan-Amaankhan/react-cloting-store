import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {
    Arrow,
    CheckoutItemContainer,
    ImageContainer,
    Name,
    Price,
    Quantity,
    RemoveButton, Value
} from "./checkout-item.styles";

const CheckoutItem = ( { checkoutItem } ) => {
    const { imageUrl, name, quantity, price } = checkoutItem;

    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext( CartContext );

    const clearItemHandler = () => clearItemFromCart( checkoutItem );
    const addItemToCartHandler = () => addItemToCart( checkoutItem );
    const removeItemFromCartHandler = () => removeItemFromCart( checkoutItem );

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