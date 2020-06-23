import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Containers/App/App';
import * as serviceWorker from './serviceWorker';
import {HashRouter} from 'react-router-dom';
import {createStore,compose} from 'redux';
import {Provider} from 'react-redux';
import {rootReducer} from './Store/rootReducer';

// used to enable redux dev tools , Also not disabled in production due to testing purposes
const  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const store = createStore(rootReducer,composeEnhancers());


ReactDOM.render(
  <Provider store={store}>
  <HashRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </HashRouter></Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
