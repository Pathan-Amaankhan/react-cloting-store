import {BackgroundImage, Body, DirectoryItemContainer} from "./directory-item.styles";
import {Link} from "react-router-dom";

const DirectoryItem = ({ category } ) => {
    const { title, imageUrl } = category;
    return (
        <DirectoryItemContainer>
            <BackgroundImage style={{backgroundImage: `url(${imageUrl})`}}></BackgroundImage>
            <Body>
                <h2>{title}</h2>
                <Link to={'shop/'+title}>Shop Now</Link>
            </Body>
        </DirectoryItemContainer>
    );
}

export default DirectoryItem;