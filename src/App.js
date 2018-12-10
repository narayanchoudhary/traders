import React, { Component, Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Header from './components/Navbar';
import './App.css';

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
