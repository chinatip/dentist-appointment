import React, { Component } from 'react';
import styled from 'styled-components';

import Navigation from './Navigation';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
const InnerContainer = styled.div`
  max-width: 962px;
  margin: 0 auto;
  padding-top : 40px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
`;

export default ({ title, children }) => {
  return (
    <Container>
      <Navigation />
      <InnerContainer>
        <Title>{title}</Title>
        { children }
      </InnerContainer>
    </Container>
  );
}