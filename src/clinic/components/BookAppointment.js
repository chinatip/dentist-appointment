import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import BookAppointmentForm from './BookAppointmentForm'
import { LOADER, FETCH, POST, LIST, CREATE, CLINIC, DENTIST, DENTIST_TIMESLOT, APPOINTMENT, PATIENT } from 'services'

const Container = styled.div``

const enhance = compose(
  LOADER,
  FETCH(CLINIC, LIST),
  FETCH(DENTIST, LIST),
  FETCH(APPOINTMENT, LIST),
  FETCH(DENTIST_TIMESLOT, LIST),
)

class Index extends Component {
  constructor(props) {
    super()

    this.state = { 
      clinic: props.clinics[0],
      patients: [],
      loading: true,
    }
  }

  componentDidMount () {
    this.loadPatients()
  }

  async loadPatients() {
    const { clinic } = this.state
    const patients = await POST(CLINIC, PATIENT, { _id: clinic._id })

    this.setState({ loading: false, patients })
  }

  createAppointment = async () => {
    const { data } = this.state
    const { user: { _id }, onCancel } = this.props
    const body = { 
      ...data, 
      patient: _id,
      status: 'waiting'
    }

    const res = await POST(APPOINTMENT, CREATE, body)
  }

  findDentistsByTreatment() {
    const { clinic, data } = this.state
    const { dentists } = this.props
    const matchDentists = _.filter(clinic.dentists, (dent) => {
      let match = false
      dent.treatments.forEach((t) => {
        if (t._id === data.treatment) {
          match = true
        }
      })

      return match
    })
    
    return matchDentists
  }
  
  renderForm() {
    const { step, clinic, patients } = this.state
    const { appointments, dentistTimeslots } = this.props

    return <BookAppointmentForm clinic={clinic} />
  }

  render() {
    const { visible, onOk, onCancel } = this.props

    return (
      <Container>
        {this.renderForm()}
      </Container>
    )
  }
}

export default enhance(Index)