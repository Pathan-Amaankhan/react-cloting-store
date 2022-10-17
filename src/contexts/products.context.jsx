import PRODUCTS from '../shop-data.json';
import {createContext, useEffect, useState} from "react";

export const ProductsContext = createContext( {
    products: []
} );

export const ProductsProvider = ( { children } ) => {
    const [ products, setProducts ] = useState( null );
    const value = { products };

    useEffect(
        () => {
            setProducts( PRODUCTS );
        },
        []
    );

    return (
        <ProductsContext.Provider value={ value }>
            { children }
        </ProductsContext.Provider>
    );
}