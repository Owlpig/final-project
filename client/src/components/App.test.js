import { render, screen } from '@testing-library/react';
import App from './App';

describe('The App component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });
});