import React, { Component } from 'react'
import styled from 'styled-components'

import { Button } from 'common' 

const Container = styled.div`
  width: 100%;
  height: 100px;
  padding-top: 20px;
  display: flex;
  align-items: center;
  color: #fff;
`
const Logo = styled.div`
  margin: auto;
  font-weight: 700;
  font-size: 25px;
`
const Line = styled.div`
  height: 70%;
  width: 1px;
  background: #fff;
  margin: auto 20px;
`
const NavItemContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`

export default () => {
  return (
    <Container>
      <Logo>MeetDent</Logo>
      {/* <Line /> */}
      <NavItemContainer>
        <Button value={'Login'} />
      </NavItemContainer>
    </Container>
  )
}