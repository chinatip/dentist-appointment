import React from 'react'
import { compose } from 'recompose'

import { LOADER, FETCH } from 'services'
import { Table, Button } from 'common'
import { formatStatus } from '../util'

const AppointmentStatus = (props) => {
  const { dataSource, columns } = formatStatus(props)

  return <Table columns={columns} dataSource={dataSource} />
};

const enhance = compose(
  LOADER,
  FETCH('appointments'),
  FETCH('timeslots'),
  FETCH('dentists'),
  FETCH('patients'),
  FETCH('users'),
  FETCH('treatments'),
)

export default enhance(AppointmentStatus);