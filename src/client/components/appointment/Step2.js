import _ from 'lodash'
import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { Form } from 'antd'

import { stringToMoment } from 'common/utils'

import { FormContainer, FormItem, NavigationButton } from 'common/form'

const TimetableContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const cssSelectSlot = css`
  background: #40a9ff;
  color: #fff;
`
const Timeslot = styled.div`
  border: 1px solid #40a9ff;
  border-radius: 4px;
  padding: 10px;
  max-width: 60px;
  text-align: center;
  margin-right: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  &:hover {
    ${cssSelectSlot}
  }

  ${props => props.select && cssSelectSlot}
`

class Step2Form extends Component {
  componentDidMount () {
    this.initForm(this.props)
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextProps.data !== this.props.data) {
      this.initForm(nextProps)
    }
  }

  initForm({ form: { setFields }, data: { dentist, date, slot }}) {
    setFields({
      dentist: {
        value: dentist,
      },
      date: {
        value: date,
      },
      slot: {
        value: slot
      }
    })
  }

  handleTimeslot = (slotId) => () => {
    const { form: { setFields }} = this.props

    setFields({
      slot: {
        value: slotId
      }
    })
  }

  handleSubmit = (e) => {
    const { form, onSubmit } = this.props

    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit(values)
      }
    })
  }

  findTimeslot({ appointments, timeslots, dentist, date }) {
    const selectedDateAppointments = appointments.filter((app) => {
      const appDate = stringToMoment(app.slot.startTime)
      return appDate.isSame(date, 'days') && app.status !== 'cancel'
    })

    const dentistSlots = timeslots.filter((slot) => {
      const slotDate = stringToMoment(slot.startTime)

      return slot.dentist._id === dentist && slotDate.isSame(date, 'days')
    })

    let availableTimeslots = dentistSlots.filter((slot) => 
      !(selectedDateAppointments.filter((app) => {
        return app.slot._id === slot._id
      }).length === 1)
    )
    availableTimeslots = _.sortBy(availableTimeslots, 'startTime')

    return availableTimeslots
  }

  renderTimetable() {
    const { form: { getFieldValue }, appointments, timeslots } = this.props
    
    const dentist = getFieldValue('dentist')
    const date = getFieldValue('date')

    if (dentist && date) {
      const availableTimeslots = this.findTimeslot({ appointments, timeslots, dentist, date })
      const timeslot = getFieldValue('slot')

      return (
        <TimetableContainer>
          { availableTimeslots.length > 0? 
            availableTimeslots.map((slot) => {
              const date = stringToMoment(slot.startTime).format('H:mm')

              return (
                <Timeslot select={slot._id === timeslot} onClick={this.handleTimeslot(slot._id)}>
                  {date}
                </Timeslot>
              )
            }) : 'ไม่พบช่วงเวลาว่าง'
          }
        </TimetableContainer>
      )
    }

    return <noscript />
  }

  render() {
    const { form: { getFieldDecorator }, dentists, onBackStep } = this.props

    return (
      <FormContainer width={700}>
        <FormItem label={'ทันตแพทย์'} field={'dentist'} message={'กรุณาทันตแพทย์'} getFieldDecorator={getFieldDecorator} 
          options={{ list: dentists, label: (l) => `${l.firstname} ${l.lastname}` }} />
        <FormItem label={'วันที่นัดหมาย'} field={'date'} message={'กรุณาวันที่'} getFieldDecorator={getFieldDecorator} date />
        <FormItem label={'วันที่นัดหมาย'} field={'slot'} message={'กรุณาวันที่'} getFieldDecorator={getFieldDecorator} hidden />
        { this.renderTimetable() }
        <NavigationButton onBackStep={onBackStep} onSubmit={this.handleSubmit} />
      </FormContainer>
    )
  }
}

const WrappedForm = Form.create()(Step2Form)

class Step2 extends Component {
  render() {
    const { clinics } = this.props

    return (
      <WrappedForm {...this.props} />
    )
  }
}

export default Step2