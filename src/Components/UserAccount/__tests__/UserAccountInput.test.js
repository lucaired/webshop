import { render, screen, fireEvent } from '@testing-library/react';
import UserAccountInput from '../UserAccountInput';

describe('UserAccountInput', () => {
    const mockHandler = jest.fn();

    it('renders the label and input with the correct props', () => {
      const props = {
        type: 'text',
        name: 'username',
        label: 'Username',
        handler: mockHandler,
        value: '',
      };
      render(<UserAccountInput {...props} />);
      expect(screen.getByLabelText('Username')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
      expect(screen.getByRole('textbox')).toHaveAttribute('name', 'username');
      expect(screen.getByRole('textbox')).toHaveAttribute('value', '');
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
      expect(mockHandler).toHaveBeenCalledTimes(1);
    });
});
