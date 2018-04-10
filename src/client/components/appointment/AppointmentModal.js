import _ from 'lodash'
import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import { compose } from 'recompose'

import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

import { Modal } from 'common'
import { LOADER, FETCH, LIST, CLINIC, DENTIST, DENTIST_APPOINTMENT, APPOINTMENT } from 'services'

const Container = styled.div``

const GlobalStyles = ({ theme }) => {
  injectGlobal `
    .appointment-modal {
      .ant-modal-footer {
        display: none;
      }
    }
  `;

  return null;
}

const enhance = compose(
  LOADER,
  FETCH(CLINIC, LIST),
  FETCH(DENTIST, LIST),
  FETCH(APPOINTMENT, LIST),
  FETCH(DENTIST_APPOINTMENT, LIST),
)

class Index extends Component {
  constructor(props) {
    super()

    this.state = {
      step: 0,
      data: {}
    }
  }

  handleSubmit = (newData) => {
    const { step, data } = this.state
    const updateData = { ...data, ...newData }
    this.setState({ data: updateData })
    
    if (step < 2) {
      this.setState({ step: step + 1 })
    }

    console.log(`Step: ${step} ;`, 'submit data:', updateData)
  }

  handleUpdateStep = (step) => () => {
    const newStep = step > 3 ? 2 : step < 0 ? 0 : step

    this.setState({ step: newStep })
  }

  findDentists() {
    const { data } = this.state
    const { clinics, dentists } = this.props
    const clinic = _.filter(clinics, (c) => c._id === data.clinic)[0]
    const matchDentists = _.filter(clinic.dentists, (d) => {
      let match = false
      d.treatments.forEach((t) => {
        if (t._id === data.treatment) {
          match = true
        }
      })
      return match
    })
    
    return matchDentists
  }
  
  renderStep() {
    const { step, data } = this.state
    const { clinics, appointments } = this.props

    if (step === 0) {
      return <Step1 onSubmit={this.handleSubmit} clinics={clinics} data={data} />
    } else if (step === 1) {
      const matchDentists = []
      return <Step2 onSubmit={this.handleSubmit} onBackStep={this.handleUpdateStep(step - 1)} 
        dentists={this.findDentists()} appointments={appointments} data={data} />
    } else if (step === 2) {
      return <Step3 onSubmit={this.handleSubmit} onBackStep={this.handleUpdateStep(step - 1)} />
    }

    return <Step1 />
  }

  render() {
    const { visible, onOk, onCancel, children } = this.props
    console.log(this.props)
    return (
      <Container>
        <GlobalStyles />
        <Modal visible={visible} onOk={onOk} onCancel={onCancel} wrapClassName={'appointment-modal'}>
          {this.renderStep()}
        </Modal>
      </Container>
    )
  }
}

export default enhance(Index)