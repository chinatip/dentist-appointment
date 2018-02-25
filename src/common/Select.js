import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

class CustomSelect extends Component {
  render() {
    const { value, options, onChange } = this.props;
    
    return (
      <Select value={value} onChange={onChange}>
        { options.map((opt) => {
          return <Option value={opt.value}>{opt.label}</Option>;
        })}
      </Select>
    );
    }
  }

export default CustomSelect;