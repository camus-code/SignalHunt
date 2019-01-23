import React, { Component } from 'react';
import Select from 'react-select';

class Tickers extends Component {
   constructor(props){
		super(props);
		this.state = {
			isLoading: true,
	  	tickers: [],
	  	error: null,
	  	selectedOption: null,
	  	isOptionSelected: false
		};
	}
  componentDidMount() {
  	this.fetchTickers();
	}

 	async fetchTickers() {
 		try {
			const response = await fetch('/tickers'); 
			const tickers = await response.json();
			console.log(tickers);
			this.setState({tickers: tickers.data, isLoading: false });
		} 
		catch (error) {
			this.setState({error})
			console.log(error)
		}
	} 

	handleChange = (selectedOption) => {
    this.setState({ selectedOption: selectedOption, isOptionSelected: true });
    console.log(`Option selected:`, selectedOption);
  }

	render() {
  	const { tickers, error, selectedOption, isOptionSelected } = this.state;
  	const tickerMap = tickers.map((ticker) => ({
  			value: ticker.slug, 
  			label: ticker.name, 
  			price: ticker.quote.USD.price
  		}));
    return (
    	<div>
    	<Select
        value={selectedOption}
        onChange={this.handleChange}
        options={tickerMap}
        isMulti
      />
       <h1 className="App-title">{"List:"}</h1>
     		{ isOptionSelected && 
     			<ul>
     				{selectedOption.map((option, i) => <li key={i}>{`${option.label}: ${option.price}`}</li>)}
     			</ul>
     		}
	  		<p className="App-intro">{"Errors:" + error}</p>
      </div>
    );
  }
}
export default Tickers;
