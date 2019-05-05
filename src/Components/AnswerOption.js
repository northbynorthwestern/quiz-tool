import React, { Component } from "react";
import PropTypes from "prop-types";
import "./QuizStyle.css";

class AnswerOption extends Component {
  constructor() {
    super();

    this.state = {
      correctAns: "",
      message: ""
    };
  }

  componentDidMount() {
    this.setState({
      correctAns: this.props.correctAns
    });
  }

  displayMessage = e => {
    // This is the function used top display the custom message
    if (this.props.answerContent === this.props.correctAns) {
      this.setState({
        message: this.props.CorrectMessage
      });
    } else {
      this.setState({
        message: this.props.WrongMessage
      });
    }
  };

  render() {
    const answerMessage = <div>{this.state.message}</div>;
    return (
      <div>
        {answerMessage}
        <button
          key={this.props.answerContent}
          className="answerOption"
          onClick={this.displayMessage}
        >
          {this.props.answerContent}
        </button>
      </div>
    );
  }
}

AnswerOption.propTypes = {
  answerContent: PropTypes.string.isRequired,
  incrementAns: PropTypes.func.isRequired,
  correctAns: PropTypes.string.isRequired
};

export default AnswerOption;
