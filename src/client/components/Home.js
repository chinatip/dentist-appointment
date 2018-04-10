import React, { Component } from 'react'
import styled from 'styled-components'
import { Modal } from 'antd'

import AppointmentModal from './appointment/AppointmentModal'
import PageContainer from './PageContainer'

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
const AppointmentButton = styled.button`
  margin-top: 70px;
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
      <PageContainer title={'Home'} home>
        <Container>
          <AppointmentButton onClick={this.handleModal('appointment')}>นัดหมอ</AppointmentButton>
          <AppointmentModal visible={modal.appointment} onOk={this.handleModal('appointment')} onCancel={this.handleModal('appointment')}/>
        </Container>
      </PageContainer>
    )
  }
}

export default Index

