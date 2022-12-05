import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import {Link} from "react-router-dom";
import Button from "../../components/button/button.component";
import {CheckoutContainer, CheckoutHeader, EmptyMessage, Total} from "./checkout.styles";

const Checkout = () => {
    const { cartItems, cartCount, cartTotal } = useContext(CartContext);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </CheckoutHeader>

            {
                cartCount ?
                    cartItems.map( ( cartItem ) => ( <CheckoutItem key={cartItem.id} checkoutItem={cartItem} /> ) ) :
                    (
                        <EmptyMessage>
                            <span className='message-text'>Cart is empty</span>

                            <Link to='/shop'>
                                <Button>Shop Now</Button>
                            </Link>
                        </EmptyMessage>
                    )
            }

            <Total> Total: ${ cartTotal } </Total>
        </CheckoutContainer>
    );
}

export default Checkout;