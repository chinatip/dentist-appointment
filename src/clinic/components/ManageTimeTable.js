import React from 'react'
import { compose, withStateHandlers } from 'recompose'
import moment from 'moment'

import { LOADER, FETCH, DENTIST_TIMESLOT, CLINIC, LIST } from 'services'
import { Table, DatePicker, Button } from 'common'
import { formatTimetable } from '../util'
import PageHeader from './PageHeader'

const ManageTimeTable = ({ clinics, dentistTimeslots, date, updateDate }) => {
  const clinic = clinics[0]
  const { dataSource, columns } = formatTimetable({ clinic, date, dentistTimeslots })

  return (
    <div>
      <PageHeader title={'ตารางเวลา'}>
        <DatePicker value={date} onChange={updateDate}/>
      </PageHeader>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  )
}

const enhance = compose(
  LOADER,
  FETCH(DENTIST_TIMESLOT, LIST),
  FETCH(CLINIC, LIST),
  withStateHandlers(
    { date: new moment() },
    {
      updateDate: () => (date) => ({ date })
    }
  )
)

export default enhance(ManageTimeTable)