import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Results from '../components/Results';

describe('The Results component', () => {
  const mockData = [
    {
      name: "Tv-show 1",
      id: "123",
      locations: [{display_name: "Netflix"}, {display_name: "HBO"}],
      external_ids: {imdb: {id: '123'}}
    },
    {
      name: "Tv-show 2",
      id: "456",
      locations: [{display_name: "Netflix"}, {display_name: "HBO"}],
      external_ids: {imdb: {id: '456'}}
    },

  ]

  test('renders without crashing', () => {
    render(<BrowserRouter><Results searchResult={mockData}/></BrowserRouter>);
  });
  test('displays data', () => {
    render(<BrowserRouter><Results searchResult={mockData}/></BrowserRouter>);
    expect(screen.getAllByText(/Tv-show/)).toHaveLength(2);
  })
});