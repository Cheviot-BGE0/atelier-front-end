import React from 'react';
import axios from 'axios';
import API_KEY from '../../config.js';
import timeAgo from '../../utils/timeAgo.js';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayFullBody: false
    };
    this.toggleFullBody = this.toggleFullBody.bind(this);
  }

  toggleFullBody() {
    const displayFullBody = !this.state.displayFullBody;
    this.setState({ displayFullBody });
  }

  render() {
    const { review } = this.props;
    const { displayFullBody } = this.state;
    const bodyToDisplay = displayFullBody ? review.body : review.body.substr(0, 250);
    const moreToDisplay = bodyToDisplay.length < review.body.length;
    const showMoreBtn = review.body.length > 250 ? (
      <a
        className='showMoreBtn'
        onClick={this.toggleFullBody}
      >Show {displayFullBody ? 'Less' : 'More'}</a>
    ) : '';
    return (
      <div className='reviewTile'>
        <span className='name-date'>{review.reviewer_name}, {timeAgo(review.date)}</span>
        <h3>{review.summary}</h3>
        <p>{bodyToDisplay}{moreToDisplay ? '...' : ''}</p>
        {showMoreBtn}
      </div>
    );
  }
}

export default ReviewTile;