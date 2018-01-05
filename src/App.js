import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Lister from './components/Lister/Lister';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Lister />
      </div>
    );
  }
}

export default App;
