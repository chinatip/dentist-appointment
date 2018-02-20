import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'antd/dist/antd.css';
import 'common/styles/global.css';
import { Navigation } from 'common';
import { Home, Appointment, Contact } from 'features';
import registerServiceWorker from './registerServiceWorker';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
const InnerContainer = styled.div`
  max-width: 962px;
  margin: 0 auto;
`;

// TODO: add file prettierc => always ' quote, always semi-colon 
class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Navigation />
          <InnerContainer>
            <Route exact path="/" component={Home} />
            <Route path="/appointment" component={Appointment} />
            <Route path="/contact" component={Contact} />
          </InnerContainer>
        </Container>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
