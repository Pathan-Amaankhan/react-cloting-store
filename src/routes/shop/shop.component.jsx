import {Fragment, useContext} from "react";
import {CategoriesContext} from "../../contexts/categories.context";
import {ProductCard} from "../../components/product-card/product-card.component";
import './shop.styles.scss';

const Shop = () => {
    const { categories } = useContext( CategoriesContext );

    return (
            categories && Object.keys( categories ).map( title => (
                <Fragment key={title}>
                    <h2>{title}</h2>
                    <div className='products-container' >
                        {
                            categories[title].map(
                                product => ( <ProductCard key={product.id} product={product} ></ProductCard> )
                            )
                        }
                    </div>
                </Fragment>
            ) )
    );
}

export default Shop;