import React, { Component } from 'react';
import { Modal } from 'antd';

class CustomModal extends Component {
  render() {
    const { visible, onOk, onCancel, children } = this.props;

      return (
        <Modal
          title="Basic Modal"
          visible={visible}
          onOk={onOk}
          onCancel={onCancel}
        >
          {children}
        </Modal>
      );
    }
  }

export default CustomModal;