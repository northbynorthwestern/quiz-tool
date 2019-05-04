import React from "react";
import PropTypes from "prop-types";
import "./QuizStyle.css";

function AnswerOption(props) {
  console.log("Correct Answer: ", props.correctAns);

  if (props.answerContent === props.correctAns) {
    return (
      <div>
        <button className="answerOption" onClick={props.incrementAns}>
          {props.answerContent}
        </button>
      </div>
    );
  }
  return (
    <div>
      <button className="answerOption">{props.answerContent}</button>
    </div>
  );
}

AnswerOption.propTypes = {
  answerContent: PropTypes.string.isRequired,
  incrementAns: PropTypes.func.isRequired,
  correctAns: PropTypes.string.isRequired
};

export default AnswerOption;
