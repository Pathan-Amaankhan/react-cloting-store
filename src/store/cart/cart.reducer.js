import {CART_ACTION_TYPES} from "./cart.types";

export const INITIAL_STATE = {
    showCart: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

export const CartReducer = ( state = INITIAL_STATE , action ) => {
    const { type, payload } = action;

    switch ( type ) {
        case CART_ACTION_TYPES.UPDATE_SHOW_CART:
            return {
                ...state,
                showCart: payload.showCart,
            }
        case CART_ACTION_TYPES.UPDATE_CART_ITEMS:
            return {
                ...state,
                ...payload,
            }
        default:
            return state;
    }
}