import React from 'react';
import axios from 'axios';
import API_KEY from '../../config.js';
import ReviewTile from './ReviewTile.jsx';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      votedHelpful: {}
    };
    this.voteReviewHelpful = this.voteReviewHelpful.bind(this);
  }

  voteReviewHelpful(id) {
    const { votedHelpful } = this.state;
    votedHelpful[id] = true;
    this.setState({ votedHelpful });
    const postConfig = {
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/reviews/${id}/helpful`,
      headers: {
        Authorization: API_KEY,
      }
    };

    axios(postConfig)
      .then((response) => {
        this.props.onReviewSubmitted();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { reviews, loadMoreReviews } = this.props;
    const { votedHelpful } = this.state;
    return (
      <div className='reviewsListContainer'>
        <div className='reviewsList'>
          <ul>
            {reviews.map((review) => (
              <ReviewTile
                key={review.review_id}
                review={review}
                hasVotedHelpul={review.review_id in votedHelpful}
                voteReviewHelpful={this.voteReviewHelpful}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ReviewsList;
