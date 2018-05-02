import React, { Component } from 'react'
import styled from 'styled-components'
import { compose, withProps } from 'recompose'
import { Form, Tag, message } from 'antd'

import { FormContainer, FormItem, NavigationButton } from 'common/form'
import { LOADER, POST, CLINIC } from 'services'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
      <FormContainer width={700}>
        <FormItem label={'username'} field={'username'} message={'username'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'password'} field={'password'} message={'password'} getFieldDecorator={getFieldDecorator} />
        <Flex>
          <NavigationButton onSubmit={this.handleSubmit} last />
          {/* { appointmentStatus === 'success' && <Tag color="green">Success</Tag>}
          { appointmentStatus === 'error' && <Tag color="red">Error</Tag>} */}
        </Flex>
      </FormContainer>
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