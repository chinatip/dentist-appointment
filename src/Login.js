import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import styled from 'styled-components'
import FacebookLogin from 'react-facebook-login'

// import { FB_APP_ID } from 'auth'

const FormItem = Form.Item
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`
const FormContainer = styled.div`
  max-width: 300px;
  height: auto;
  margin: auto;

  .login-form {
    max-width: 300px;
  }
  .login-form-forgot {
    float: right;
  }
  .login-form-button {
    width: 100%;
  }
`
const Row = styled.div`
  display: flex;
  justify-content: space-around;
`

class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        {/* <FacebookLogin
          appId={FB_APP_ID}
          autoLoad={true}
          fields="name,email,picture"
          callback={(res) => console.log(res)}
          cssClass="my-facebook-button-class"
          icon="fa-facebook"
        /> */}
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
    )
  }
}

const WrappedLogin = Form.create()(Login)

export default () => {
  return (
    <Container>
      <FormContainer>
        <WrappedLogin />
      </FormContainer>
    </Container>
  )
}