import { render, screen } from '@testing-library/react';
import UserAccountInput from '../UserAccountInput';

describe('UserAccountInput', () => {
    test('renders UserAccountInput component', () => {
        render(<UserAccountInput 
            label="Username"
            type="text"
            name="username"
            placeholder="Enter your username"
            value="test"
            onChange={() => {}}
        ></UserAccountInput>);
        // This is an array of all elements that match the query
        const inputElement = screen.getAllByLabelText(/username/i)[0];
        expect(inputElement).toBeInTheDocument();
    });
    });