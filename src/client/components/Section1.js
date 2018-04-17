import React, { Component } from 'react'
import styled from 'styled-components'
import { Modal } from 'antd'

import Navigation from './Navigation'
import { Button } from 'common'
import AppointmentModal from './appointment/AppointmentModal'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 800px;
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
          <Button onClick={this.handleModal('appointment')} value={'นัดหมอ'} />
          <AppointmentModal visible={modal.appointment} onOk={this.handleModal('appointment')} onCancel={this.handleModal('appointment')}/>
        </InnerContainer>
      </Container>
    )
  }
}

export default Index

