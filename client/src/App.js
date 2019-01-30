import React, { Component } from 'react';
import Tickers from './components/Tickers';
import Bracket from './components/Bracket/Bracket';
//import Search from './components/Search';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        	<Tickers/>
        	{/*<Bracket/>*/}
        </header>
      </div>
    );
  }
}

export default App;