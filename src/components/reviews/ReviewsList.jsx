import React from 'react';
import axios from 'axios';
import { API_KEY, API_PROXY_URL } from '../../config.js';
import ReviewTile from './ReviewTile.jsx';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      votedHelpful: {}
    };
    this.voteReviewHelpful = this.voteReviewHelpful.bind(this);
    this.voteReviewUnhelpful = this.voteReviewUnhelpful.bind(this);

  }

  voteReviewHelpful(id) {
    const { votedHelpful } = this.state;
    votedHelpful[id] = true;
    this.setState({ votedHelpful });
    const postConfig = {
      method: 'put',
      url: `${API_PROXY_URL}/reviews/${id}/helpful`,
      headers: {
        Authorization: API_KEY,
      }
    };

    axios(postConfig)
      .catch((error) => {
        console.log(error);
      });
  }

  voteReviewUnhelpful(id) {
    const { votedHelpful } = this.state;
    votedHelpful[id] = true;
    this.setState({ votedHelpful });
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
                voteReviewUnhelpful={this.voteReviewUnhelpful}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ReviewsList;
