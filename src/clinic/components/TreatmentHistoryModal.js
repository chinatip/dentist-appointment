import _ from 'lodash'
import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import { Form } from 'antd'

import { Modal } from 'common'

const Container = styled.div`

`
const GlobalStyles = ({ theme }) => {
  injectGlobal `
    .treatment-history-modal {
      .ant-modal-footer {
        display: none;
      }
    }
  `;

  return null;
}

class TreatmentHistoryModal extends Component {
  render() {
    const { data, visible, onOk, onCancel } = this.props
    console.log('TreatmentHistoryModal', data)
    return (
      <Container>
        <GlobalStyles />
        <Modal visible={visible} onOk={onOk} onCancel={onCancel} wrapClassName={'treatment-history-modal'}>
        TreatmentHistoryModal
        </Modal>
      </Container>
    )
  }
}

export default TreatmentHistoryModal