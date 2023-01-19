import { createSelector } from 'reselect';

const getCategories = ( state ) => state.categories;

export const selectCategories = createSelector(
    [ getCategories ],
    ( categories ) => categories.categories.reduce(
        ( accumulator, category ) => {
            const {title, items} = category;
            accumulator[title.toLowerCase()] = items;
            return accumulator;
            },
        {}
    )
);
