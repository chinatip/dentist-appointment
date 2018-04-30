import React from 'react'
import styled from 'styled-components'

import Navigation from './components/Navigation'
import AppointmentStatus from './components/AppointmentStatus'
import ManageDentist from './components/ManageDentist'
import ManageTimeTable from './components/ManageTimeTable'
import ManagePatient from './components/ManagePatient'
import BookAppointment from './components/BookAppointment'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
`
const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`

const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
`

const ClinicDetail = ({ type }) => {
  if (type === 'status') {
    return <AppointmentStatus />
  } else if (type === 'timetable') {
    return <ManageTimeTable />
  } else if (type === 'dentists') {
    return <ManageDentist />
  } else if (type === 'patients') {
    return <ManagePatient />
  } else if (type === 'book') {
    return <BookAppointment />
  }

  return <AppointmentStatus />
}

export default ({ match }) => {
  const type = match.params.type

  return (
    <Container>
      <Navigation type={type} />
      <InnerContainer>
        <ClinicDetail type={type} />
      </InnerContainer>
  </Container>
  )
}