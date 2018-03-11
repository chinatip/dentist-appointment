import React, { Component } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import { Navigation } from 'common';
import { Home, Appointment, Contact } from './features';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
const InnerContainer = styled.div`
  max-width: 962px;
  margin: 0 auto;
`;

class Index extends Component {
  render() {
    return (
      <Container>
        <Navigation />
        <InnerContainer>
          <Route exact path="/" component={Home} />
          <Route path="/appointment" component={Appointment} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={Contact} />
        </InnerContainer>
      </Container>
    );
  }
}

export default Index;