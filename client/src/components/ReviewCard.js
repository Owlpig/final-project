import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useState } from 'react';

const ReviewCard = ({ review, setRenderReviews }) => {
  const { authState, oktaAuth } = useOktaAuth();
  const [user, setUser] = useState({});
  const [error, setError] = useState('');
  const [displayEdit, setDisplayEdit] = useState(false);
  const [title, setTitle] = useState(review.title);
  const [description, setDescription] = useState(review.description);
  const [rating, setRating] = useState(review.rating);

  const getCurrentUser = () => {
    oktaAuth.getUser()
      .then(currentUser => setUser(currentUser))
      .catch(err => setError(err.message));
  };

  useEffect(() => {
    if (authState.accessToken) {
      getCurrentUser();
    }
  }, []);

  const handleDelete = async () => {
    await fetch(`http://localhost:3000/api/mongodb/reviews/${review._id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${authState.accessToken.accessToken}`,
      },
    });
    setRenderReviews(true);
  };

  const handleEdit = () => {
    setDisplayEdit(true);
  };

  const handleCancel = () => {
    setDisplayEdit(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch(`http://localhost:3000/api/mongodb/reviews/${review._id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${authState.accessToken.accessToken}`,
      },
      body: JSON.stringify({
        title,
        description,
        rating,
      }),
    });
    setDisplayEdit(false);
    setRenderReviews(true);
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

  if (error) {
    return <p>{error}</p>;
  }

  if (displayEdit) {
    return <>
      <form className='review-form' onSubmit={handleSubmit}>
        <h3>Add review:</h3>
        <label className='review-form-rating' htmlFor="rating">Rating: </label>
        <select className='rating-input' defaultValue={rating} onChange={handleRatingChange} id="rating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <label className='review-form-title' htmlFor="title">Title: </label>
        <input className='title-input' value={title} onChange={handleTitleChange} id="title"/>
        <label className='review-form-description' htmlFor="description">Description: </label>
        <textarea className='description-input' value={description} onChange={handleDescChange} id="description"/>
        <div className='form-buttons'>
          <button className='review-form-submit' type='submit'>Submit</button>
          <button className='review-form-cancel' type='button' onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </>;
  }

  return (
    <div className='review-card'>
      <header className='review-header'>
        <p>User: {review.username}</p>
        <span>Rating: {review.rating}/5</span>
      </header>
      <h3 className='review-title'>{review.title}</h3>
      <p className='review-description'>{review.description}</p>
      {(review.uid === user.sub) && <div className='review-btns'>
        <button className='review-edit' onClick={handleEdit}>Edit</button>
        <button className='review-delete' onClick={handleDelete}>Delete</button>
      </div>}
    </div>
  );
};

export default ReviewCard;
