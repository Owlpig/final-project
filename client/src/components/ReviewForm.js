import { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';

const ReviewForm = ({
  id, setRenderReviews, setDisplayForm, mediaTitle,
}) => {
  const { oktaAuth, authState } = useOktaAuth();
  const [user, setUser] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('1');

  const getCurrentUser = () => {
    oktaAuth.getUser()
      .then(currentUser => setUser(currentUser))
      .catch(err => err.message);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('http://localhost:3000/api/mongodb/reviews', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${authState.accessToken.accessToken}`,
      },
      body: JSON.stringify({
        imdbId: id,
        username: user.name,
        mediaTitle,
        title,
        description,
        rating,
      }),
    });
    setRenderReviews(true);
    setDisplayForm(false);
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

  const handleCancel = () => {
    setDisplayForm(false);
  };
  return (
    <>
      <form className='review-form' onSubmit={handleSubmit}>
        <h3>Add review:</h3>
        <label className='review-form-rating' htmlFor="rating">Rating: </label>
        <select className='rating-input' defaultValue="1" onChange={handleRatingChange} id="rating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <label className='review-form-title' htmlFor="title">Title: </label>
        <input className='title-input' onChange={handleTitleChange} id="title"/>
        <label className='review-form-description' htmlFor="description">Description: </label>
        <textarea className='description-input' onChange={handleDescChange} id="description"/>
        <div className='form-buttons'>
          <button className='review-form-submit' type='submit'>Submit</button>
          <button className='review-form-cancel' type='button' onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </>
  );
};

export default ReviewForm;
