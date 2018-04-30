import React, { Component } from 'react'
import styled from 'styled-components'
import { Form } from 'antd'

import { FormContainer, FormItem, NavigationButton } from 'common/form'

class AppointmentForm extends Component {
  componentDidMount () {
    this.initForm(this.props)
  }

  initForm({ form, clinic }) {
    form.setFields({
      clinic: {
        value: clinic,
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

    if (dentist) {
      return 'have'
    }

    return 'nooooooooooo'
  }

  render() {
    const { clinic, form: { getFieldDecorator } } = this.props

    return (
      <FormContainer width={700}>
        <FormItem label={'clinic'} field={'clinic'} message={'กรุณาวันที่'} getFieldDecorator={getFieldDecorator} hidden />
        <FormItem label={'การรักษา'} field={'treatment'} message={'กรุณาการรักษา'} getFieldDecorator={getFieldDecorator} options={{ list: this.getTreatmentsOptions() }} />
        <FormItem label={'ทันตแพทย์'} field={'dentist'} message={'กรุณาทันตแพทย์'} getFieldDecorator={getFieldDecorator} 
          options={{ list: clinic.dentists, label: (l) => `${l.firstname} ${l.lastname}` }} />
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