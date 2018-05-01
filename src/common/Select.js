import React, { Component } from 'react'
import styled from 'styled-components'
import { Select } from 'antd'

import { cssFontH3, cssFontP, colorBlue } from 'common/styles/style-base'

const Container = styled.div`
  .ant-select-selection__rendered {
    .ant-select-selection-selected-value {
      ${cssFontP}
      line-height: 1.8rem;
      font-size: 0.85rem;
    }
  }
`

const Option = Select.Option

class CustomSelect extends Component {
  render() {
    const { value, options, onChange, mode,...props } = this.props
    
    return (
      <Container>
        <Select value={value} onChange={onChange} mode={mode || 'default'}>
          { options.map((opt) => {
            return <Option {...props} value={opt.value}>{opt.label}</Option>
          })}
        </Select>
      </Container>
    )
  }
}

export default CustomSelect