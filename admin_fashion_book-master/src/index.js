import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import App from './containers/App'
import thunk from 'redux-thunk'
import reducers from './reducers'
const middleware = [ thunk ];

import { API_URL } from './constants/urls';

axios.defaults.baseURL = API_URL;
    
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

let store = createStore(
    reducers,
    applyMiddleware(...middleware)
)

render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root')
)
