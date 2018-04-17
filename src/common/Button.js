import React, { Component } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'

const Container = styled.div`
  .ant-btn {
    color: #1bcfb9;
    font-weight: 400;
    background-color: #fff;
    border-color: #fff;
    border-radius: 50px;
  }
`
class CustomButton extends Component {
  render() {
    const { value, onClick } = this.props

      return (
        <Container>
          <Button onClick={onClick}>{value}</Button>
        </Container>
      )
    }
  }

export default CustomButton