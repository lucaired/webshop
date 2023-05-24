export const CATEGORY_ACTION_TYPES = {
    SET_CATEGORIES: 'categories/SET_CATEGORIES',
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
