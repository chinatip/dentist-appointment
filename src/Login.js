import React, { Component } from 'react'
import styled from 'styled-components'
import { compose, withProps } from 'recompose'
import FacebookLogin from 'react-facebook-login'

import { FB_APP_ID } from 'auth'
import { LOADER, FETCH, FIND_BY_FB_ID, PATIENT } from 'services'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

class Login extends Component {
  handleFBLogin = (data) => {
    console.log(data)
  }

  render() {
    const { patients } = this.props
    
    return (
      <div>
        <FacebookLogin
          appId={FB_APP_ID}
          autoLoad={true}
          fields="id,age_range,first_name,last_name,gender,email,link,picture"
          callback={(res) => console.log(res)}
          cssClass="my-facebook-button-class"
          icon="fa-facebook"
        />
      </div>
    )
  }
}

export default Login