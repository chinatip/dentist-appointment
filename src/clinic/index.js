import React from 'react'
import styled from 'styled-components'
import { compose } from 'recompose'

import Navigation from './components/Navigation'
import AppointmentStatus from './components/AppointmentStatus'
import ManageDentist from './components/ManageDentist'
import ManageTimeTable from './components/ManageTimeTable'
import ManagePatient from './components/ManagePatient'
import BookAppointment from './components/BookAppointment'
import DentistWorkTable from './components/DentistWorkTable'

import { LOADER, FETCH, CLINIC, LIST, FIND_BY_ID } from 'services'
import Loader from '../common';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  ${'' /* overflow-x: hidden; */}
  overflow-x: auto;
  min-width: 1200px;
`
const Header = styled.div`
  width: 100%;
  height: 50px;
  box-shadow: 0 4px 12px rgba(0, 188, 206, 0.14);
  margin-bottom: 10px;
  h1{
    color: #00bcce;
  }
`
const ContentContainer = styled.div`
  display: flex;
  background-color: #00ff94;
`
const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  min-height: 100vh;
`

const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
`

const enhance = compose(
  LOADER,
  FETCH(CLINIC, FIND_BY_ID, { path: 'match.params.id' })
)

const ClinicDetail = ({ type, clinic }) => {
  if (type === 'status') {
    return <AppointmentStatus clinic={clinic} />
  } else if (type === 'timetable') {
    return <ManageTimeTable clinic={clinic} />
  } else if (type === 'dentists') {
    return <ManageDentist clinic={clinic} />
  } else if (type === 'patients') {
    return <ManagePatient clinic={clinic} />
  } else if (type === 'book') {
    return <BookAppointment clinic={clinic} />
  } else if (type === 'dentistsWorks') {
    return <DentistWorkTable clinic={clinic} />
  }

  return <AppointmentStatus clinic={clinic} />
}

export default enhance(({ match, clinics }) => {
  const type = match.params.type
  console.log(clinics)
  return (
    <Container>
      <Header>
        <h1>Meet Dent</h1>
      </Header>
      <ContentContainer>
        <Navigation type={type} id={clinics._id} />
        <InnerContainer>
          <ClinicDetail type={type} clinic={clinics} />
        </InnerContainer>
    </ContentContainer>
  </Container>
  )
})
