import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useState } from 'react';
import ReviewForm from './ReviewForm';
import ReviewCard from './ReviewCard';

const Reviews = ({ id }) => {
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
    <section>
      {authState.isAuthenticated
      && !displayForm && <button onClick={handleAddReview}>Add a review</button>}
      {displayForm
      && <ReviewForm setDisplayForm={setDisplayForm} setRenderReviews={setRenderReviews} id={id}/>}
      {reviews.map((review, index) => <ReviewCard
      setRenderReviews={setRenderReviews} key={index} review={review}/>)}
    </section>
  );
};

export default Reviews;
