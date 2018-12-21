import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Addresses from './Addresses';
import Items from './Items';
import Home from './Home';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
          <Switch>
            <Route exact={true} path='/' component={Home} />
            <Route path='/masters/addresses' component={Addresses} />
            <Route path='/masters/items' component={Items} />
          </Switch>
      </Fragment>
    );
  }
}

export default App;
