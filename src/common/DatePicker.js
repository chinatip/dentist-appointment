import React, { Component } from 'react';
import { DatePicker } from 'antd';

class CustomCalendar extends Component {
  handleChange = (date, str) => {
    console.log(date, str)
  }

  render() {
    const { size } = this.props;

    return (
      <DatePicker 
        size={size}
        onChange={this.handleChange} 
        onCalendarChange={this.handleChange} 
      />
    );
  }
}

export default CustomCalendar;