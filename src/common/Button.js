import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { Button } from 'antd'

import { cssFontH4, cssFontP, colorBlue2 } from 'common/styles/style-base'

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
    ${cssFontP}
    width: 42px;
    margin-right: 5px;
    color: #d3d6d6;
    border-color: #d3d6d6;
    font-size: 0.9rem;
    
    &:hover {

    }
  }
`

const cssSelectedTeeth = css`
  .ant-btn {
    color: #fff;
    background: ${colorBlue2};
    border: none;

    &:hover {
      color: ${colorBlue2};
      border: 1px solid ${colorBlue2};
      background: #fff;
    }
  }
`

const cssClose = `
  .ant-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    &:hover {
      background: none;
      border: none;
      font-size: 1.2rem;
      color: rgba(0, 0, 0, 0.30);
    }
  }
`

const Container = styled.div`
  ${props => props.landingPage && cssLandingPageButton}
  ${props => props.landingPage && props.large && cssLandingPageLargeButton}
  ${props => props.teeth && cssTeeth}
  ${props => props.teeth && props.selectedTooth && cssSelectedTeeth}
  ${props => props.close && cssClose}
`
class CustomButton extends Component {
  render() {
    const { value, onClick, landingPage, large, teeth, selectedTooth, close } = this.props

      return (
        <Container landingPage={landingPage} large={large} teeth={teeth} selectedTooth={selectedTooth} close={close}>
          <Button onClick={onClick}>{value}</Button>
        </Container>
      )
    }
  }

export default CustomButton