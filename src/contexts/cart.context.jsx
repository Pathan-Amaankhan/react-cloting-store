import {createContext, useEffect, useReducer} from "react";

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
    UPDATE_CART_COUNT: 'UPDATE_CART_COUNT',
    UPDATE_CART_TOTAL: 'UPDATE_CART_TOTAL',
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
            const getCartItems = ( state, payload ) => {
                switch ( payload.action ) {
                    case 'add':
                        return addCartItem( state.cartItems, payload.product );
                    case 'remove':
                        return removeCartItem( state.cartItems, payload.product );
                    case 'clear':
                        return clearCartItem( state.cartItems, payload.product );
                    default:
                        return state.cartItems;
                }
            };

            return {
                ...state,
                cartItems: getCartItems( state, payload ),
            }
        case CART_ACTION_TYPE.UPDATE_CART_COUNT:
            return {
                ...state,
                cartCount: payload.count
            }
        case CART_ACTION_TYPE.UPDATE_CART_TOTAL:
            return {
                ...state,
                cartTotal: payload.total
            }
        default:
            throw new Error( `Unhandled type ${type} in CartReducer` );
    }
}

export const CartProvider = ( { children } ) => {
    const [ { showCart, cartItems, cartCount, cartTotal }, dispatch ] = useReducer( CartReducer, INITIAL_STATE );

    useEffect( () => {
        const count = cartItems.reduce( ( accumulator, currentValue ) => accumulator + currentValue.quantity, 0 );
        dispatch( { type: CART_ACTION_TYPE.UPDATE_CART_COUNT,  payload: { count } } );
    }, [ cartItems ] );

    useEffect( () => {
        const total = cartItems.reduce( ( accumulator, currentValue ) => ( currentValue.quantity * currentValue.price ) + accumulator, 0 );
        dispatch( { type: CART_ACTION_TYPE.UPDATE_CART_TOTAL, payload: { total } } );
    }, [ cartItems ] );

    const addItemToCart = ( product ) => {
        dispatch( { type: CART_ACTION_TYPE.UPDATE_CART_ITEMS, payload: { product, action: 'add' } } );
    }

    const removeItemFromCart = ( product ) => {
        dispatch( { type: CART_ACTION_TYPE.UPDATE_CART_ITEMS, payload: { product, action: 'remove' } } );
    }

    const clearItemFromCart = ( product ) => {
        dispatch( { type: CART_ACTION_TYPE.UPDATE_CART_ITEMS, payload: { product, action: 'clear' } } );
    }

    const setShowCart = ( showCart ) => {
        dispatch( { type: CART_ACTION_TYPE.UPDATE_SHOW_CART, payload: { showCart } } );
    }

    const value = { showCart, setShowCart, cartItems, addItemToCart, cartCount, removeItemFromCart, cartTotal, clearItemFromCart };
    
    return <CartContext.Provider value={ value }>
        { children }
    </CartContext.Provider>;
}