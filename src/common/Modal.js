import React, { Component } from 'react';
import { Modal } from 'antd';

class CustomModal extends Component {
  render() {
    const { visible, onOk, onCancel, wrapClassName, children } = this.props;

      return (
        <Modal
          visible={visible}
          onOk={onOk}
          onCancel={onCancel}
          wrapClassName={wrapClassName}
        >
          {children}
        </Modal>
      );
    }
  }

export default CustomModal;