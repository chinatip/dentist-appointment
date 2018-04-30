import React, { Component } from 'react'
import { Form } from 'antd'
import styled, { injectGlobal } from 'styled-components'
import { withRouter } from 'react-router-dom'

import { Modal } from 'common'
import { FormContainer, FormItem, NavigationButton } from 'common/form'
import { POST, PATIENT, CREATE } from 'services'

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

const GlobalStyles = ({ theme }) => {
  injectGlobal `
    .add-patient-modal {
      .ant-modal {
        width: 950px !important;
        
        .ant-modal-footer {
          display: none;
        }
      }
    }
  `;

  return null;
}

class AddPatientForm extends Component {
  handleSubmit = (e) => {
    const { form, history, onSubmit } = this.props

    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        const patient = await POST(PATIENT, CREATE, values)
        history.push(`/clinic/patients`)
        onSubmit()
      }
    })
  }

  render() {
    const { form: { getFieldDecorator, getFieldValue } } = this.props

    return (
      <FormContainer width={700}>
        <FormItem label={'ชื่อ'} field={'firstname'} message={'กรุณากรอกชื่อ'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'นามสกุล'} field={'lastname'} message={'กรุณากรอกนามสกุล'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'เพศ'} field={'gender'} message={'กรุณาเลือกเพศ'} getFieldDecorator={getFieldDecorator} options={{ options: GENDER_OPTIONS }}/>
        <FormItem label={'เบอร์โทร'} field={'phone'} message={'กรุณากรอกเบอร์โทร'} getFieldDecorator={getFieldDecorator} />
        <NavigationButton onSubmit={this.handleSubmit} />
      </FormContainer>
    )
  }
}

const WrappedRegister = Form.create()(AddPatientForm)

export default withRouter(({ visible, onClose, history }) => {
  return (
    <Container>
      <Modal visible={visible} onOk={onClose} onCancel={onClose} wrapClassName={'add-patient-modal'}>
        <FormContainer>
          <GlobalStyles />
          <WrappedRegister history={history} onSubmit={onClose}/>
        </FormContainer>
      </Modal>
    </Container>
  )
})