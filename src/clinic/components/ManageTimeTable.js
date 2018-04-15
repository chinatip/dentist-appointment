import React from 'react'
import { compose } from 'recompose'

import { LOADER, FETCH, DENTIST_TIMESLOT, CLINIC, LIST } from 'services'
import { Table, Button } from 'common'
import { formatTimetable } from '../util'


const ManageTimeTable = (props) => {
  // const { dataSource, columns } = formatTimetable(props)
  console.log(props)
  // return <Table columns={columns} dataSource={dataSource} />
  return <noscript />
};

const enhance = compose(
  LOADER,
  FETCH(DENTIST_TIMESLOT, LIST),
  FETCH(CLINIC, LIST)
)

export default enhance(ManageTimeTable);