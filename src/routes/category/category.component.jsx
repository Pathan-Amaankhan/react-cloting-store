import {useParams} from "react-router-dom";
import {Fragment, useContext, useEffect, useState} from "react";
import {CategoriesContext} from "../../contexts/categories.context";
import {ProductCard} from "../../components/product-card/product-card.component";
import './category.styles';
import {CategoryContainer, CategoryTitle} from "./category.styles";

const Category = () => {
    const { category } = useParams();
    const { categories } = useContext( CategoriesContext );

    const [ products, setProducts ] = useState( categories[category] );

    useEffect(
        () => setProducts( categories[category] ),
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