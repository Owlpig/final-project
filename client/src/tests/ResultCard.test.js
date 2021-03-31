import { render, screen } from '@testing-library/react';
import ResultCard from './ResultCard';

describe('The ResultCard component', () => {

  const mockShow = {
    name: "Tv-show 1",
    id: "123",
    locations: [{display_name: "Netflix"}, {display_name: "HBO"}]
  }
  test('renders without crashing', () => {
    render(<ResultCard tvShow={mockShow} />);
  });
});