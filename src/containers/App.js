import React, { Component } from 'react';
import './App.css';
import Calendar from '../components/Calendar/Calendar.js';

class App extends Component {
  render = () => {
    return (
      <div>
        <Calendar/>
      </div>
    );
  }
}

export default App;
