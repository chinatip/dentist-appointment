import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { Button } from 'antd'

import { cssFontH4, cssFontP } from 'common/styles/style-base'

const colorWhite = '#fff'
const colorFadeWhite = 'rgba(255, 255, 255, 0.95)'
const cssLandingPageButton = css`
  .ant-btn {
    ${cssFontP}
    color: ${colorWhite};
    background-color: transparent;
    border-color: ${colorWhite};
    border-radius: 50px;
    border-width: 1.4px;
    font-weight: 500;

    &:hover {
      ${cssFontP}
      color: #42eeba;
      background-color: ${colorFadeWhite};
      border-color: #42eeba;
    }
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

const cssTeeth = css`
  .ant-btn {

    &:hover {

    }
  }
`

const cssSelectedTeeth = css`
  .ant-btn {
    color: red;

    &:hover {

    }
  }
`

const Container = styled.div`
  ${props => props.landingPage && cssLandingPageButton}
  ${props => props.landingPage && props.large && cssLandingPageLargeButton}
  ${props => props.teeth && cssTeeth}
  ${props => props.teeth && props.selectedTooth && cssSelectedTeeth}
`
class CustomButton extends Component {
  render() {
    const { value, onClick, landingPage, large, teeth, selectedTooth } = this.props

      return (
        <Container landingPage={landingPage} large={large} teeth={teeth} selectedTooth={selectedTooth}>
          <Button onClick={onClick}>{value}</Button>
        </Container>
      )
    }
  }

export default CustomButton