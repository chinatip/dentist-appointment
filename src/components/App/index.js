import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Home, Appointment, Contact } from 'components';
import { Navigation } from 'components/Common';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
const InnerContainer = styled.div`
  max-width: 962px;
  height: 100%;
  margin: 0 auto;
`;

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

export default App;
