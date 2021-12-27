import React from 'react';
import axios from 'axios';
import Overview from './components/overview/Overview.jsx';
import Reviews from './components/reviews/Reviews.jsx';
import Questions from './components/questions/Questions.jsx';
import Related from './components/related/Related.jsx';
import API_KEY from './config.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: null
    };
    this.updateAppProductId = this.updateAppProductId.bind(this);
  }

  updateAppProductId(productId) {
    this.setState({ productId });
  }

  componentDidMount() {

    const intializationConfig = {
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products',
      headers: {
        Authorization: API_KEY,
      },
    };

    axios(intializationConfig)
      .then((response) => {
        this.setState({ productId: response.data[0].id }); // sets the id of the first prodcut in the list as the init id
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { productId } = this.state;
    return (
      <div>
        <Overview productId={productId} />
        <Reviews productId={productId} />
        <Questions productId={productId} />
        <Related
          productId={productId}
          updateAppProductId={this.updateAppProductId}
        />
      </div>
    );
  }
}

export default App;
