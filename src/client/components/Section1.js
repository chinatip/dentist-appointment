import React, { Component } from 'react'
import styled from 'styled-components'
import { Modal } from 'antd'

import Navigation from './Navigation'
// import AppointmentModal from './appointment/AppointmentModal'
import LoginModal from './LoginModal'

import { Button } from 'common'
import { cssFontH1, cssFontP, colorWhite } from 'common/styles/style-base'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 800px;
  position: relative;
`
const Background1 = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #00bec9 0%, #00d6c2 35%, #4cf5b5 90%, #48f5b4 100%);
`
const Background2 = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(transparent, #fff 98%);
`
const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 926px;
  margin: auto;
  position: relative;
`
const PartContainer = styled.div`
  height: 70%;
  display: flex;
`

const Part1 = styled.div`
  flex-basis: 40%;
  flex-overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Part1Header = styled.div`
  ${cssFontH1}
  color: ${colorWhite};
  margin-bottom: 1.5rem;
`
const Part1Subheader = styled.div`
  ${cssFontP}
  color: ${colorWhite};
  margin-bottom: 2.5rem;
  line-height: 1.6rem;
`

const Part2 = styled.div`
  flex-basis: 60%;
  flex-overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Circle1 = styled.div`
  width: 3rem;
  height: 3rem;
  background: linear-gradient(146deg, rgba(255,255,255,0.66), #83F5D1 60%, #50F5B7);
  position: absolute;
  transform: translate(280%,-278%);
  border-radius: 50%;
`
const Circle2 = styled.div`
  width: 5.5rem;
  height: 5.5rem;
  background: linear-gradient(green,black);
  position: absolute;
  background: linear-gradient(109deg, rgba(255, 255, 255, 0.15),rgba(177, 247, 230, 0.28) 40%, rgba(68, 211, 214, 0.34) 90%);
  transform: translate(-82%,138%);
  border-radius: 50%;
`

class Index extends Component {
  constructor(props) {
    super() 

    this.state = {
      modal: { 
        login: false,
        appointment: false
      } 
    }
  }

  handleModal = (name) => () => {
    const newState = this.state
    newState.modal[name] = !newState.modal[name]

    this.setState(newState)
  }

  render() {
    const { modal } = this.state
    const { user } = this.props

    return (
      <Container>
        <Background1 />
        <Background2 />
        <InnerContainer>
          <Navigation onLogin={this.handleModal('login')} />
          <PartContainer>
            <Part1>
              <Part1Header>ให้ทุกการนัดหมายเป็นเรื่องง่าย</Part1Header>
              <Part1Subheader>สามารถเลือกคลินิคที่สะดวก จะนัดหรือยกเลิกเมื่อไหร่ก็ได้ และการแจ้งเตือนที่จะทำให้คุณไม่พลาดทุกการนัดหมาย</Part1Subheader>
              <Button onClick={this.handleModal('appointment')} value={'นัดหมาย'} landingPage large />
            </Part1>
            <Part2>
              <Circle1 />
              <Circle2 />
            </Part2>
          </PartContainer>
          {/* <AppointmentModal visible={modal.appointment} onOk={this.handleModal('appointment')} onCancel={this.handleModal('appointment')} /> */}
          <LoginModal visible={modal.login} onOk={this.handleModal('login')} onCancel={this.handleModal('login')} />
        </InnerContainer>
      </Container>
    )
  }
}

export default Index

