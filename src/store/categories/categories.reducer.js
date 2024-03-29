import {CATEGORIES_ACTION_TYPES} from "./categories.types";

export const INITIAL_STATE = {
    categories: [],
};

export const CategoriesReducer = ( state = INITIAL_STATE, action ) => {
    const { type, payload } = action;

    switch ( type ) {
        case CATEGORIES_ACTION_TYPES.UPDATE_CATEGORIES:
            return { ...state, categories: payload };
        default:
            return state;
    }
}