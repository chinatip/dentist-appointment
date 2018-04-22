import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, Select } from 'antd'
import styled from 'styled-components'
import FacebookLogin from 'react-facebook-login'

import { FB_APP_ID } from 'auth'
import { FormContainer, FormItem, NavigationButton } from 'common/form'
import { POST, PATIENT, CREATE, FIND_BY_FB_ID } from 'services'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const GENDER_OPTIONS = [
  { label: 'ชาย', value: 'male' },
  { label: 'หญิง', value: 'female' }
]

const ID_OPTIONS = [
  { label: 'หมายเลขบัตรประจำตัวประชาชน', value: 'nation' },
  { label: 'หมายเลขหนังสือเดินทาง', value: 'passport' }
]
const TITLE_ID_OPTIONS = {
  ['nation']: 'หมายเลขบัตรประจำตัวประชาชน',
  ['passport']: 'หมายเลขหนังสือเดินทาง'
}

class Register extends React.Component {
  componentDidMount () {
    const { form } = this.props

    form.setFields({
      ID_type: {
        value: ID_OPTIONS[0].value,
      }
    })
  }

  linkToHome = () => {
    window.location.replace('https://dentist-appointment.herokuapp.com')
  }

  handleFBLogin = async (data) => {
    const { form } = this.props
    const { accessToken, first_name, last_name, gender, id } = data
    const patient = await POST(PATIENT, FIND_BY_FB_ID, { facebookId: id })

    if (patient) {
      this.linkToHome()
    }

    form.setFields({
      firstname: {
        value: first_name,
      },
      lastname: {
        value: last_name,
      },
      gender: {
        value: gender
      },
      facebookId: {
        value: id
      }
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const res = await POST(PATIENT, CREATE, values)

        this.linkToHome()
      }
    })
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator, getFieldValue } = form

    return (
      <FormContainer width={700}>
        <FacebookLogin
          appId={FB_APP_ID}
          fields="id,age_range,first_name,last_name,gender,email,link,picture"
          callback={this.handleFBLogin}
          cssClass="my-facebook-button-class"
          icon="fa-facebook"
        />
        <FormItem label={'ชื่อ'} field={'firstname'} message={'กรุณากรอกชื่อ'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'นามสกุล'} field={'lastname'} message={'กรุณากรอกนามสกุล'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'เพศ'} field={'gender'} message={'กรุณาเลือกเพศ'} getFieldDecorator={getFieldDecorator} options={{ options: GENDER_OPTIONS }}/>
        <FormItem label={'เบอร์โทร'} field={'phone'} message={'กรุณากรอกเบอร์โทร'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'ประเภท'} field={'ID_type'} message={'กรุณาเลือกประเภท'} getFieldDecorator={getFieldDecorator} options={{ options: ID_OPTIONS }}/>
        <FormItem label={TITLE_ID_OPTIONS[getFieldValue('ID_type')]} field={'ID'} message={'กรุณากรอก'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'facebookId'} field={'facebookId'} message={'กรุณาวันที่'} getFieldDecorator={getFieldDecorator} hidden />
        <NavigationButton onSubmit={this.handleSubmit} />
      </FormContainer>
    )
  }
}

const WrappedRegister = Form.create()(Register)

export default () => {
  return (
    <Container>
      <FormContainer>
        <WrappedRegister />
      </FormContainer>
    </Container>
  )
}