import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      searchResults : [],
      isLoading : false,
      inputValue: '',
      showSearch: true,
      lostFocus: false
    }
    this.search = this.search.bind(this);     
    this.onFocus = this.onFocus.bind(this);     
   }



   search(e) {
    let inputTxt = e.target.value;
    this.setState({inputValue: inputTxt})
    // only if search input has more than 1 character search for results
    if (inputTxt.length > 1) {
        this.getSearchResults(inputTxt);
    } else {
      // empty search results if input is less than 2 characters
      this.setState({
        searchResults: []
      })
    }
  }

  getSearchResults(searchTerm){
    let NoOfResults = 6;// number of results to be returned
    this.setState({isLoading: true}); //show loading indicator
    fetch(`https://cors.io/?https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${NoOfResults}&solrTerm=${searchTerm}`)
    .then(res=> res.json())
    .then(res=>{
      this.setState({isLoading: false}); // hide loading indicator

      let results = res.results.docs;  

      /* because the request is asynchronous another check is needed to see if the input values
       have changed since the results from the request was recieved */
      if (this.searchInput.value.length<2) {
        this.setState({
          searchResults: []
        })
      }else {
        this.setState({
          searchResults: results
        })
      }
    })
  }
  onFocus(){
    this.setState({lostFocus: false})    
  }
  selectLocation(name){
    this.setState({
      inputValue:name,
      lostFocus:true
    });
    
  }

  render() {
    let resultsFound = true;      
    if (this.state.searchResults[0] && this.state.searchResults[0].name === 'No results found'){
        resultsFound = false;
    }
    else resultsFound = true;
    return (
      <div className="App">

        <div className='container'>
          <h2>Let’s find your ideal car</h2>
          <label className='search-input-label' >Pick-up Location</label>

          <input className='search-input'
            onFocus={this.onFocus} 
            value={this.state.inputValue}
            onChange={this.search}
            ref={el => this.searchInput =el}
            type='text' placeholder='city, airport, station, region, district…' />
          
          {
            this.state.isLoading &&
            <img className='search-input-loader' src='https://cdn2.rcstatic.com/images/site_graphics/newsite/preloader64.gif' alt='loading' />
          }
          
          <div  className={this.state.lostFocus ? 'hidden' : 'search-results'} >
          {resultsFound ? (
            
            this.state.searchResults.map((item,index)=>{
              let iata ='';
              let city = '';
              let region = '';
              let locationType = item.bookingId.split('-')[0];

              if (item.iata) iata = `(${item.iata})`;
              if (item.region) region = `${item.region},`;
              if (item.city) city = `${item.city},`;
              if (locationType === 'train') locationType = 'station';
      
              return( 
                <div className='search-result' key={index} onClick={ () => this.selectLocation(item.name)}>
                  <div className={`search-result__type search-result__type--${locationType}`} > {locationType} </div>
                  <div className='search-result__name'>
                    {item.name} {iata}
                    <span>{city || region} {item.country}</span>
                  </div>
                </div>
              )

            },this)
          ) : (
            <div className='search-result search-result--disbaled'>
              No results found      
            </div>     
          )}
          

          </div>
        </div>
      </div>
    );
  }
}

export default App;
