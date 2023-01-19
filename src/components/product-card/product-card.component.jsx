import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {Footer, Name, Price, ProductCardContainer} from "./product-card.styles";
import {addItemToCart} from "../../store/cart/cart.action";
import {useDispatch, useSelector} from "react-redux";
import {getCartItems} from "../../store/cart/cart.selector";

export const ProductCard = ( { product } ) => {
    const { name, price, imageUrl } = product;

    const dispatch = useDispatch();

    const cartItems = useSelector( getCartItems );

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={name}  />
            <Footer>
                <Name> { name } </Name>
                <Price> { price } </Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={ () => dispatch( addItemToCart( cartItems, product ) ) }>Add to cart</Button>
        </ProductCardContainer>
    );
}