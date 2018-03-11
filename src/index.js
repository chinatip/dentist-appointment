import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from 'redux/reducers';
import 'antd/dist/antd.css';
import 'common/styles/global.css';
import Client from 'client';
import registerServiceWorker from './registerServiceWorker';

const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let store = createStore(reducer, {},  composeEnhancers(applyMiddleware(...middlewares)))

// TODO: add file prettierc => always ' quote, always semi-colon 
class App extends Component {
  render() {
    return (
      <Provider store={store} key="provider">
        <Router>
          <Client />
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
