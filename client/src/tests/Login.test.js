import { render, screen } from '@testing-library/react';
import Login from '../components/Login';

describe('The Login component', () => {
  test('renders without crashing', () => {
    render(<Login />);
  });
});