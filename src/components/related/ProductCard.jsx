import React from 'react';
import axios from 'axios';
import { API_KEY, API_PROXY_URL } from '../../config.js';

import StarRating from '../shared/StarRating.jsx';
import ActionButton from './ActionButton.jsx';
import CompareModal from './CompareModal.jsx';

class ProductCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: '...',
      name: '...',
      price: '...',
      salePrice: '...',
      rating: null,
      primaryImg: null,
      features: [],
      displayModal: false,
      currentProductFeatures: {name: '', features: []},
      initialRequestMade: false,
      hideOverwrite: false
    };
    this.actionBtnClick = this.actionBtnClick.bind(this);
  }

  componentDidMount() {
    const { productCardId, productId } = this.props;
    this.fetchProductInfo(productCardId, 'currentRelatedItem');
    this.fetchProductInfo(productId, 'currentProduct');
    this.fetchProductPricePics(productCardId);
    this.fetchProductRating(productCardId);
  }

  fetchProductInfo(productIdToGet, stateToUpdate) {
    const { initialRequestMade } = this.state;

    if (!initialRequestMade) {
      this.setState({initialRequestMade: true});

      const infoRequestConfig = {
        method: 'get',
        url: `${API_PROXY_URL}/products/${productIdToGet}`,
        headers: {Authorization: API_KEY}
      };

      axios(infoRequestConfig)
        .then((response) => {
          const { name, category } = response.data;
          let features = response.data.features;

          if (stateToUpdate === 'currentRelatedItem') {
            features.forEach(feature => {
              feature['belongsTo'] = 'relatedItem';
            });

            this.setState({
              name: name,
              category: category,
              features: features
            });
          }

          if (stateToUpdate === 'currentProduct') {
            features.forEach(feature => {
              feature['belongsTo'] = 'currentProduct';
            });

            this.setState({
              currentProductFeatures: {name: name, features: features}
            });
          }
        })
        .catch((error) => {
          console.log('HTTP request to fetch product info failed');
        });
    }
  }

  fetchProductPricePics(productIdToGet) {
    const { initialRequestMade } = this.state;

    if (!initialRequestMade) {
      this.setState({initialRequestMade: true});

      const pricePicsRequestConfig = {
        method: 'get',
        url: `${API_PROXY_URL}/products/${productIdToGet}/styles`,
        headers: {Authorization: API_KEY}
      };

      axios(pricePicsRequestConfig)
        .then((response) => {
          const data = response.data.results[0];
          this.setState({
            price: data.original_price,
            salePrice: data.sale_price,
            primaryImg: data.photos[0].thumbnail_url
          });
        })
        .catch((error) => {
          console.error('HTTP request to fetch product prices failed');
        });
    }
  }

  fetchProductRating(productIdToGet) {
    const { initialRequestMade } = this.state;

    if (!initialRequestMade) {
      this.setState({initialRequestMade: true});

      const ratingRequestConfig = {
        method: 'get',
        url: `${API_PROXY_URL}/reviews/meta?product_id=${productIdToGet}`,
        headers: {Authorization: API_KEY}
      };

      axios(ratingRequestConfig)
        .then((response) => {
          const ratings = response.data.ratings;
          let ratingFraction;
          let [count, sum] = [0, 0];

          for (let key in ratings) {
            count += parseInt(ratings[key]);
            sum += parseInt(key) * parseInt(ratings[key]);
          }

          const average = sum / count;
          average > 0 ? ratingFraction = average : ratingFraction = 0;
          this.setState({rating: ratingFraction});
        })
        .catch((error) => {
          console.log('HTTP request to fetch product rating failed');
        });
    }
  }

  actionBtnClick(buttonLocation) {
    if (buttonLocation === 'relatedList') {
      this.setState({displayModal: !this.state.displayModal});
    }

    if (buttonLocation === 'yourOutfit') {
      this.props.removeItemFromOutfit(this.props.productCardId);
    }
  }

  render() {
    const { productCardId, updateAppProductId, currentList,
      hidden, cardData } = this.props;

    const { name, category, price, salePrice, rating, hideOverwrite,
      features, displayModal, currentProductFeatures } = this.state;

    if (cardData) {
      let primaryImg = this.state.primaryImg;
      if (!primaryImg) { primaryImg = 'https://tinyurl.com/5nur3x7w'; }

      let compareModal;
      if (currentList === 'related') {
        compareModal = <CompareModal
          displayModal={displayModal}
          relatedItemName={name}
          currentProductFeatures={currentProductFeatures}
          relatedProductFeatures={features}
          actionBtnClick={this.actionBtnClick} /> ;
      }

      let hideCard = hidden;
      if (hideOverwrite) { hideCard = true; }

      return (
        <div>
          {compareModal}
          <div className={hideCard ? 'product-card hidden' : 'product-card'}>
            <ActionButton actionBtnClick={this.actionBtnClick}
              currentList={currentList}/>
            <img className='card-img' src={primaryImg}
              alt={`Product thumbnail image for ${name}`}
              onClick={() => { updateAppProductId(productCardId); }}></img>
            <div className='card-info' onClick={() => { updateAppProductId(productCardId); }}>
              <p className='card-category'>{category}</p>
              <p className='card-name'>{name}</p>
              <p className='card-price'>{'$'}{price}</p>
              <p className='card-sale'>{salePrice}</p>
              <div className='card-rating'>
                <StarRating rating={rating}/>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return ( <div></div> );
    }
  }
}

export default ProductCard;
