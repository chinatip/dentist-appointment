import _ from 'lodash'
import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import { Form } from 'antd'

import { Modal } from 'common'
import { FormContainer, FormItem, NavigationButton } from 'common/form'
import { POST, DENTIST, CLINIC, CREATE, UPDATE } from 'services'

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

  initForm({ form, data: { firstname, lastname, treatments, phone } }) {
    const treamentsIds = []
    treatments = _.sortBy(treatments, ['name'])
    _.forEach(treatments, (t) => treamentsIds.push(t._id))

    form.setFields({
      firstname: {
        value: firstname,
      },
      lastname: {
        value: lastname,
      },
      treatments: {
        value: treamentsIds
      },
      phone: {
        value: phone,
      }
    })
  }

  handleSubmit = (e) => {
    const { form, onCancel, clinic, data } = this.props

    e.preventDefault()
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        if (!data) {
          const body = { _id: data._id, ...values }
          POST(DENTIST, UPDATE, body)
        } else {
          const dentist = await POST(DENTIST, CREATE, values)
          const dentists = clinic.dentists.map((d) => d._id)
          dentists.push(dentist.data._id)

          POST(CLINIC, UPDATE, { _id: clinic._id, dentists })
        }
        onCancel()
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, treatments } = this.props

    return (
      <FormContainer width={700}>
        <FormItem label={'ชื่อ'} field={'firstname'} message={'กรุณาใส่ชื่อ'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'นามสกุล'} field={'lastname'} message={'กรุณาใส่นามสกุล'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'การรักษา'} field={'treatments'} message={'กรุณาการรักษา'} getFieldDecorator={getFieldDecorator} options={{ list: treatments, mode: 'multiple' }} />
        <FormItem label={'เบอร์โทร'} field={'phone'} message={'กรุณาใส่เบอร์โทร'} getFieldDecorator={getFieldDecorator} />
        <NavigationButton onSubmit={this.handleSubmit} last />
      </FormContainer>
    )
  }
}

const WrappedForm = Form.create()(ManageDentistForm)

class ManageDentist extends Component {
  render() {
    const { visible, onOk, data, onCancel } = this.props

    return (
      <Container>
        <GlobalStyles />
        <Modal visible={visible} onOk={onOk} onCancel={onCancel} wrapClassName={'dentist-modal'}>
          { data? 'เพิ่มหมอฟัน': 'แก้ไขหมอฟัน'}
          <WrappedForm {...this.props} />
        </Modal>
      </Container>
    )
  }
}

export default ManageDentist