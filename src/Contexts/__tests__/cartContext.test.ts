import { addCartItem, changeItemQuanitity, setItemQuanitity, removeCartItem } from '../CartContext';

describe('changeItemQuantity', () => {
    test('should remove item if quantity is reduced to 0', () => {
        const item = {
            product: {
                id: 1,
                name: 'test',
                price: 10,
                imageUrl: 'test',
                description: 'test'
            },
            quantity: 1
        };
        const items = [item];
        const result = changeItemQuanitity(items, 0, -1);
        expect(result.length).toBe(0);
    });

    test('should remove item if quantity is reduced to negative number', () => {
        const item = {
            product: {
                id: 1,
                name: 'test',
                price: 10,
                imageUrl: 'test',
                description: 'test'
            },
            quantity: 1
        };
        const items = [item];
        const result = changeItemQuanitity(items, 0, -2);
        expect(result.length).toBe(0);
    });

    test('should increase quantity if quantity is increased for the specified item', () => {
        const item = {
            product: {
                id: 1,
                name: 'test',
                price: 10,
                imageUrl: 'test',
                description: 'test'
            }, 
            quantity: 1
        };
        const item2 = {
            product: {
                id: 2,
                name: 'test2',
                price: 10,
                imageUrl: 'test2',
                description: 'test2'
            },
            quantity: 1
        };
        const items = [item, item2];
        const result = changeItemQuanitity(items, 0, 2);
        expect(result.length).toBe(2);
        expect(result[0].quantity).toBe(3);
    });

    test('should remove element if quantity is decreased so that it comes below zero', () => {
        const item = {
            product: {
                id: 1,
                name: 'test',
                price: 10,
                imageUrl: 'test',
                description: 'test'
            }, 
            quantity: 1
        };
        const item2 = {
            product: {
                id: 2,
                name: 'test2',
                price: 10,
                imageUrl: 'test2',
                description: 'test2'
            },
            quantity: 1
        };
        const items = [item, item2];
        const result = changeItemQuanitity(items, 0, -10);
        expect(result.length).toBe(1);
        expect(result[0].product.id).toBe(2);
    });
});

describe('setItemQuantity', () => {
    test('should remove item if quantity is reduced to 0', () => {
        const item = {
            product: {
                id: 1,
                name: 'test',
                price: 10,
                imageUrl: 'test',
                description: 'test'
            },
            quantity: 1
        };
        const items = [item];
        const result = setItemQuanitity(items, 0, 0);
        expect(result.length).toBe(0);
    });
});

describe('addCartItem', () => {
    test('should add item if it does not exist', () => {
        const item = {
            id: 1,
            name: 'test',
            price: 10,
            imageUrl: 'test',
            description: 'test'
        };
        const state = {
            cartItems: [],
            isCartHidden: true,
            cartItemsCount: 0,
            cartTotal: 0
        };
        const result = addCartItem(item, state);
        expect(result.cartItems.length).toBe(1);
    });

    test('should increase quantity if item exists', () => {
        const item = {
            id: 1,
            name: 'test',
            price: 10,
            imageUrl: 'test',
            description: 'test'
        };
        const state = {
            cartItems: [{ product: item, quantity: 1 }],
            isCartHidden: true,
            cartItemsCount: 1,
            cartTotal: 10
        };
        const result = addCartItem(item, state);
        expect(result.cartItems.length).toBe(1);
        expect(result.cartItems[0].quantity).toBe(2);
    });
});

describe('removeCartItem', () => {
    test('should remove item if it exists', () => {
        const item = {
            id: 1,
            name: 'test',
            price: 10,
            imageUrl: 'test',
            description: 'test'
        };
        const state = {
            cartItems: [{ product: item, quantity: 1 }],
            isCartHidden: true,
            cartItemsCount: 1,
            cartTotal: 10
        };
        const result = removeCartItem(item, state);
        expect(result.cartItems.length).toBe(0);
    });

    test('Return state if item does not exist', () => {
        const item = {
            id: 1,
            name: 'test',
            price: 10,
            imageUrl: 'test',
            description: 'test'
        };
        const otherItem = {
            id: 2,
            name: 'test',
            price: 10,
            imageUrl: 'test',
            description: 'test'
        };
        const state = {
            cartItems: [{product: otherItem, quantity: 1}],
            isCartHidden: true,
            cartItemsCount: 0,
            cartTotal: 0
        };
        const result = removeCartItem(item, state);
        expect(result.cartItems.length).toBe(1);
    });
});