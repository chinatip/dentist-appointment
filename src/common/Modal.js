import React, { Component } from 'react';
import { Modal } from 'antd';

class CustomModal extends Component {
  render() {
    const { visible, onOk, onCancel } = this.props;

      return (
        <Modal
          title="Basic Modal"
          visible={visible}
          onOk={onOk}
          onCancel={onCancel}
        >
        dddd
        </Modal>
      );
    }
  }

export default CustomModal;