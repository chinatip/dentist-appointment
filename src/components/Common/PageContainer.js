import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 40px;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
`;

class PageContainer extends Component {
  render() {
    const { title, children } = this.props;

    return (
      <Container>
        <Title>{title}</Title>
        { children }
      </Container>
    );
  }
}

export default PageContainer;