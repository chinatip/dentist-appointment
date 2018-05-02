import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import { getUser } from 'redux/user'
import { Table } from 'common'
import { LOADER, FETCH, APPOINTMENT, FIND_BY_FB_ID } from 'services'
import { stringToMoment } from 'common/utils'
import PageHeader from 'common/PageHeader'

const enhance = compose(
  LOADER,
  FETCH(APPOINTMENT, FIND_BY_FB_ID)
)

const Container = styled.div``
const AppContainer = styled.div`

`
const AppItemContainer = styled.div`

`

const formatAppointments = (appointments) => {
  const columns = [
    {
      title: 'เวลา',
      dataIndex: 'slot.startTime',
      key: 'slot.startTime',
      render: (t) => <p>{stringToMoment(t).format('DD MMM YYYY H:mm')}</p>
    }, {
      title: 'คลินิค',
      dataIndex: 'slot.clinic.name',
      key: 'slot.clinic.name'
    }, {
      title: 'การรักษา',
      dataIndex: 'treatment.name',
      key: 'treatment.name',
    }, {
      title: 'หมอ',
      dataIndex: 'slot.dentist',
      key: 'slot.dentist',
      render: (dent) => <p>{`${dent.firstname} ${dent.lastname}`}</p>
    }
  ]  

  return { dataSource: appointments, columns }
}


// const AppItem = ({ appointment }) => {
//   const { slot, status, report } = appointment
//   console.log(appointment)
//   const { dataSource, columns } = formatAppointments(appointments)
//   return (
//     <AppItemContainer>
//       <Table dataSource={dataSource} columns={columns} />
//     </AppItemContainer>
//   )
// }

const Index = ({ appointments }) => {
  const { dataSource, columns } = formatAppointments(appointments)

  return (
    <Container>
      <PageHeader title={'ประวัติการนัดหมาย'}/>
      <AppContainer>
        <Table dataSource={dataSource} columns={columns} />
        {/* { _.map(appointments, (app) => <AppItem appointment={app} />)} */}
      </AppContainer>
    </Container>
  )
}

export default enhance(Index)