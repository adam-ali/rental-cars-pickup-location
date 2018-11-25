import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      searchInput : []  
    }
    this.search = this.search.bind(this);    
   }

   search(e) {
    let inputTxt = e.target.value;
    // only if search input has more than 1 character search for results
    if (inputTxt.length > 1) {
        this.getSearchResults(inputTxt)
    } else {
      // empty search results if input is less than 2 characters
      this.setState({
        searchInput: []
      })
    }
    console.log(inputTxt, inputTxt.length);
  }

  getSearchResults(searchTerm){
    // number of results to be returned 
    let NoOfResults = 6;
    fetch(`https://cors.io/?https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${NoOfResults}&solrTerm=${searchTerm}`)
    .then(res=> res.json())
    .then(res=>{
      console.log(res.results.docs)
      this.setState({
        searchInput: res.results.docs
      })
    })
  }

  render() {
    console.log('-=-=-=-=');
    console.log(typeof this.state.searchInput);
    return (
      <div className="App">

        <div className='container'>
          <h2>Let’s find your ideal car</h2>
          <label className='search-input-label' >Pick-up Location</label>
          <input className='search-input' onChange={this.search}  type='text' placeholder='city, airport, station, region, district…' />


        </div>
      
      </div>
    );
  }
}

export default App;
