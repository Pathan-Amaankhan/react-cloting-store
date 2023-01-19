import {Routes, Route} from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import {setCategories} from "../../store/categories/categorires.actions";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

const Shop = () => {
    const dispatch = useDispatch();

    useEffect( () => {
        const getCategoryMap = async () => {
            const categoriesArray = await getCategoriesAndDocuments();
            dispatch( setCategories( categoriesArray ) );
        }

        getCategoryMap();

    }, [dispatch] );

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>
    );
}

export default Shop;