import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'
import { Form, Tag, message } from 'antd'
import moment from 'moment'

import { TimeslotTable } from 'common'
import { stringToMoment } from 'common/utils'
import { FormContainer, FormItem, NavigationButton } from 'common/form'
import { POST, CREATE, APPOINTMENT } from 'services'

class AppointmentForm extends Component {
  state = {
    slot: null
  }

  componentDidMount () {
    this.initForm(this.props)
  }

  initForm({ form, clinic }) {
    form.setFields({
      clinic: {
        value: clinic,
      },
      date: {
        value: moment()
      }
    })
  }

  handleSubmit = (e) => {
    const { form, onSubmit } = this.props

    e.preventDefault()
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const body = { 
          ...values, 
          status: 'waiting'
        }
        this.setState({ appointmentStatus: 'loading', appointmentErr: null })
        try {
          const res = await POST(APPOINTMENT, CREATE, body)
          this.setState({ appointmentStatus: 'success', appointmentErr: null })
          message.success('นัดหมายสำเร็จ')
        } catch (err) {
          this.setState({ appointmentStatus: 'error', appointmentErr: err })
          message.error(err.message)
        }

        form.setFields({
          patient: {
            value: null,
          },
          treatment: {
            value: null
          }
        })
      }
    })
  }

  updateSlot = (slot) => {
    const { form: { setFields }} = this.props

    setFields({
      slot: {
        value: slot? slot._id: slot,
      }
    })
    this.setState({ slot })
  }

  getTreatmentsOptions() {
    const { form: { getFieldValue }, clinic } = this.props
    let treatments = {}

    clinic.dentists.forEach((dent) => {
      dent.treatments.forEach((t) => {
        treatments[t._id] = t
      })
    })

    return treatments
  }

  getDentistOptions() {
    const { clinic: { dentists }, form: { getFieldValue } } = this.props
    const treatment = getFieldValue('treatment')

    const dentistsOptions = dentists.filter((dent) => {
      let haveTreatment = false
      dent.treatments.forEach((t) => {
        if (t._id === treatment) {
          haveTreatment = true
        }
      })
      return haveTreatment
    })

    return dentistsOptions
  }

  findAvailableSlots(dent, date) {
    const { appointments, dentistTimeslots, clinic } = this.props
    const availableSlots = []
    const slotById = {}
    dentistTimeslots.forEach((denSlot) => {
      const { _id, startTime, dentist } = denSlot

      if (dentist._id === dent) {
        appointments.forEach((app) => {
          const { slot, treatment, status } = app
          
          if (_id !== slot._id) {
            if (stringToMoment(startTime).isSame(date, 'days') && status !== 'cancel' ){
              slotById[_id] = denSlot
            }
          }
        })
      }

    })

    return _.toArray(slotById)
  }

  renderTimeSlot() {
    const { slot } = this.state
    const { form: { getFieldValue } } = this.props
    const dentist = getFieldValue('dentist')
    const date = getFieldValue('date')
    
    if (dentist && date) {
      const availableSlots = this.findAvailableSlots(dentist, date)

      return <TimeslotTable availableSlots={availableSlots} slot={slot} updateSlot={this.updateSlot} />
    }

    return <div />
  }

  render() {
    const { appointmentStatus } = this.state
    const { clinic, patients, form: { getFieldDecorator } } = this.props

    return (
      <FormContainer width={700}>
        <FormItem label={'คนไข้'} field={'patient'} message={'กรุณาเลือกคนไข้'} getFieldDecorator={getFieldDecorator} 
          options={{ list: patients, label: (p) => `${p.firstname} ${p.lastname}`, value: (p) => p._id }} />
        <FormItem label={'clinic'} field={'clinic'} message={'กรุณาวันที่'} getFieldDecorator={getFieldDecorator} hidden />
        <FormItem label={'การรักษา'} field={'treatment'} message={'กรุณาการรักษา'} getFieldDecorator={getFieldDecorator} options={{ list: this.getTreatmentsOptions() }} />
        <FormItem label={'ทันตแพทย์'} field={'dentist'} message={'กรุณาทันตแพทย์'} getFieldDecorator={getFieldDecorator} 
          options={{ list: this.getDentistOptions(), label: (l) => `${l.firstname} ${l.lastname}` }} />
        <FormItem label={'วันที่นัดหมาย'} field={'date'} message={'กรุณาวันที่'} getFieldDecorator={getFieldDecorator} date />
        <FormItem label={'วันที่นัดหมาย'} field={'slot'} message={'กรุณาวันที่'} getFieldDecorator={getFieldDecorator} hidden />
        {this.renderTimeSlot()}
        <NavigationButton onSubmit={this.handleSubmit} last loading={appointmentStatus === 'loading'}/>
        { appointmentStatus === 'success' && <Tag color="green">Success</Tag>}
        { appointmentStatus === 'error' && <Tag color="red">Error</Tag>}
      </FormContainer>
    )
  }
}

const WrappedForm = Form.create()(AppointmentForm)

class BookAppointmentForm extends Component {
  render() {
    return (
      <WrappedForm {...this.props} />
    )
  }
}

export default BookAppointmentForm