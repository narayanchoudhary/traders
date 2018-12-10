import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import  Addresses from './Addresses';
import  Home from './Home';
import Header from './Header';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route exact={true} path='/' component={Home} />
          <Route path='/masters/addresses' component={Addresses} />
        </Switch>

      </Fragment>
    );
  }
}

export default App;