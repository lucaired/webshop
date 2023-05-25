export enum CATEGORY_ACTION_TYPES {
    FETCH_CATEGORIES_START = 'categories/FETCH_CATEGORIES_START',
    FETCH_CATEGORIES_SUCCESS = 'categories/FETCH_CATEGORIES_SUCCESS',
    FETCH_CATEGORIES_FAILURE = 'categories/FETCH_CATEGORIES_FAILURE',
}

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

export interface Category {
    title: string;
    items: Product[];
}
