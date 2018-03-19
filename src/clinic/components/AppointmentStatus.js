import React from 'react'
import { compose } from 'recompose'

import { LOADER, FETCH_TABLE } from 'services'
import { Table, Button } from 'common'
import { formatAppointmentStatus } from '../util'

const Index = (props) => {
  const { dataSource, columns } = formatAppointmentStatus(props)

  return <Table columns={columns} dataSource={dataSource} />
};

const enhance = compose(
  LOADER,
  FETCH_TABLE('appointments'),
  FETCH_TABLE('timeslots'),
  FETCH_TABLE('dentists'),
  FETCH_TABLE('patients'),
  FETCH_TABLE('patients'),
  FETCH_TABLE('users'),
)

export default enhance(Index);