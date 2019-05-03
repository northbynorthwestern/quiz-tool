import React, { Component } from "react";
import "./App.css";
import Tabletop from "tabletop";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
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
    var num_opt = Object.keys(data[0]).length - 2;

    var parsed_data = []; // Reformatted data

    for (var i = 0; i < num_q; i++) {
      var curr_q = data[i];
      var new_q = [curr_q["Question"]];
      var curr_opt = [];

      for (var j = 1; j <= num_opt; j++) {
        var opt_name = "Option" + String(j);
        if (curr_q[opt_name] !== "") {
          curr_opt.push(curr_q[opt_name]);
        }
      }
      new_q.push(curr_opt);
      parsed_data.push(new_q);
    }

    // Update the app's state with the info from the spreadsheet
    this.setState({
      data: parsed_data
    });
  };

  render() {
    const { data } = this.state;
    console.log("Updated spreadsheet data: ", data);

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
          <h1>The Quiz</h1>
          {data.map(question => {
            return (
              <div>
                <p>{question[0]}</p>
                {question[1].map(option => {
                  return (
                    <div>
                      <p>{option}</p>
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
