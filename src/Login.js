import React, { Component } from 'react'
import styled from 'styled-components'
import { compose, withProps } from 'recompose'
import { Form, Tag, message } from 'antd'

import { FormContainer, FormItem, NavigationButton } from 'common/form'
import { LOADER, POST, CLINIC } from 'services'
import { cssFontH1 } from 'common/styles/style-base'
import ToothLogo from './tooth.svg'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
`
const Flex = styled.div`
  display: flex;

  .ant-tag {
    margin-left: 15px;
  }
`

const LoginWrapper = styled.div`
  padding: 25px;
  box-shadow: 0px 2px 12px rgba(0, 188, 206, 0.39);
  border-radius: 4px;
`
const Title = styled.div`
  ${cssFontH1};
  text-align: center;
  font-weight: 500;
  color: #00bcce;
`
const Image = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
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
      <LoginWrapper>
        <Title>
          <Image src={ToothLogo} />
          <p>MeetDent</p>
        </Title>
      <FormContainer width={700}>
        <FormItem label={'Username'} field={'username'} message={'username'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'Password'} field={'password'} message={'password'} getFieldDecorator={getFieldDecorator} password />
        <Flex>
          <NavigationButton onSubmit={this.handleSubmit} last />
          {/* { appointmentStatus === 'success' && <Tag color="green">Success</Tag>}
          { appointmentStatus === 'error' && <Tag color="red">Error</Tag>} */}
        </Flex>
      </FormContainer>
      </LoginWrapper>
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
