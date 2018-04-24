import _ from 'lodash'
import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import { Form } from 'antd'

import { Modal, TeethQuadrants } from 'common'

const Container = styled.div`

`
const GlobalStyles = ({ theme }) => {
  injectGlobal `
    .treatment-history-modal {
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

class TreatmentHistoryModal extends Component {
  render() {
    const { data, visible, onOk, onCancel } = this.props
    console.log('TreatmentHistoryModal', data)
    return (
      <Container>
        <GlobalStyles />
        <Modal visible={visible} onOk={onOk} onCancel={onCancel} wrapClassName={'treatment-history-modal'}>
          TreatmentHistoryModal
          <TeethQuadrants />
        </Modal>
      </Container>
    )
  }
}

export default TreatmentHistoryModal