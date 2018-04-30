import React, { Component } from 'react'
import styled from 'styled-components'
import { Form } from 'antd'
import moment from 'moment'

import { TimeslotTable } from 'common'
import { FormContainer, FormItem, NavigationButton } from 'common/form'

class AppointmentForm extends Component {
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
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit(values)
      }
    })
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

  renderTimeSlot() {
    const { form: { getFieldValue } } = this.props
    const dentist = getFieldValue('dentist')
    const date = getFieldValue('date')

    if (dentist && date) {
      return <TimeslotTable />
    }

    return <TimeslotTable />
  }

  render() {
    const { clinic, patients, form: { getFieldDecorator } } = this.props

    return (
      <FormContainer width={700}>
        <FormItem label={'คนไข้'} field={'patient'} message={'กรุณาเลือกคนไข้'} getFieldDecorator={getFieldDecorator} 
          options={{ list: patients, label: (p) => `${p.firstname} ${p.lastname}`, value: (p) => p._id }} />
        <FormItem label={'clinic'} field={'clinic'} message={'กรุณาวันที่'} getFieldDecorator={getFieldDecorator} hidden />
        <FormItem label={'การรักษา'} field={'treatment'} message={'กรุณาการรักษา'} getFieldDecorator={getFieldDecorator} options={{ list: this.getTreatmentsOptions() }} />
        <FormItem label={'ทันตแพทย์'} field={'dentist'} message={'กรุณาทันตแพทย์'} getFieldDecorator={getFieldDecorator} 
          options={{ list: clinic.dentists, label: (l) => `${l.firstname} ${l.lastname}` }} />
        <FormItem label={'วันที่นัดหมาย'} field={'date'} message={'กรุณาวันที่'} getFieldDecorator={getFieldDecorator} date />
        {this.renderTimeSlot()}
        {/* <NavigationButton onSubmit={this.handleSubmit} /> */}
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