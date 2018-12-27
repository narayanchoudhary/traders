import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Addresses from './Addresses';
import Items from './Items';
import Parties from './Parties';
import Home from './Home';
import Header from './Header';
import NewAddress from './AddressNew';
import Purchases from './Purchases';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
          <NewAddress />
          <Switch>
            <Route exact={true} path='/' component={Home} />
            <Route path='/masters/addresses' component={Addresses} />
            <Route path='/masters/items' component={Items} />
            <Route path='/masters/parties' component={Parties} />
            <Route path='/purchases' component={Purchases} />
          </Switch>
      </Fragment>
    );
  }
}

export default App;
