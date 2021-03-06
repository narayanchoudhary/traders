import React, { Component, Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Addresses from './Addresses';
import Items from './Items';
import Stores from './Stores';
import Parties from './Parties';
import Home from './Home';
import Header from './Header';
import NewAddress from './AddressNew';
import NewStore from './StoreNew';
import NewParty from './PartyNew';
import NewItem from './ItemNew';
import Purchases from './Purchases';
import { fetchAddresses } from '../store/actions/Addresses';
import { fetchStores } from '../store/actions/Stores';
import { fetchParties } from '../store/actions/Parties';
import { fetchItems } from '../store/actions/Items';
import { fetchHammals } from '../store/actions/Hammals';
import Hammals from './Hammals';
import NewHammalForm from './HammalNew';

class App extends Component {

  componentDidMount() {
    this.props.fetchAddresses();
    this.props.fetchStores();
    this.props.fetchParties();
    this.props.fetchItems();
    this.props.fetchHammals();
  }

  render() {
    return (
      <Fragment>
        <Header />
        <NewAddress />
        <NewStore />
        <NewParty />
        <NewItem />
        <NewHammalForm />
        <Switch>
          <Route exact={true} path='/' component={Home} />
          <Route path='/masters/parties' component={Parties} />
          <Route path='/masters/addresses' component={Addresses} />
          <Route path='/masters/items' component={Items} />
          <Route path='/masters/stores' component={Stores} />
          <Route path='/masters/hammals' component={Hammals} />
          <Route path='/purchases' component={Purchases} />
        </Switch>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAddresses: () => dispatch(fetchAddresses),
    fetchStores: () => dispatch(fetchStores),
    fetchParties: () => dispatch(fetchParties()),
    fetchItems: () => dispatch(fetchItems),
    fetchHammals: () => dispatch(fetchHammals),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
