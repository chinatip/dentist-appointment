import _ from 'lodash'
import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import { Form } from 'antd'

import { Modal, TeethHistory } from 'common'

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
    const { data, visible, onCancel, onSubmit } = this.props

    return (
      <Container>
        <GlobalStyles />
        <Modal visible={visible} onOk={onCancel} onCancel={onCancel} wrapClassName={'treatment-history-modal'}>
          <TeethHistory onSubmit={onSubmit} {...data} />
        </Modal>
      </Container>
    )
  }
}

export default TreatmentHistoryModal