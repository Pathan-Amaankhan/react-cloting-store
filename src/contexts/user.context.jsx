import {createContext, useEffect, useReducer } from "react";
import {createUserDocFromAuth, onAuthChangeListener} from "../utils/firebase/firebase.utils";

export const UserContext = createContext( {
    currentUser: null,
    setCurrentUser: () => null,
} );

const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const UserReducer = ( state, action ) => {
    const { type, payload } = action;

    switch ( type ) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
            }
        default:
            throw new Error( `Unhandled type ${type} in userReducer` );
    }
}

const INITIAL_STATE = {
    currentUser: null,
};

export const UserProvider = ( { children } ) => {
    const [ {currentUser}, dispatch ] = useReducer( UserReducer, INITIAL_STATE );

    const setCurrentUser = ( user ) => {
        dispatch( { type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user } );
    }

    const value = { currentUser, setCurrentUser };


    useEffect( () => {

        const unsubscribe = onAuthChangeListener( ( user ) => {
            if ( user ) {
                createUserDocFromAuth( user );
            }
            setCurrentUser( user )
        } );

        return unsubscribe;

    }, [] );


    return (
       <UserContext.Provider value={ value }>
           { children }
       </UserContext.Provider>
    );
}