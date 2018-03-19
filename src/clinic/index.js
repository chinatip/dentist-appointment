import React from 'react'
import styled from 'styled-components'

import Navigation from './components/Navigation'
import AppointmentStatus from './components/AppointmentStatus'
import ManageDoctor from './components/ManageDoctor'
import ManageTimeTable from './components/ManageTimeTable'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`
const InnerContainer = styled.div`
  width: 100%;
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
  } else if (type === 'edit') {
    return <ManageDoctor />
  }

  return <AppointmentStatus />
}

export default (props) => {
  const type = props.match.params.type

  return (
    <Container>
      <Navigation type={type} />
      <InnerContainer>
        <Title>{type}</Title>
        <ClinicDetail type={type} />
      </InnerContainer>
  </Container>
  )
}