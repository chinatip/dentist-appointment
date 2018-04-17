import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { Button } from 'antd'

import { cssFontH4 } from 'common/styles/style-base'

const colorWhite = '#fff'

const cssLandingPageButton = css`
  .ant-btn {
    ${cssFontH4}
    color: #6acec9;
    background-color: ${colorWhite};
    border-color: ${colorWhite};
    border-radius: 50px;
  }
`
const cssLandingPageLargeButton = css`
  .ant-btn {
    ${cssFontH4}
    color: #6acec9;
    background-color: ${colorWhite};
    border-color: transparent;
    width: 12.5rem;
    height: 2.8125rem;
    transition: all 0.5s;

    &:hover {
      ${cssFontH4}
      color: #84e7e2;
      background-color: ${colorWhite};
      border-color: #84e7e2;
      width: 12.5rem;
      height: 2.8125rem;
    }
  }
`

const Container = styled.div`
  ${props => props.landingPage && cssLandingPageButton}
  ${props => props.landingPage && props.large && cssLandingPageLargeButton}
`
class CustomButton extends Component {
  render() {
    const { value, onClick, landingPage, large } = this.props

      return (
        <Container landingPage={landingPage} large={large}>
          <Button onClick={onClick}>{value}</Button>
        </Container>
      )
    }
  }

export default CustomButton