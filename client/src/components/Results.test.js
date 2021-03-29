import { render, screen } from '@testing-library/react';
import Results from './Results';

describe('The Results component', () => {
  const mockData = [
    {
      name: "Tv-show 1",
      id: "123",
      locations: [{display_name: "Netflix"}, {display_name: "HBO"}]
    },
    {
      name: "Tv-show 2",
      id: "456",
      locations: [{display_name: "Netflix"}, {display_name: "HBO"}]
    },

  ]

  test('renders without crashing', () => {
    render(<Results searchResult={mockData}/>);
  });
  test('displays data', () => {
    render(<Results searchResult={mockData}/>);
    expect(screen.getAllByText(/Tv-show/)).toHaveLength(2);
  })
});