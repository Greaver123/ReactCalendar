import React, { Component } from 'react';
import './App.css';
import Calendar from '../components/Calendar/Calendar.js';
import { Route, Link, Switch } from 'react-router-dom';

class App extends Component {
  render = () => {
    return (
      <div>
        <Switch>
          <Route path="/appointments" exact component={Calendar} />
          <Route path="/appointments/create" exact render={() => { return (<p>Create apointment</p>) }} />
          <Route path="/about" render={() => { return (<p>About me</p>) }} />
          <Route path="/" render={() => { return (<p>Home</p>) }} />
        </Switch>
      </div>
    );
  }
}

export default App;
