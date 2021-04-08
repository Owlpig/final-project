import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useState } from 'react';
import ReviewForm from './ReviewForm';
import ReviewCard from './ReviewCard';

const Reviews = ({ id, mediaTitle }) => {
  const { authState } = useOktaAuth();
  const [reviews, setReviews] = useState([]);
  const [renderReviews, setRenderReviews] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);

  const getReviews = () => {
    fetch(`/api/mongodb/reviews?imdbId=${id}`)
      .then(res => res.json())
      .then(data => setReviews(data))
      .then(setRenderReviews(false));
  };

  const handleAddReview = () => {
    setDisplayForm(true);
  };

  useEffect(() => {
    getReviews();
  }, [renderReviews]);

  return (
    <section className='reviews-container'>
      {authState.isAuthenticated
      && !displayForm && <button className='add-review-btn' onClick={handleAddReview}>Add a review</button>}
      {displayForm
      && <ReviewForm
      setDisplayForm={setDisplayForm}
      setRenderReviews={setRenderReviews} mediaTitle={mediaTitle} id={id}/>}
      <div className='reviews-list'>
        {reviews.map((review, index) => <ReviewCard
      setRenderReviews={setRenderReviews} key={index} review={review}/>)}
      </div>
    </section>
  );
};

export default Reviews;
