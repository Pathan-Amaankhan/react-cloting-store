import {Route, Routes} from "react-router-dom";
import Home from "./routes/home/home.componenet";
import Navigation from "./routes/navigation/navigation.component";
import Shop from "./routes/shop/shop.component";
import Authentication from "./routes/authentication/authentication.component";
import Checkout from "./routes/checkout/checkout.component";
import {createUserDocFromAuth, onAuthChangeListener} from "./utils/firebase/firebase.utils";
import {useEffect} from "react";
import {setCurrentUser} from "./store/user/user.action";
import {useDispatch} from "react-redux";

const App = () => {
    const dispatch = useDispatch();

    useEffect( () => {
        const unsubscribe = onAuthChangeListener( ( user ) => {
            if ( user ) {
                createUserDocFromAuth( user );
            }
            dispatch( setCurrentUser( user ) );
        } );

        return unsubscribe;

    }, [dispatch] );

    return (
        <Routes>
            <Route path='/' element={<Navigation />}>
                <Route index={true} element={<Home />} />
                <Route path='shop/*' element={<Shop />} />
                <Route path='sign-in' element={<Authentication />} />
                <Route path='checkout' element={<Checkout />} />
            </Route>
        </Routes>
    );
}

export default App;
