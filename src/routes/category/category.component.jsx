import {useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import {ProductCard} from "../../components/product-card/product-card.component";
import './category.styles';
import {CategoryContainer, CategoryTitle} from "./category.styles";
import {useSelector} from "react-redux";
import {selectCategories} from "../../store/categories/categories.selector";

const Category = () => {
    const { category } = useParams();

    const categories = useSelector( selectCategories );

    const [ products, setProducts ] = useState( categories[category] );

    useEffect(
        () => {
            setProducts( categories[category] )
        },
        [ category, categories ]
    );

    return (
        <Fragment>
            <CategoryTitle> { category.toUpperCase() } </CategoryTitle>
            <CategoryContainer>
                {
                    products && products.map( product => ( <ProductCard key={product.id} product={product} /> ) )
                }
            </CategoryContainer>
        </Fragment>
    );
}

export default Category;