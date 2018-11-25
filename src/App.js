import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

        <div className='container'>
          <h2>Let’s find your ideal car</h2>
          <label className='search-input-label' >Pick-up Location</label>
          <input className='search-input' type='text' placeholder='city, airport, station, region, district…' />


        </div>
      
      </div>
    );
  }
}

export default App;
