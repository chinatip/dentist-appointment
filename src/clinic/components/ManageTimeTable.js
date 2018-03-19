import React from 'react'
import { compose } from 'recompose'

import { LOADER, FETCH_TABLE } from 'services'
import { Table, Button } from 'common'
import { formatTimetable } from '../util'


const ManageTimeTable = (props) => {
  const { dataSource, columns } = formatTimetable(props)

  return <Table columns={columns} dataSource={dataSource} />
};

const enhance = compose(
  LOADER,
  FETCH_TABLE('timeslots'),
  FETCH_TABLE('dentists'),
  FETCH_TABLE('users'),
)

export default enhance(ManageTimeTable);