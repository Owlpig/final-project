import { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';

const ReviewForm = ({ id }) => {
  const { oktaAuth } = useOktaAuth();
  const [user, setUser] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');

  const getCurrentUser = () => {
    oktaAuth.getUser()
      .then(currentUser => setUser(currentUser))
      .catch(err => err.message);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    fetch('api/mongodb/reviews', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imdbId: id,
        username: user.name,
        title,
        description,
        rating,
      }),
    });
  };

  const handleRatingChange = e => {
    setRating(e.target.value);
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleDescChange = e => {
    setDescription(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="rating">Rating: </label>
      <select onChange={handleRatingChange} id="rating" className="review-rating">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <label htmlFor="title">Title</label>
      <input onChange={handleTitleChange} id="title" className="review-title"></input>
      <label htmlFor="description">Description</label>
      <input onChange={handleDescChange} id="description" className="review-description"></input>
      <button>Submit</button>
    </form>
  );
};

export default ReviewForm;
