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

import { LOADER, FETCH, CLINIC, LIST } from 'services'
import Loader from '../common';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`
const  ContentContainer = styled.div`
  display: flex;
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

const enhance = compose(
  LOADER,
  FETCH(CLINIC, LIST)
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
  const clinic = clinics[0]

  return (
    <Container>
      <ContentContainer>
        <Navigation type={type} />
        <InnerContainer>
          <ClinicDetail type={type} clinic={clinic} />
        </InnerContainer>
    </ContentContainer>
  </Container>
  )
})