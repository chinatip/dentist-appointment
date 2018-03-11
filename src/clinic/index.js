import React, { Component } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import { ClinicNavigation } from 'common';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

class Index extends Component {
  render() {
    return (
      <Container>
        <ClinicNavigation />
      </Container>
    );
  }
}

export default Index;