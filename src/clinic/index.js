import React from 'react'
import styled from 'styled-components'

import Navigation from './components/Navigation'
import AppointmentStatus from './components/AppointmentStatus'
import ManageDentist from './components/ManageDentist'
import ManageTimeTable from './components/ManageTimeTable'

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

const ClinicDetail = ({ type }) => {
  if (type === 'status') {
    return <AppointmentStatus />
  } else if (type === 'timetable') {
    return <ManageTimeTable />
  } else if (type === 'dentists') {
    return <ManageDentist />
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