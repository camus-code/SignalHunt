import React from 'react';

class TickerList extends React.Component {
	removeTicker(item, i) {
  	this.props.removeTicker(item, i);
  }
  render() {
	  return (
	  	<div>
	  	{this.props.isTickerSelected ?
	  		<div>
	  		<h1>Tickers</h1>
	  		<button onClick={this.props.clearTickers}>Clear selections</button>
	  		<ul style={{listStyle: "none"}}>
        {this.props.selectedTickers.map((option,i) => {
        	return (
        		<li key={i}>{`${option.label}: ${option.price} ${option.percent_7d}`}
        		  <button onClick={() => { this.removeTicker(option, i)}}>X</button>
        		</li>        	
        )})}
	    	</ul>
	    	</div> : null}
	  	</div>
	    
	  );
	}
}

export default TickerList;