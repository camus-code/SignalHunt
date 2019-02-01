import React, { Component } from 'react';
import Select from 'react-select';
import socketIOClient from "socket.io-client";
import TickerList from './TickerList';

class Tickers extends Component {
   constructor(props){
		super(props);
		this.state = {
			tickers: [],
			isLoading: true,
	  	error: null,
	  	selectedTickers: [],
	  	isTickerSelected: false,
	  	endpoint: "http://127.0.0.1:8000"
		};
		this.removeTicker = this.removeTicker.bind(this);
		this.clearTickers = this.clearTickers.bind(this);
	}
  componentDidMount() {
  	this.fetchTickers();
	}

 	fetchTickers() {
 		const { endpoint } = this.state;
 		const socket = socketIOClient(endpoint);
 		try {
			socket.on("fromAPI", tickers => this.setState({tickers: tickers.data, isLoading: false }));
		} 
		catch (error) {
			this.setState({error})
			console.log(error)
		}
	}

	addTicker = (selectedTicker) => {
    this.setState({ selectedTickers: selectedTicker, isTickerSelected: true });
  }

  removeTicker(name, i){
    const updatedSelections = this.state.selectedTickers.slice();
    updatedSelections.splice(i, 1); //FIX THIS CODE; NO SPLICES ALLOWED IN STATE
    this.setState({ selectedTickers: updatedSelections });
    if (this.state.selectedTickers.length === 1) {
    	this.setState({isTickerSelected: false})
    }
  }

  clearTickers = () => {
  	if (this.state.selectedTickers.length > 0) {
  		this.setState({selectedTickers: [], isTickerSelected: false})
  	}
  } 

	render() {
  	const { tickers, error, selectedTickers, isTickerSelected, isLoading } = this.state;
  	const tickerMap = tickers.map((ticker) => ({
  			value: ticker.slug, 
  			label: ticker.name, 
  			price: ticker.quote.USD.price,
  			percent_7d: ticker.quote.USD.percent_change_7d
  		}));
    return (
    	<div style={{textAlign: "center"}}>
    	<h1>Search</h1>
    	<Select
    	  isMulti
        isClearable
        value={selectedTickers}
        onChange={this.addTicker}
        options={tickerMap}
        isLoading={isLoading}
      />
     	<TickerList
   			isTickerSelected={isTickerSelected}
   			selectedTickers={selectedTickers}
   			removeTicker={this.removeTicker}
   			clearTickers={this.clearTickers}
   		/>
	  		<p style={{marginTop: "40em"}}className="App-intro">{"Errors:" + error}</p>
      </div>
    );
  }
}
export default Tickers;
