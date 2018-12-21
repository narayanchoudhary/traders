import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import "react-table/react-table.css";
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

    let store = createStore(
        combineReducers({
            form: formReducer
        })
    );

let app =
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>;
    </Provider>


ReactDOM.render(app, document.getElementById('root'));
