import { useOktaAuth } from '@okta/okta-react';

const Reviews = () => {
  const { authState } = useOktaAuth();

  const getReviews = () => {
    fetch('/api/mongodb/reviews')
  }

  return (
    <section>
      {getReviews}
    </section>
  )
}

export default Reviews;
