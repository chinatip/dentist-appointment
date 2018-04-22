import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Button } from 'common' 
import { getUser } from 'redux/user'
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
const NavItemNormal = ({ onLogin }) => {
  return (
    <NavItemContainer>
      <Button value={'สมัคร'} landingPage />
      <Link onClick={onLogin}>เข้าสู่ระบบ</Link>
    </NavItemContainer>
  )
}

const NavItemLoggedIn = () => {
  return (
    <NavItemContainer>
      {/* <Button value={'สมัคร'} landingPage /> */}
    </NavItemContainer>
  )
}

const Navigation = ({ onLogin, user }) => {
  console.log('navigation', user)

  return (
    <Container>
      <Logo>MeetDent</Logo>
      { user? <NavItemLoggedIn />: <NavItemNormal onLogin={onLogin} /> }
    </Container>
  )
}

export default connect(
  (state) => ({ 
    user: getUser(state)
  }),
  { }
)(Navigation)