import React, { Component } from "react";
import "./App.css";
import Tabletop from "tabletop";
import Question from "./Components/Question";
import AnswerOption from "./Components/AnswerOption";

class App extends Component {
  constructor() {
    super();

    // Bind the this context to the handler function
    this.incrementAns = this.incrementAns.bind(this);

    this.state = {
      // Only hard-code this at the initial constructor
      // if doing offline development
      data: [],
      numCorrect: 0 // Keep track of the score of the quiz
    };
  }

  componentDidMount() {
    Tabletop.init({
      // Paste in the key of your published Google spreadsheet in here
      key: "1rrBdYaTg9FiTO8I3PJFhZeChD8WZOs7K4zqWfkLXJOY",
      callback: this.parseData,
      simpleSheet: true
    });
  }

  parseData = data => {
    var num_q = data.length; // total # of questions in quiz

    // The (maximum) number of options available
    // for each quiz question
    var num_opt = Object.keys(data[0]).length - 4;

    var parsed_data = []; // Reformatted data

    for (var i = 0; i < num_q; i++) {
      var curr_q = data[i];
      var new_q = { Question: curr_q["Question"] };
      new_q["CorrectAnswer"] = curr_q["CorrectAnswer"];
      var curr_opt = [];

      for (var j = 1; j <= num_opt; j++) {
        var opt_name = "Option" + String(j);
        if (curr_q[opt_name] !== "") {
          curr_opt.push(curr_q[opt_name]);
        }
      }

      new_q["Answers"] = curr_opt;
      console.log("Options: ", new_q.Answers);
      new_q["CorrectMessage"] = curr_q["CorrectMessage"];
      new_q["WrongMessage"] = curr_q["WrongMessage"];
      parsed_data.push(new_q);
    }

    this.setState({
      data: parsed_data
    });
  };

  incrementAns(e) {
    this.setState({
      numCorrect: this.state.numCorrect + 1
    });
    console.log("INCREMENTED TO ", this.state.numCorrect);
    return (
      <div>
        <p>You got the answer correct</p>
      </div>
    );
  }

  render() {
    const { data } = this.state;
    console.log("Updated spreadsheet data: ", data);
    var func = this.incrementAns;

    return (
      <div className="App">
        <header className="App-header">
          <p>North by Northwestern Sample Quiz</p>
          <a
            href="https://docs.google.com/spreadsheets/d/1rrBdYaTg9FiTO8I3PJFhZeChD8WZOs7K4zqWfkLXJOY/edit?usp=sharing"
            rel="noopener noreferrer"
            target="_blank"
          >
            Demo Google Spreadsheet
          </a>
        </header>

        <div>
          <Question blah={this.incrementAns} />
          <h1>The Quiz</h1>
          {data.map(function(item, i) {
            i += 1;
            return (
              <div key={i}>
                <Question key={item.Question} question={item.Question} />

                {item.Answers.map(function(ans) {
                  return (
                    <div key={ans}>
                      <AnswerOption
                        answerContent={ans}
                        incrementAns={func}
                        correctAns={item.CorrectAnswer}
                        CorrectMessage={item.CorrectMessage}
                        WrongMessage={item.WrongMessage}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
