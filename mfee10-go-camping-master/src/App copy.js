import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campground: '',
      tag: ''
    };
  }

  callAPI() {
    fetch("http://localhost:5000/indexAPI")
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
    //   .then(res => res.text())
    // .then(res => this.setState({ apiResponse: res }));
    // console.log(this.state.apiResponse);
  }

  componentDidMount() {
    this.callAPI();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
          <div>{this.state.apiResponse}</div>
        </header>
      </div>
    );
  }
}

export default App;

