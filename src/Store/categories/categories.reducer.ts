import { CATEGORY_ACTION_TYPES, Product } from "./categories.types";

export const CATEGORIES_INITIAL_STATE = {
    categories: new Map<string, Product[]>()
}

interface CategoryAction {
    type: typeof CATEGORY_ACTION_TYPES.SET_CATEGORIES;
    payload: any;
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action: CategoryAction) => {
    const { type, payload } = action;

    switch (type) {
        case CATEGORY_ACTION_TYPES.SET_CATEGORIES:
            return {
                ...state,
                categories: payload
            }
        default:
            return state;
    }
}
