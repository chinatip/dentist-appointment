import React, { Component } from 'react'
import styled from 'styled-components'
import { Modal } from 'antd'

import Navigation from './Navigation'
import { Button } from 'common'
import AppointmentModal from './appointment/AppointmentModal'
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
`
const Part2 = styled.div`
  flex-basis: 60%;
  flex-overflow: hidden;
`

class Index extends Component {
  constructor(props) {
    super() 

    this.state = {
      modal: { 
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

    return (
      <Container>
        <Background1 />
        <Background2 />
        <InnerContainer>
          <Navigation />
          <PartContainer>
            <Part1>
              <Part1Header>ให้ทุกการนัดหมายเป็นเรื่องง่าย</Part1Header>
              <Part1Subheader>สามารถเลือกคลินิคที่สะดวก จะนัดหรือยกเลิกเมื่อไหร่ก็ได้ และการแจ้งเตือนที่จะทำให้คุณไม่พลาดทุกการนัดหมาย</Part1Subheader>
              <Button onClick={this.handleModal('appointment')} value={'นัดหมาย'} landingPage large />
            </Part1>
            <Part2 />
          </PartContainer>
          <AppointmentModal visible={modal.appointment} onOk={this.handleModal('appointment')} onCancel={this.handleModal('appointment')}/>
        </InnerContainer>
      </Container>
    )
  }
}

export default Index

