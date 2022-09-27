import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import Home from "../routes/home/home.componenet";
import App from "../App";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Home">
                <Home/>
            </ComponentPreview>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;