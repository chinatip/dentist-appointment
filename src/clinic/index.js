import React, { Component } from 'react';
import styled from 'styled-components';

import Navigation from './components/Navigation';
import Status from './components/Status';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
`;

class Index extends Component {
  render() {
    return (
      <Container>
        <Navigation />
        <InnerContainer>
          <Title>Status1</Title>
          <Status />
        </InnerContainer>
    </Container>
    );
  }
}

export default Index;