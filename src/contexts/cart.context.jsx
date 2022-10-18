import {createContext, useEffect, useState} from "react";

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

export const CartContext = createContext( {
    showCart: false,
    setShowCart: () => null,
    cartItems: [],
    addItemToCart: () => null,
    removeItemFromCart: () => null,
    clearItemFromCart: () => null,
    cartCount: 0,
    cartTotal: 0,
} );


export const CartProvider = ( { children } ) => {
    const [ showCart, setShowCart ] = useState( false );
    const [ cartItems, setCartItems ] = useState( [] );
    const [ cartCount, setCartCount ] = useState( 0 );
    const [ cartTotal, setCartTotal ] = useState( 0 );

    useEffect( () => {
        const count = cartItems.reduce( ( accumulator, currentValue ) => accumulator + currentValue.quantity, 0 );
        setCartCount( count );
    }, [ cartItems ] );

    useEffect( () => {
        const total = cartItems.reduce( ( accumulator, currentValue ) => ( currentValue.quantity * currentValue.price ) + accumulator, 0 );
        setCartTotal( total );
    }, [ cartItems ] );

    const addItemToCart = ( productToAdd ) => {
        setCartItems( addCartItem( cartItems, productToAdd ) );
    }

    const removeItemFromCart = ( product ) => {
        setCartItems( removeCartItem( cartItems, product ) );
    }

    const clearItemFromCart = ( product ) => {
        setCartItems( clearCartItem( cartItems, product )  );
    }

    const value = { showCart, setShowCart, cartItems, addItemToCart, cartCount, removeItemFromCart, cartTotal, clearItemFromCart };
    
    return <CartContext.Provider value={value}>
        { children }
    </CartContext.Provider>;
}