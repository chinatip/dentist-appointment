import React, { Component } from 'react'
import styled from 'styled-components'
import { compose, withProps } from 'recompose'
import { Form } from 'antd'

import { FormContainer, FormItem, NavigationButton } from 'common/form'
import { LOADER, POST, CLINIC } from 'services'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

class LoginForm extends React.Component {
  redirectToClinic(id) {
    this.props.history.push(`/clinic/${id}`)
  }

  handleSubmit = (e) => {
    const { form, setUser, removeUser } = this.props

    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        const c = await POST(CLINIC, 'login', values)
        this.redirectToClinic(c._id)
      }
    })
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <FormContainer width={700}>
        <FormItem label={'username'} field={'username'} message={'username'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'password'} field={'password'} message={'password'} getFieldDecorator={getFieldDecorator} />
        <NavigationButton onSubmit={this.handleSubmit} last />
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