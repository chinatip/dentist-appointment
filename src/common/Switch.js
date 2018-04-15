import React, { Component } from 'react'
import { Switch } from 'antd'

class CustomSwitch extends Component {
  render() {
    const { checked, onChange } = this.props

      return (
        <Switch checked={checked} onChange={onChange} />
      )
    }
  }

export default CustomSwitch