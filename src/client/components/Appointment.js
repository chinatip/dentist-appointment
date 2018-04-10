import React, { Component } from 'react'
import styled from 'styled-components'
import { compose } from 'recompose'

import PageContainer from './PageContainer'
import { DatePicker, Select, Button, Modal } from 'common'
import { LOADER, FETCH, LIST, CLINIC, DENTIST, DENTIST_APPOINTMENT, APPOINTMENT } from 'services'

const enhance = compose(
  LOADER,
  FETCH(CLINIC, LIST),
  FETCH(DENTIST, LIST),
  FETCH(APPOINTMENT, LIST),
  FETCH(DENTIST_APPOINTMENT, LIST),
)

const Container = styled.div`
  
`

class Index extends Component {
  render() {
    return (
      <PageContainer title={'Appointment'}>
        <Container>
      
        </Container>
      </PageContainer>
    )
  }
}

export default enhance(Index)