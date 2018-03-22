import React from 'react'
import { compose } from 'recompose'

import { LOADER, FETCH_TABLE } from 'services'
import { Table, Button } from 'common'
import { formatStatus } from '../util'

const AppointmentStatus = (props) => {
  const { dataSource, columns } = formatStatus(props)

  return <Table columns={columns} dataSource={dataSource} />
};

const enhance = compose(
  LOADER,
  FETCH_TABLE('appointments'),
  FETCH_TABLE('timeslots'),
  FETCH_TABLE('dentists'),
  FETCH_TABLE('patients'),
  FETCH_TABLE('users'),
  FETCH_TABLE('treatments'),
)

export default enhance(AppointmentStatus);