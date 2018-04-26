import React from 'react'
import styled from 'styled-components'

import Navigation from './Navigation'
import BookAppointment from './BookAppointment'
import Appointment from './Appointment'
import History from './History'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`
const InnerContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  height: 600px;
  padding: 20px;
`

const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
`

const ProfileDetail = ({ type }) => {
  if (type === 'book') {
    return <BookAppointment />
  } else if (type === 'appointments') {
    return <Appointment />
  } else if (type === 'history') {
    return <History />
  } 
  return <BookAppointment />
}

export default ({ match }) => {
  const type = match.params.type

  return (
    <Container>
      <Navigation type={type} />
      <InnerContainer>
        <ProfileDetail type={type} />
      </InnerContainer>
  </Container>
  )
}