import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ResultCard from '../components/ResultCard';

describe('The ResultCard component', () => {

  const mockShow = {
    name: "Tv-show 1",
    id: "123",
    locations: [{display_name: "Netflix"}, {display_name: "HBO"}],
    external_ids: {imdb: {id: '123'}}
  }
  test('renders without crashing', () => {
    render(<BrowserRouter><ResultCard tvShow={mockShow} /></BrowserRouter>);
  });
});