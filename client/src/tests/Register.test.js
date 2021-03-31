import { render, screen } from '@testing-library/react';
import Register from '../components/Register';

describe('The Register component', () => {
  test('renders without crashing', () => {
    render(<Register />);
  });
});