import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, Select } from 'antd'
import styled from 'styled-components'
import FacebookLogin from 'react-facebook-login'

// import { CREATE_USER } from 'services'
import { FB_APP_ID } from 'auth'

const FormItem = Form.Item
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`
const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: auto;
  margin: auto;
`

class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)

        // CREATE_USER({ ...values, "deleted": false })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Name"
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: 'Please input your name!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Lastname"
        >
          {getFieldDecorator('lastname', {
            rules: [{
              required: true, message: 'Please input your lastname!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="ID Card number"
        >
          {getFieldDecorator('id_number', {
            rules: [{
              required: true, message: 'Please input your ID Card number!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          label="Gender"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('gender', {
            rules: [{ required: true, message: 'Please select your gender!' }],
          })(
            <Select
              placeholder="Select a option and change input text above"
              onChange={this.handleSelectChange}
            >
              <Select.Option value="M">male</Select.Option>
              <Select.Option value="F">female</Select.Option>
            </Select>
          )}
        </FormItem>
        <FacebookLogin
          appId={FB_APP_ID}
          autoLoad={true}
          fields="id,age_range,first_name,last_name,gender,email,link,picture"
          callback={(res) => console.log(res)}
          cssClass="my-facebook-button-class"
          icon="fa-facebook"
        />
          <Button type="primary" htmlType="submit">
            Register
          </Button>
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