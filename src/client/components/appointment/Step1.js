import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'
import { Form } from 'antd'

import { FormContainer, FormItem, NavigationButton, Row } from 'common/form'

const getOptions = (list) => {
  const options = []
  _.forEach(list, (l) => {
    options.push({ label: l.name, value: l._id })
  })

  return options
}

class Step1Form extends Component {
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
    let treatments = {}
    const { form: { getFieldValue }, clinics } = this.props
    if (getFieldValue('clinic')) {
      const clinic = clinics.filter((c) => c._id === getFieldValue('clinic'))[0]

      
      clinic.dentists.forEach((dent) => {
        dent.treatments.forEach((t) => {
          treatments[t._id] = t
        })
      })
      
      return getOptions(treatments)
    }

    return []
  }

  render() {
    const { form: { getFieldDecorator }, clinics } = this.props

    return (
      <FormContainer width={700}>
        <FormItem label={'เลือกคลินิค'} field={'clinic'} message={'กรุณาเลือกคลินิค'} getFieldDecorator={getFieldDecorator} options={getOptions(clinics)} />
        <FormItem label={'เลือกการรักษา'} field={'treatment'} message={'กรุณาเลือกการรักษา'} getFieldDecorator={getFieldDecorator} options={this.getTreatmentsOptions()} />
        <NavigationButton onSubmit={this.handleSubmit} />
      </FormContainer>
    )
  }
}

const WrappedForm = Form.create()(Step1Form)

class Step1 extends Component {
  render() {
    const { clinics } = this.props

    return (
      <WrappedForm {...this.props} />
    )
  }
}

export default Step1