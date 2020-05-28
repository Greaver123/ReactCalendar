import React, { Component } from 'react';
import './App.css';
import Calendar from '../components/Calendar/Calendar.js';
import { Route, Link, Switch } from 'react-router-dom';
import Layout from './Layout/Layout';
import CreateAppointment from './../components/CreateAppointment/CreateAppoinment';

class App extends Component {
  render = () => {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/home" render={() => { return (<p>Home</p>) }} />
            <Route path="/appointments" exact component={Calendar} />
            <Route path="/appointments/create" exact component={CreateAppointment} />
            <Route path="/about" render={() => { return (<p>About me</p>) }} />
            <Route path="/contact" render={() => { return (<p>contact</p>) }} />
            <Route path="/" render={() => { return (<p>Home</p>) }} />
          </Switch>
        </Layout>

      </div>
    );
  }
}

export default App;
