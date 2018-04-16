import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import { Form } from 'antd'

import { Modal } from 'common'
import { FormContainer, FormItem, NavigationButton } from 'common/form'
import { POST, DENTIST, CREATE, UPDATE } from 'services'

const Container = styled.div`

`
const GlobalStyles = ({ theme }) => {
  injectGlobal `
    .dentist-modal {
      .ant-modal-footer {
        display: none;
      }
    }
  `;

  return null;
}

class ManageDentistForm extends Component {
  componentDidMount () {
    this.initForm(this.props)
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextProps.data !== this.props.data) {
      this.initForm(nextProps)
    }
  }

  initForm({ form, data: { firstname, lastname, phone } }) {
    form.setFields({
      firstname: {
        value: firstname,
      },
      lastname: {
        value: lastname,
      },
      phone: {
        value: phone,
      }
    })
  }

  handleSubmit = (e) => {
    const { form, onCancel, data: { _id } } = this.props

    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const body = { _id, ...values }
        POST(DENTIST, UPDATE, body)
        onCancel()
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, clinics } = this.props

    return (
      <FormContainer width={700}>
        <FormItem label={'ชื่อ'} field={'firstname'} message={'กรุณาใส่ชื่อ'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'นามสกุล'} field={'lastname'} message={'กรุณาใส่นามสกุล'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'เบอร์โทร'} field={'phone'} message={'กรุณาใส่เบอร์โทร'} getFieldDecorator={getFieldDecorator} />
        <NavigationButton onSubmit={this.handleSubmit} />
      </FormContainer>
    )
  }
}

const WrappedForm = Form.create()(ManageDentistForm)

class ManageDentist extends Component {
  render() {
    const { visible, onOk, onCancel } = this.props

    return (
      <Container>
        <GlobalStyles />
        <Modal visible={visible} onOk={onOk} onCancel={onCancel} wrapClassName={'dentist-modal'} noFooter>
          <WrappedForm {...this.props} />
        </Modal>
      </Container>
    )
  }
}

export default ManageDentist