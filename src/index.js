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
import addressReducer from './store/reducers/Address';
import partyReducer from './store/reducers/Party';

    let store = createStore(
        combineReducers({
            form:    formReducer,
            address: addressReducer,
            party:   partyReducer,
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
