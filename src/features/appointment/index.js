import React, { Component } from 'react';
import styled from 'styled-components';

import { PageContainer, DatePicker } from 'common';


const Container = styled.div`
  
`;
const DatePickerContainer = styled.div`
  height: 400px;
`;

class Index extends Component {
  render() {
    return (
      <PageContainer title={'Appointment'}>
        <Container>
          <DatePickerContainer>
            <DatePicker size={'large'} />
          </DatePickerContainer>
        </Container>
      </PageContainer>
    );
  }
}

export default Index;