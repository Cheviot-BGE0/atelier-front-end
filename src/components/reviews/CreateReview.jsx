import React from 'react';
import StarInput from '../shared/StarInput.jsx';

class CreateReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      recommended: null,
      characteristics: {}
    };
    this.onChange = this.onChange.bind(this);
  }

  getSelectedIndex(form, name) {
    for (let i = 1; i < 6; i++) {
      if (form[`${name}${i}`].checked) {
        return i;
      }
    }
    return null;
  }

  onChange({ target: { form } }) {
    const rating = form[0].value;
    const recommended = form.yes.checked;

    const characteristicsNames = [
      'Size',
      'Width',
      'Comfort',
      'Quality',
      'Length',
      'Fit'
    ];

    const characteristics = {};
    for (let name of characteristicsNames) {
      characteristics[name] = this.getSelectedIndex(form, name);
    }

    console.log(form);
    console.log(
      rating,
      recommended,
      characteristics
    );
    this.setState({
      rating,
      recommended,
      characteristics
    });
  }

  render() {

    const characteristicsNames = [
      'Size',
      'Width',
      'Comfort',
      'Quality',
      'Length',
      'Fit'
    ];

    const characteristicsText = {
      'Size': ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
      'Width': ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
      'Comfort': ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
      'Quality': ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
      'Length': ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
      'Fit': ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']
    };

    const {
      rating,
      recommended,
      characteristics
    } = this.state;
    return (
      <div className='createReview'>
        <button onClick={this.props.closeFn}>Close</button>
        <form onSubmit={this.onSubmit} onChange={this.onChange}>
          <h2>Write a new review</h2>
          <label>Overall rating: *</label>
          <StarInput rating={rating}/>
          <br></br>
          <label>Do you recommend this product? *</label>
          <div>
            <label>Yes</label>
            <input type="radio" id="yes" name="recommend" value="yes"></input><br></br>
            <label>No</label>
            <input type="radio" id="no" name="recommend" value="no"></input><br></br>
          </div>
          <br></br>
          <label>Characteristics: *</label>
          {characteristicsNames.map((name, i) => (
            <table key={i}>
              <caption><b>{name}</b> - {characteristicsText[name][characteristics[name] - 1]}</caption>
              <tbody>
                <tr>
                  <td><span>{characteristicsText[name][0]}</span></td>
                  <td><input id={`${name}1`} type="radio" name={`${name}`} value="1"></input><br></br></td>
                  <td><input id={`${name}2`} type="radio" name={`${name}`} value="2"></input><br></br></td>
                  <td><input id={`${name}3`} type="radio" name={`${name}`} value="3"></input><br></br></td>
                  <td><input id={`${name}4`} type="radio" name={`${name}`} value="4"></input><br></br></td>
                  <td><input id={`${name}5`} type="radio" name={`${name}`} value="5"></input><br></br></td>
                  <td><span>{characteristicsText[name][4]}</span></td>
                </tr>
              </tbody>
            </table>
          ))}
          <label>Review summary:</label>
          <input type='text' id='summary'></input>
          <br></br>
          <label>Review body: *</label>
          <br></br>
          <textarea id='body'></textarea>
          <br></br>
          <br></br>
          <label>Your nickname: *</label>
          <input type='text' id='username' placeholder='Example: jackson11!'></input>
          <br></br>
          <small>For privacy reasons, do not use your full name or email address</small>
          <br></br>
          <br></br>
          <label>Your email: *</label>
          <input type='email' id='email' placeholder='Example:  jackson11@email.com'></input>
          <br></br>
          <small>For authentication reasons, you will not be emailed</small>
          <br></br>
          <br></br>
        </form>
      </div>
    );
  }
}

export default CreateReview;