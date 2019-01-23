import React, { Component } from 'react';
import Tickers from './components/Tickers';
//import Search from './components/Search';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        	<Tickers/>
        </header>
      </div>
    );
  }
}

export default App;