import { render, screen } from '@testing-library/react';
import SearchField from './SearchField';

describe('The SearchField component', () => {
  test('renders without crashing', () => {
    render(<SearchField />);
  });
  
  test('should have a search field', () => {
    render(<SearchField />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('should have a dropdown input field', () => {
    render(<SearchField />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
  
  test('should have a button', () => {
    render(<SearchField />);
    expect(screen.getByRole('button')).toBeInTheDocument()
  });
});