import * as React from "react";
import "../styles/styles.css";
import "../client/surveyDB";
import { saveSurvey } from "../client/surveyDB";

class SurveyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodType: "",
      recommend: "",
      rating: "",
    };
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();

    var surveyEntry = {
      foodType: this.state.foodType,
      recommend: this.state.recommend,
      rating: this.state.rating,
    };

    saveSurvey(surveyEntry);
  };

  handleOnChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="greenBorder">
        <form onSubmit={this.handleFormSubmit}>
          <input
            onChange={this.handleOnChange}
            placeholder="Name "
            name="question1"
          />
          <br />

          <p className="noBorder">Type of Food</p>
          <select name="foodType" id="food" onChange={this.handleOnChange}>
            <option value="american">American</option>
            <option value="japanese">Japanese</option>
            <option value="indian">Indian</option>
            <option value="thai">Thai</option>
          </select>

          <p className="noBorder">Would you recommend?</p>
          <div onChange={this.handleOnChange}>
            <input type="radio" value="yes" name="recommend" /> Yes
            <input type="radio" value="no" name="recommend" /> No
          </div>

          <p className="noBorder">Rating</p>
          <div onChange={this.handleOnChange}>
            <input type="radio" value="1" name="rating" /> 1
            <input type="radio" value="2" name="rating" /> 2
            <input type="radio" value="3" name="rating" /> 3
            <input type="radio" value="4" name="rating" /> 4
            <input type="radio" value="5" name="rating" /> 5
          </div>

          <input type="submit" className="submitButton" />
          <p></p>
        </form>
      </div>
    );
  }
}

export default SurveyComponent;
