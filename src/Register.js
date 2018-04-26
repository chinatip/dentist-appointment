import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox, Select } from 'antd'
import styled from 'styled-components'

import { getUser, setUser, removeUser } from 'redux/user'
import { FormContainer, FormItem, NavigationButton } from 'common/form'
import { POST, PATIENT, CREATE, FIND_BY_FB_ID, GET_FB_DATA } from 'services'

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

class RegisterForm extends React.Component {
  constructor(props) {
    super()

    this.state = {
      loading: true,
      data: {}
    }
  }

  componentDidMount() {
    this.loadData()
  }

  async loadData() {
    const { id, setUser, removeUser } = this.props

    if (id !== 'new') {
      const data = await GET_FB_DATA(id)
      const patient = await POST(PATIENT, FIND_BY_FB_ID, { facebookId: id })
      
      if (patient && typeof patient === 'object') {
        removeUser()
        setUser(patient)
        this.redirectToLogin()
      }
  
      this.setState({ 
        loading: false,
        data
      })
  
      this.handleFBData()
    }
  }

  redirectToLogin() {
    this.props.history.push(`/profile`)
  }

  handleFBData() {
    const { form, id } = this.props
    const { first_name, last_name, gender } = this.state.data

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
    const { form, setUser, removeUser } = this.props

    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        const patient = await POST(PATIENT, CREATE, values)
        removeUser()
        setUser(patient)
        this.redirectToLogin()
      }
    })
  }

  render() {
    const { loading } = this.state
    const { form } = this.props
    const { getFieldDecorator, getFieldValue } = form

    if (loading) {
      return <div>loading</div>
    }

    return (
      <FormContainer width={700}>
        <FormItem label={'ชื่อ'} field={'firstname'} message={'กรุณากรอกชื่อ'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'นามสกุล'} field={'lastname'} message={'กรุณากรอกนามสกุล'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'เพศ'} field={'gender'} message={'กรุณาเลือกเพศ'} getFieldDecorator={getFieldDecorator} options={{ options: GENDER_OPTIONS }}/>
        <FormItem label={'เบอร์โทร'} field={'phone'} message={'กรุณากรอกเบอร์โทร'} getFieldDecorator={getFieldDecorator} />
        {/* <FormItem label={'ประเภท'} field={'ID_type'} message={'กรุณาเลือกประเภท'} getFieldDecorator={getFieldDecorator} options={{ options: ID_OPTIONS }}/> */}
        {/* <FormItem label={TITLE_ID_OPTIONS[getFieldValue('ID_type')]} field={'ID'} message={'กรุณากรอก'} getFieldDecorator={getFieldDecorator} /> */}
        <FormItem label={'facebookId'} field={'facebookId'} message={'กรุณาวันที่'} getFieldDecorator={getFieldDecorator} hidden />
        <NavigationButton onSubmit={this.handleSubmit} />
      </FormContainer>
    )
  }
}

const WrappedRegister = Form.create()(RegisterForm)

const Register = (props) => {
  const id = props.match.params.id

  return (
    <Container>
      <FormContainer>
        <WrappedRegister id={id} {...props} />
      </FormContainer>
    </Container>
  )
}

export default connect(
  (state) => ({ 
    user: getUser(state)
  }),
  { setUser, removeUser }
)(withRouter(Register))