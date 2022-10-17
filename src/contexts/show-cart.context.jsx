import {createContext, useState} from "react";

export const ShowCartContext = createContext( {
    showCart: false,
    setShowCart: () => null,
} );


export const ShowCartProvider = ( { children } ) => {
    const [ showCart, setShowCart ] = useState( false );
    const value = { showCart, setShowCart };
    
    return <ShowCartContext.Provider value={value}>
        { children }
    </ShowCartContext.Provider>;
}