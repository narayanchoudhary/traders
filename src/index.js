import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import "react-table/react-table.css";
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import addressesReducer from './store/reducers/Addresses';
import partiesReducer from './store/reducers/Parties';
import storesReducer from './store/reducers/Stores';
import itemsReducer from './store/reducers/Items';
import hammalReducer from './store/reducers/Hammals';

    let store = createStore(
        combineReducers({
            form:    formReducer,
            address: addressesReducer,
            party:   partiesReducer,
            store:   storesReducer,
            item:    itemsReducer,
            hammal:  hammalReducer,
        }),
        applyMiddleware(thunk)
    );

let app =
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>;
    </Provider>


ReactDOM.render(app, document.getElementById('root'));
