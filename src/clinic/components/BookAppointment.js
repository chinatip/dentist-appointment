import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import PageHeader from 'common/PageHeader'
import BookAppointmentForm from './BookAppointmentForm'
import { LOADER, FETCH, POST, LIST, CREATE, CLINIC, DENTIST_TIMESLOT, APPOINTMENT, PATIENT } from 'services'

const Container = styled.div``

const enhance = compose(
  LOADER,
  FETCH(APPOINTMENT, LIST),
  FETCH(DENTIST_TIMESLOT, LIST),
)

class Index extends Component {
  constructor(props) {
    super()

    this.state = { 
      patients: [],
      loading: true,
    }
  }

  componentDidMount () {
    this.loadPatients()
  }

  async loadPatients() {
    const { clinic } = this.props
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
    const { data } = this.state
    const { clinic, dentists } = this.props
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
    const { step, patients } = this.state
    const { appointments, dentistTimeslots, clinic } = this.props

    return <BookAppointmentForm clinic={clinic} patients={patients} appointments={appointments} dentistTimeslots={dentistTimeslots} />
  }

  render() {
    const { loading } = this.state

    if (loading) {
      return <div>loading</div>
    }

    return (
      <Container>
        <PageHeader title={'นัดหมาย'} />
        {this.renderForm()}
      </Container>
    )
  }
}

export default enhance(Index)