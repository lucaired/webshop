import { changeItemQuanitity, setItemQuanitity } from './CartContext';

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
