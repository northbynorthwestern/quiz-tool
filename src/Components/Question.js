import React from "react";
import PropTypes from "prop-types";
import "./QuizStyle.css";

function Question(props) {
  return (
    <div className="question">
      <div>{props.question}</div>
    </div>
  );
}

Question.propTypes = {
  question: PropTypes.string.isRequired
};

export default Question;
