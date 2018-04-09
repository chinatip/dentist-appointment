import React from 'react'
import { compose } from 'recompose'

import { LOADER, FETCH, APPOINTMENT, LIST } from 'services'
import { Table, Button } from 'common'
import { formatStatus } from '../util'

const AppointmentStatus = (props) => {
  console.log(props)
  const { dataSource, columns } = formatStatus(props)

  return <Table columns={columns} dataSource={dataSource} />
};

const enhance = compose(
  LOADER,
  FETCH(APPOINTMENT, LIST)
)

export default enhance(AppointmentStatus);