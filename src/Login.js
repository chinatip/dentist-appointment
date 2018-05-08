import React, { Component } from 'react'
import styled from 'styled-components'
import { compose, withProps } from 'recompose'
import { Form, Tag, message } from 'antd'

import { FormContainer, FormItem, NavigationButton } from 'common/form'
import { LOADER, POST, CLINIC } from 'services'

import './dentist-style.css';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #00ff94;
  min-height: 100vh;
`
const Flex = styled.div`
  display: flex;

  .ant-tag {
    margin-left: 15px;
  }
`

class LoginForm extends React.Component {
  state = {}

  redirectToClinic(id) {
    this.props.history.push(`/clinic/${id}`)
  }

  handleSubmit = (e) => {
    const { form, setUser, removeUser } = this.props

    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ appointmentStatus: 'loading', appointmentErr: null })
        try {
          const c = await POST(CLINIC, 'login', values)
          this.setState({ appointmentStatus: 'success', appointmentErr: null })
          this.redirectToClinic(c._id)
        } catch (err) {
          this.setState({ appointmentStatus: 'error', appointmentErr: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' })
          message.error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
        }
      }
    })
  }

  render() {
    const { appointmentStatus } = this.state
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <div className="loginbg">
        <div className="texttitle">
          <img className="loginimage" src="https://www.shareicon.net/data/512x512/2016/07/12/795023_dentist_512x512.png"></img>
          <h1>Meet Dent</h1>
        </div>
      <FormContainer width={700}>
        <FormItem label={'Username'} field={'username'} message={'username'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'Password'} field={'password'} message={'password'} getFieldDecorator={getFieldDecorator} />
        <Flex>
          <NavigationButton onSubmit={this.handleSubmit} last />
          {/* { appointmentStatus === 'success' && <Tag color="green">Success</Tag>}
          { appointmentStatus === 'error' && <Tag color="red">Error</Tag>} */}
        </Flex>
      </FormContainer>
      </div>
    )
  }
}

const WrappedLogin = Form.create()(LoginForm)

export default (props) => {
  const id = props.match.params.id

  return (
    <Container>
      <FormContainer>
        <WrappedLogin id={id} {...props} />
      </FormContainer>
    </Container>
  )
}
