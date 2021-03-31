import { render, screen } from '@testing-library/react';
import App from '../components/App';

describe('The App component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });
});