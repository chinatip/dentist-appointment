import React, { Component } from 'react'
import styled from 'styled-components'
import { Form } from 'antd'
import { compose, withProps } from 'recompose'

import { stringToMoment } from 'common/utils'
import { FormContainer, FormItem, NavigationButton } from 'common/form'
import { FETCH, FIND_BY_ID, CLINIC, TREATMENT, DENTIST, DENTIST_TIMESLOT } from 'services'

const enhance = compose(
  withProps(
    props => {
      const { clinic, treatment, slot } = props.data

      return { clinic, treatment, slot }
    }),
  FETCH(CLINIC, FIND_BY_ID, { path: 'clinic' }),
  FETCH(TREATMENT, FIND_BY_ID, { path: 'treatment' }),
  FETCH(DENTIST_TIMESLOT, FIND_BY_ID, { path: 'slot' })
)

class Step3Form extends Component {
  componentDidMount () {
    this.initForm(this.props)
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextProps.data !== this.props.data) {
      this.initForm(nextProps)
    }
  }

  initForm({ form: { setFields }, clinics, treatments, dentistTimeslots }) {
    setFields({
      sumClinic: {
        value: clinics.name,
      },
      sumTreatment: {
        value: treatments.name,
      },
      sumTimeslot: {
        value: stringToMoment(dentistTimeslots.startTime).format('HH:mm DD/MM/YYYY')
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, data, onSubmit, onBackStep } = this.props
    
    return (
      <FormContainer width={700}>
        <FormItem label={'คลินิค'} field={'sumClinic'} getFieldDecorator={getFieldDecorator} required={false} />
        <FormItem label={'การรักษา'} field={'sumTreatment'} getFieldDecorator={getFieldDecorator} required={false} />
        <FormItem label={'วันเวลาที่นัดหมาย'} field={'sumTimeslot'} getFieldDecorator={getFieldDecorator} required={false} />
        <NavigationButton onSubmit={onSubmit} onBackStep={onBackStep} last />
      </FormContainer>
    )
  }
}


const WrappedForm = Form.create()(Step3Form)

class Step3 extends Component {
  render() {
    return (
      <WrappedForm {...this.props} />
    )
  }
}

export default enhance(Step3)

