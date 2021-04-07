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
    getCurrentUser();
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="rating">Rating: </label>
        <select defaultValue={rating} onChange={handleRatingChange} id="rating" className="review-rating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <label htmlFor="title">Title: </label>
        <input value={title} onChange={handleTitleChange} id="title" className="review-title"></input>
        <label htmlFor="description">Description: </label>
        <input value={description} onChange={handleDescChange} id="description" className="review-description"></input>
        <button>Submit</button>
      </form>
      <button onClick={handleCancel}>Cancel</button>
    </>;
  }

  return (
    <div>
      <header>
        <p>{review.username}</p>
        <span>{review.rating}</span>
      </header>
      <h3>{review.title}</h3>
      <p>{review.description}</p>
      {(review.uid === user.sub) && <div>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>}
    </div>
  );
};

export default ReviewCard;
