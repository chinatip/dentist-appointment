import React, { Component } from 'react'
import styled from 'styled-components'

import { Button } from 'common' 
import { cssFontP } from 'common/styles/style-base'

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
const NavItemContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const Link = styled.div`
  ${cssFontP}
  color: white;
  line-height: 2rem;
  text-decoration: underline;
  margin-left: 20px;
  cursor: pointer;
`

export default ({ onLogin }) => {
  return (
    <Container>
      <Logo>MeetDent</Logo>
      <NavItemContainer>
        <Button value={'สมัคร'} landingPage />
        <Link onClick={onLogin}>เข้าสู่ระบบ</Link>
      </NavItemContainer>
    </Container>
  )
}