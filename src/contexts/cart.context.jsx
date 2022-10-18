import {createContext, useEffect, useState} from "react";

const addCartItem = ( cartItems, productToAdd ) => {

    const cartItemExists = cartItems.find( item => item.id === productToAdd.id );

    if ( cartItemExists ) {
        return cartItems.map( item => item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item );
    }

    return [ ...cartItems, { ...productToAdd, quantity: 1 } ];
}

export const CartContext = createContext( {
    showCart: false,
    setShowCart: () => null,
    cartItems: [],
    addItemToCart: () => null,
    cartCount: 0,
} );


export const CartProvider = ( { children } ) => {
    const [ showCart, setShowCart ] = useState( false );
    const [ cartItems, setCartItems ] = useState( [] );
    const [ cartCount, setCartCount ] = useState( 0 );

    useEffect( () => {
        const count = cartItems.reduce( ( accumulator, currentValue ) => accumulator + currentValue.quantity, 0 );
        setCartCount( count );
    }, [ cartItems ] );

    const addItemToCart = ( productToAdd ) => {
        setCartItems( addCartItem( cartItems, productToAdd ) );
    }

    const value = { showCart, setShowCart, cartItems, addItemToCart, cartCount };
    
    return <CartContext.Provider value={value}>
        { children }
    </CartContext.Provider>;
}