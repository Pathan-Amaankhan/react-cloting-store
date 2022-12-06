import {createContext, useReducer} from "react";

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

const INITIAL_STATE = {
    showCart: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

export const CartContext = createContext( INITIAL_STATE );

const CART_ACTION_TYPE = {
    UPDATE_SHOW_CART: 'UPDATE_SHOW_CART',
    UPDATE_CART_ITEMS: 'UPDATE_CART_ITEMS',
};

const CartReducer = ( state, action ) => {
    const { type, payload } = action;

    switch ( type ) {
        case CART_ACTION_TYPE.UPDATE_SHOW_CART:
            return {
                ...state,
                showCart: payload.showCart,
            }
        case CART_ACTION_TYPE.UPDATE_CART_ITEMS:
            return {
                ...state,
                ...payload,
            }
        default:
            throw new Error( `Unhandled type ${type} in CartReducer` );
    }
}

export const CartProvider = ( { children } ) => {
    const [ { showCart, cartItems, cartCount, cartTotal }, dispatch ] = useReducer( CartReducer, INITIAL_STATE );

    const updateCartReducer = ( newCartItems ) => {
        let payload = {};

        payload['cartItems'] = newCartItems;
        payload['cartCount'] = newCartItems.reduce( ( accumulator, currentValue ) => accumulator + currentValue.quantity, 0 );
        payload['cartTotal'] = newCartItems.reduce( ( accumulator, currentValue ) => ( currentValue.quantity * currentValue.price ) + accumulator, 0 );

        dispatch( { type: CART_ACTION_TYPE.UPDATE_CART_ITEMS, payload: payload } );
    }

    const addItemToCart = ( product ) => {
        const newCartItems = addCartItem( cartItems, product );
        updateCartReducer( newCartItems );
    }

    const removeItemFromCart = ( product ) => {
        const newCartItems = removeCartItem( cartItems, product );
        updateCartReducer( newCartItems );
    }

    const clearItemFromCart = ( product ) => {
        const newCartItems = clearCartItem( cartItems, product );
        updateCartReducer( newCartItems );
    }

    const setShowCart = ( showCart ) => {
        dispatch( { type: CART_ACTION_TYPE.UPDATE_SHOW_CART, payload: { showCart } } );
    }

    const value = { showCart, setShowCart, cartItems, addItemToCart, cartCount, removeItemFromCart, cartTotal, clearItemFromCart };
    
    return <CartContext.Provider value={ value }>
        { children }
    </CartContext.Provider>;
}