import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import { getUser } from 'redux/user'
import { LOADER, FETCH, APPOINTMENT, FIND_BY_FB_ID } from 'services'


const enhance = compose(
  LOADER,
  FETCH(APPOINTMENT, FIND_BY_FB_ID)
)

const Container = styled.div``
const AppContainer = styled.div`

`
const AppItemContainer = styled.div`

`

const AppItem = ({ appointment }) => {
  console.log(appointment)
  
  const { slot, status, report } = appointment
  return (
    <AppItemContainer>
      
    </AppItemContainer>
  )
}

const Index = ({ appointments }) => {
  return (
    <Container>
      history
      <AppContainer>
        { _.map(appointments, (app) => <AppItem appointment={app} />)}
      </AppContainer>
    </Container>
  )
}

export default connect(
  (state) => ({ 
    user: getUser(state)
  }), {}
)(enhance(Index))