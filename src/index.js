import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from 'redux/reducers';
import 'antd/dist/antd.css';
import 'common/styles/global.css';
import Clinic from 'clinic';
import { Home, Appointment, Contact } from 'client'
import registerServiceWorker from './registerServiceWorker';

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
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/appointment" component={Appointment} />
              <Route path="/contact" component={Contact} />
              <Route path="/login" component={Contact} />
              <Route exact path="/clinic" render={() => <Redirect to="/clinic/status" />} />
              <Route path="/clinic/:type" component={Clinic} />
            </Switch>
          </Router>
        </Container>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
