import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useState } from 'react';
import ReviewForm from './ReviewForm';

const Reviews = ({ id }) => {
  const { authState } = useOktaAuth();
  const [reviews, setReviews] = useState([]);
  // const [addReview, setAddReview] = useState(false);

  const getReviews = () => {
    fetch(`/api/mongodb/reviews?imdbId=${id}`)
      .then(res => res.json())
      .then(data => setReviews(data));
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <section>
      {authState.isAuthenticated && <button>Add a review</button>}
      {<ReviewForm id={id}/>}
      {reviews.map(review => <p>{review.title}</p>)}
    </section>
  );
};

export default Reviews;
