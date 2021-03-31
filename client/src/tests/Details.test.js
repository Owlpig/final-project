import { render, screen } from '@testing-library/react';
import Details from '../components/Details';

const mockDetails = {
  Genre: 'Action',
  totalSeasons: '3',
  Ratings: [{Value: '5.0'}],
};

describe('The Details component', () => {
  test('renders without crashing', () => {
    render(<Details details={mockDetails} />);
  });

  test('genre test', () => {
    render(<Details details={mockDetails} />);
    expect(screen.getByText('Number of Seasons: 3')).toBeInTheDocument();
  });

});