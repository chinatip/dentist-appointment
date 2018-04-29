import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getUser, setUser, removeUser } from 'redux/user'
import { POST, PATIENT, CREATE, FIND_BY_FB_ID, GET_FB_DATA } from 'services'
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

class WithPatientAutoLogin extends React.Component {
  componentDidMount() {
    this.loadData()
  }

  async loadData() {
    const { match, setUser, removeUser } = this.props
    const id = match.params.id
    const data = await GET_FB_DATA(id)

    if (data.id) {
      const patient = await POST(PATIENT, FIND_BY_FB_ID, { facebookId: id })
      
      if (patient && typeof patient === 'object') {
        removeUser()
        setUser(patient)
        this.props.history.push(`/profile`)
      } else {
        this.props.history.push(`/register/${id}`)
      }
    } else {
      this.props.history.push(`/register/${id}`)
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

const ProfileDetail = ({ type }) => {
  if (type === 'book') {
    return <BookAppointment />
  } else if (type === 'appointments') {
    return <Appointment />
  } else if (type === 'history') {
    return <History />
  } 

  return <PatientAutoLogin />
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