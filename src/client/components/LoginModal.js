import _ from 'lodash'
import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import { compose } from 'recompose'
import FacebookLogin from 'react-facebook-login'

import { FB_APP_ID } from 'auth'
import { Modal } from 'common'

const Container = styled.div``

const GlobalStyles = ({ theme }) => {
  injectGlobal `
    .login-modal {
      .ant-modal-footer {
        display: none;
      }
    }
  `;

  return null;
}

class LoginModal extends Component {
  render() {
    const { visible, onOk, onCancel } = this.props

    return (
      <Container>
        <GlobalStyles />
        <Modal visible={visible} onOk={onOk} onCancel={onCancel} wrapClassName={'login-modal'}>
          <FacebookLogin
            appId={FB_APP_ID}
            // autoLoad={true}
            fields="id,age_range,first_name,last_name,gender,email,link,picture"
            callback={(res) => console.log(res)}
            cssClass="my-facebook-button-class"
            icon="fa-facebook"
          />
        </Modal>
      </Container>
    )
  }
}

export default LoginModal