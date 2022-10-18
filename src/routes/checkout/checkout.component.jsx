import './checkout.styles.scss';
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import {Link} from "react-router-dom";
import Button from "../../components/button/button.component";

const Checkout = () => {
    const { cartItems, cartCount, cartTotal } = useContext(CartContext);

    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
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
            </div>

            {
                cartCount ?
                    cartItems.map( ( cartItem ) => ( <CheckoutItem key={cartItem.id} checkoutItem={cartItem} /> ) ) :
                    (
                        <div className='empty-message'>
                            <span className='message-text'>Cart is empty</span>

                            <Link to='/shop'>
                                <Button>Shop Now</Button>
                            </Link>
                        </div>
                    )
            }

            <div className='total'>
                Total: ${ cartTotal }
            </div>
        </div>
    );
}

export default Checkout;