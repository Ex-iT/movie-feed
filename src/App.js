import React, { Component } from 'react';
import Header from './components/Header/Header';
import Lister from './components/Lister/Lister';

class App extends Component {
  render() {
    return (
      <main>
        <Header />
        <Lister />
      </main>
    );
  }
}

export default App;
