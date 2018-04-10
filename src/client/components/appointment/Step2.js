import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'
import { Form } from 'antd'
import moment from 'moment'

import { FormContainer, FormItem, NavigationButton, Row } from 'common/form'

const TimetableContainer = styled.div`

`
const Timeslot = styled.div`
  border: 1px solid blue;
  padding: 10px;
`

const getOptions = (list) => {
  const options = []
  _.forEach(list, (l) => {
    options.push({ label: `${l.firstname} ${l.lastname}`, value: l._id })
  })

  return options
}

class Step2Form extends Component {
  componentDidMount () {
    this.initForm(this.props)
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextProps.data !== this.props.data) {
      this.initForm(nextProps)
    }
  }

  initForm({ form, data: { dentist, date }}) {
    form.setFields({
      dentist: {
        value: dentist,
      },
      date: {
        value: date,
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

  renderTimetable() {
    const { form: { getFieldValue }, appointments } = this.props
    
    const dentist = getFieldValue('dentist')
    const date = getFieldValue('date')

    if (dentist && date) {
      const selectedDateAppointments = appointments.filter((app) => {
        const appDate = moment(app.startTime, moment.HTML5_FMT.DATETIME_LOCAL_MS)
        console.log('appDate', app.startTime, appDate)
        return appDate.diff(date, 'days') === 0
      })

      const availableDates = []
      for (var i = 8; i < 21; i++) {
        availableDates.push(`${i}:00`)
        availableDates.push(`${i}:30`)
      }

      console.log(selectedDateAppointments)

      return (
        <TimetableContainer>
          {
            availableDates.map((d) => <Timeslot>{d}</Timeslot>)
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
        <FormItem label={'ทันตแพทย์'} field={'dentist'} message={'กรุณาทันตแพทย์'} getFieldDecorator={getFieldDecorator} options={getOptions(dentists)} />
        <FormItem label={'วันที่นัดหมาย'} field={'date'} message={'กรุณาวันที่'} getFieldDecorator={getFieldDecorator} date />
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