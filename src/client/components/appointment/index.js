import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

import { getUser } from 'redux/user'
import PageHeader from 'common/PageHeader'
import { LOADER, FETCH, POST, LIST, CREATE, CLINIC, DENTIST, DENTIST_TIMESLOT, APPOINTMENT } from 'services'

const Container = styled.div``

const InstructionContainer = styled.div`
  margin-top: 25px;
  border: 5px solid #3ed925;
  background-color: #c9ffbf;
  padding: 5px;
  h2{
    color: #00bcce;
  }
`

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

    this.state = this.initState()
  }

  initState() {
    return { step: 0, data: {} }
  }

  handleSubmit = (newData) => {
    const { step, data } = this.state
    const updateData = { ...data, ...newData }
    this.setState({
      data: updateData,
      step: step + 1
    })
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
    this.setState(this.initState())
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
    const { clinics, appointments, dentistTimeslots } = this.props

    if (step === 0) {
      return <Step1 onSubmit={this.handleSubmit} clinics={clinics} data={data} />
    } else if (step === 1) {
      const matchDentists = []
      return <Step2 onSubmit={this.handleSubmit} onBackStep={this.handleUpdateStep(step - 1)}
        dentists={this.findDentists()} appointments={appointments} data={data} timeslots={dentistTimeslots} />
    } else if (step === 2) {
      return <Step3 onSubmit={this.createAppointment} onBackStep={this.handleUpdateStep(step - 1)} data={data} />
    }

    return <Step1 onSubmit={this.handleSubmit} clinics={clinics} data={data} />
  }

  renderinstruction(){
    return <InstructionContainer>
      <h2>ขั้นตอนการนัดหมาย</h2>
      <p>1. เลือกคลินิค </p>
      <p>2. เลือกการรักษา </p>
      <p>3. เลือกทันตแพทย์ </p>
      <p>4. เลือกเลือกวันที่ </p>
      <p>5. เลือกเวลานัดหมาย </p>
      <p>6. เช็ดความถูกต้องของข้อมูล </p>
      <p>7. เลือกตกลง</p>
      <p>8. การนัดหมายเสร็จสิ้น</p>
    </InstructionContainer>
  }

  render() {
    return (
      <Container>
        <PageHeader title={'นัดหมาย'}/>
        {this.renderStep()}
        {this.renderinstruction()}
      </Container>
    )
  }
}

export default connect(
  (state) => ({
    user: getUser(state)
  }),
  { }
)(enhance(Index))
