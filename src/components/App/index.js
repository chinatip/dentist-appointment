import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Home, Appointment, Contact } from 'components';
import { Calendar, Navigation } from 'components/Common';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`
const InnerContainer = styled.div`
  max-width: 962px;
  margin: 0 auto;
`

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
