import {rootReducer} from "./root-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {logger} from "redux-logger/src";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

const middleWares = [ process.env.NODE_ENV !== 'production' && logger ].filter( Boolean );

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [ 'user' ],
}

const persistedReducer = persistReducer( persistConfig, rootReducer );

export const store = configureStore( {
    reducer: persistedReducer,
    middleware: middleWares,
} );

export const persistor = persistStore( store );
