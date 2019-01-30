import React, { Component } from 'react';
import Select from 'react-select';
import socketIOClient from "socket.io-client";

//const customStyles = {
//  option: (provided, state) => ({
//    ...provided,
//    color: state.isSelected ? 'red' : 'blue',
//    padding: 20,
//  }),
//  control: (provided, state) => ({
//  	...provided,
//  }),  	
//}

class Tickers extends Component {
   constructor(props){
		super(props);
		this.state = {
			isLoading: true,
	  	tickers: [],
	  	error: null,
	  	selectedOption: null,
	  	isOptionSelected: false,
	  	endpoint: "http://127.0.0.1:8000"
		};
	}
  componentDidMount() {
  	this.fetchTickers();
	}

	componentDidUpdate(prevProps, prevState) {
	  console.log(prevState.tickers === this.state.tickers)
	}

 	fetchTickers() {
 		const { endpoint } = this.state;
 		const socket = socketIOClient(endpoint);
 		try {
			socket.on("fromAPI", tickers => this.setState({tickers: tickers.data, isLoading: false }), console.log('setting state'));
		} 
		catch (error) {
			this.setState({error})
			console.log(error)
		}
	}


	handleSelection = (selectedOption) => {
    this.setState({ selectedOption: selectedOption, isOptionSelected: true });
  }

	render() {
  	const { tickers, error, selectedOption, isOptionSelected } = this.state;
  	const tickerMap = tickers.map((ticker) => ({
  			value: ticker.slug, 
  			label: ticker.name, 
  			price: ticker.quote.USD.price,
  			percent_7d: ticker.quote.USD.percent_change_7d
  		}));
  	console.log(selectedOption, tickerMap)
    return (
    	<div style={{textAlign: "center"}}>
    	<h1>Search</h1>
    	<Select
    		//styles={customStyles}
        value={selectedOption}
        onChange={this.handleSelection}
        setValue={this.setValue}
        options={tickerMap}
        isMulti
        isClearable
      />
      <h1>List</h1>
     		{isOptionSelected && 
     			<ul style={{listStyle: "none"}}>
     				{selectedOption.map((option, i) => <li key={i}>{`${option.label}: ${option.price} ${option.percent_7d}`}</li>)}
     			</ul>
     		}
	  		<p style={{marginTop: "40em"}}className="App-intro">{"Errors:" + error}</p>
      </div>
    );
  }
}
export default Tickers;
