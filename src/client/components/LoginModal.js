import _ from 'lodash'
import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'

import { FB_APP_ID } from 'auth'
import { Modal } from 'common'
import { POST, PATIENT, FIND_BY_FB_ID } from 'services'
import { setUser, removeUser } from 'redux/user'

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
  constructor(props) {
    super()
    
    this.state = { 
      message: ''
    }
  }

  handleFBlogin = async (data) => {
    const { setUser, onCancel } = this.props
    const { id } = data
    const patient = await POST(PATIENT, FIND_BY_FB_ID, { facebookId: id })
    console.log('>>>', data, patient)
    if (patient) {
      removeUser()
      setUser(patient)
      onCancel()
    } else {
      this.setState({ message: 'login error' })
    }
  }

  render() {
    const { message } = this.state
    const { visible, onOk, onCancel } = this.props

    return (
      <Container>
        <GlobalStyles />
        <Modal visible={visible} onOk={onOk} onCancel={onCancel} wrapClassName={'login-modal'}>
          <FacebookLogin
            appId={FB_APP_ID}
            fields="id,age_range,first_name,last_name,gender,email,link,picture"
            callback={this.handleFBlogin}
            cssClass="my-facebook-button-class"
            icon="fa-facebook"
          />
          { message }
        </Modal>
      </Container>
    )
  }
}

export default connect(
  (state) => ({ }),
  { setUser }
)(LoginModal)