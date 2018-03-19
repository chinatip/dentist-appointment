import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import Routes from './Routes'
import reducer from 'redux/reducers';
import registerServiceWorker from './registerServiceWorker';
import 'antd/dist/antd.css';
import 'common/styles/global.css';

const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(reducer, {}, composeEnhancers(applyMiddleware(...middlewares)));

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

class App extends Component {
  render() {
    return (
      <Provider store={store} key="provider">
        <Container>
          <Routes />
        </Container>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
