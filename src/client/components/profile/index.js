import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getUser, setUser, removeUser } from 'redux/user'
import { POST, PATIENT, CREATE, FIND_BY_FB_ID } from 'services'
import Navigation from './Navigation'
import BookAppointment from '../appointment'
import Appointment from './Appointment'
import History from './History'
import Calendar from './Calendar'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  // background-color: #00ff94;
  overflow-y: auto;
  min-height: 100vh;
  min-width: 1000px;
`
const InnerContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  height: 100%;
  padding: 20px;
  background-color: white;
  min-height: 100vh;
`

const Header = styled.div`
  width: 100%;
  height: 50px;
  box-shadow: 0 4px 12px rgba(0, 188, 206, 0.14);
  margin-bottom: 10px;
  padding: 0 20px;
  h1 {
    color: #00bcce;
  }

`

const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
`

class WithPatientAutoLogin extends React.Component {
  componentDidMount() {
    this.loadData()
  }

  async loadData() {
    const { id, match, setUser, removeUser, history } = this.props
    const patient = await POST(PATIENT, FIND_BY_FB_ID, { facebookId: id })

    if (patient && typeof patient === 'object') {
      removeUser()
      setUser(patient)
      history.push(`/profile/${id}/type/history`)
    } else {
      history.push(`/register/${id}`)
    }
  }

  render() {
    return <noscript />
  }
}

const PatientAutoLogin = connect(
  (state) => ({
    user: getUser(state)
  }),
  { setUser, removeUser }
)(withRouter(WithPatientAutoLogin))

const ProfileDetail = ({ type, id }) => {
  if (type === 'book') {
    return <BookAppointment id={id} />
  } else if (type === 'appointments') {
    return <Appointment id={id} />
  } else if (type === 'history') {
    return <History id={id} />
  } else if (type === 'calendar') {
    return <Calendar id={id} />
  }

  return <PatientAutoLogin id={type} />
}

export default ({ match }) => {
  const type = match.params.type
  const id = match.params.id
  console.log('==========================', match.params)
  return (
    <div>
      <Header>
        <h1>Meet Dent</h1>
      </Header>
    <Container>
      <Navigation type={type} id={id} />
      <InnerContainer>
        <ProfileDetail type={type} id={id} />
      </InnerContainer>
  </Container>
      </div>
  )
}
