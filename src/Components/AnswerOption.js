import React from "react";
import PropTypes from "prop-types";
import "./QuizStyle.css";

function AnswerOption(props) {
  return (
    <div>
      <button className="answerOption" onChange={props.onAnswerSelected}>
        {props.answerContent}
      </button>
    </div>
  );
}

AnswerOption.propTypes = {
  answerContent: PropTypes.string.isRequired
};

export default AnswerOption;
