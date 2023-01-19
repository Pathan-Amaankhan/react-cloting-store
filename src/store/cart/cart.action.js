import {CART_ACTION_TYPES as CART_ACTION_TYPE} from "./cart.types";

const addCartItem = ( cartItems, productToAdd ) => {

    const cartItemExists = cartItems.find( item => item.id === productToAdd.id );

    if ( cartItemExists ) {
        return cartItems.map( item => item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item );
    }

    return [ ...cartItems, { ...productToAdd, quantity: 1 } ];
}

const removeCartItem = ( cartItems, product ) => {
    const cartItemExists = cartItems.find( item => item.id === product.id );

    if ( ! cartItemExists ) {
        return cartItems;
    }

    if ( product.quantity < 2 ) {
        return cartItems.filter( item => item.id !== product.id );
    }

    return cartItems.map( item => item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item );
}

const clearCartItem = ( cartItems, product ) => {
    return cartItems.filter( item => item.id !== product.id );
}

const updateCartReducer = ( newCartItems ) => {
    let payload = {};

    payload['cartItems'] = newCartItems;
    payload['cartCount'] = newCartItems.reduce( ( accumulator, currentValue ) => accumulator + currentValue.quantity, 0 );
    payload['cartTotal'] = newCartItems.reduce( ( accumulator, currentValue ) => ( currentValue.quantity * currentValue.price ) + accumulator, 0 );

    return { type: CART_ACTION_TYPE.UPDATE_CART_ITEMS, payload: payload };
}

export const addItemToCart = ( cartItems, product ) => {
    const newCartItems = addCartItem( cartItems, product );
    return updateCartReducer( newCartItems );
}

export const removeItemFromCart = ( cartItems, product ) => {
    const newCartItems = removeCartItem( cartItems, product );
    return updateCartReducer( newCartItems );
}

export const clearItemFromCart = ( cartItems, product ) => {
    const newCartItems = clearCartItem( cartItems, product );
    return updateCartReducer( newCartItems );
}

export const setShowCart = ( showCart ) => ( { type: CART_ACTION_TYPE.UPDATE_SHOW_CART, payload: { showCart } } );