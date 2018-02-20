import React, { Component } from 'react';
import { DatePicker } from 'antd';


class CustomCalendar extends Component {
  handleChange = (date, date2 = null, str = null, str2 = null) => {
    console.log(date)
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