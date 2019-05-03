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
      callback: data => {
        // Update the app's state with the info from the spreadsheet
        this.setState({
          data: data
        });
      },
      simpleSheet: true
    });
  }

  render() {
    console.log("Updated state: ", this.state);
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
      </div>
    );
  }
}

export default App;
