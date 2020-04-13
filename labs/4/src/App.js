import React from 'react';
import CardList from "./components/CardList/index.js";
import './App.css';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <CardList />
      </div>
    );
  }
}

export default App;