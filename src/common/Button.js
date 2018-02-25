import React, { Component } from 'react';
import { Button } from 'antd';

class CustomButton extends Component {
  render() {
    const { value, onClick } = this.props;

      return (
        <Button type="primary" onClick={onClick}>{value}</Button>
      );
    }
  }

export default CustomButton;