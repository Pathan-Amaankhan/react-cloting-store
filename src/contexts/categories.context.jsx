import {createContext, useEffect, useState} from "react";
import {getCategoriesAndDocuments} from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext( {
    categories: {}
} );

export const CategoriesProvider = ( { children } ) => {
    const [ categories, setCategories ] = useState( {} );
    const value = { categories };

    useEffect( () => {
        const getCategoryMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategories(categoryMap);
        }
        getCategoryMap()
    }, [] );

    return (
        <CategoriesContext.Provider value={ value }>
            { children }
        </CategoriesContext.Provider>
    );
}