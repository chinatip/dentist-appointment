import React, { Component } from 'react'
import styled from 'styled-components'
import { Form } from 'antd'

import { FormContainer, FormItem, NavigationButton } from 'common/form'

class Step1Form extends Component {
  componentDidMount () {
    this.initForm(this.props)
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextProps.data !== this.props.data) {
      this.initForm(nextProps)
    }
  }

  initForm({ form, data: { clinic, treatment }}) {
    form.setFields({
      clinic: {
        value: clinic,
      },
      treatment: {
        value: treatment,
      }
    });
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
    let treatments = {}
    const { form: { getFieldValue }, clinics } = this.props
    if (getFieldValue('clinic')) {
      const clinic = clinics.filter((c) => c._id === getFieldValue('clinic'))[0]

      
      clinic.dentists.forEach((dent) => {
        dent.treatments.forEach((t) => {
          treatments[t._id] = t
        })
      })
      
      return treatments
    }

    return []
  }

  render() {
    const { form: { getFieldDecorator }, clinics } = this.props

    return (
      <FormContainer width={700}>
        <FormItem label={'คลินิค'} field={'clinic'} message={'กรุณาคลินิค'} getFieldDecorator={getFieldDecorator} options={{ list: clinics }} />
        <FormItem label={'การรักษา'} field={'treatment'} message={'กรุณาการรักษา'} getFieldDecorator={getFieldDecorator} options={{ list: this.getTreatmentsOptions() }} />
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