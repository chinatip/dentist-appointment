import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Calendar } from 'antd';

const Container = styled.div`
  .ant-radio-group {
    display: none;
  }
`;

class CustomCalendar extends Component {
  constructor(props) {
    super();

    this.state = {
      date: moment()
    }
  }

  updateDate = (date, mode = null) => {
    this.setState({ date });
  }

  checkDisabledDate = (date) => {
    if (date.month() > 2) {
      return true;
    }

    return false;
  }

  render() {
    const { date } = this.state;

    return (
      <Container>
        <Calendar 
          value={date} 
          mode={'month'} 
          onSelect={this.updateDate} 
          onPanelChange={this.updateDate} 
          disabledDate={this.checkDisabledDate} 
        />
      </Container>
    );
  }
}

export default CustomCalendar;