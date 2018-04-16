import React from 'react'
import { compose } from 'recompose'

import { LOADER, FETCH, DENTIST_TIMESLOT, CLINIC, LIST } from 'services'
import { Table, Button } from 'common'
import { formatTimetable } from '../util'


const ManageTimeTable = (props) => {
  const clinic = props.clinics[0]
  const dentists = clinic.dentists
  const { dataSource, columns } = formatTimetable({ clinic, dentists })
  console.log(dataSource, columns)
  // return <Table columns={columns} dataSource={dataSource} />
  return <noscript />
}

const enhance = compose(
  LOADER,
  FETCH(DENTIST_TIMESLOT, LIST),
  FETCH(CLINIC, LIST)
)

export default enhance(ManageTimeTable)