import { CATEGORY_ACTION_TYPES } from "./categories.types";

export class Product {
    id: number;
    name: string;
    imageUrl: string;
    price: number;

    constructor(id: number, name: string, imageUrl: string, price: number) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.price = price;
    }
}

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
