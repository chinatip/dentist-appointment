import React from 'react'
import { compose, withStateHandlers } from 'recompose'
import moment from 'moment'

import { LOADER, FETCH, DENTIST_TIMESLOT, LIST } from 'services'
import { Table, DatePicker, Button } from 'common'
import { formatTimetable } from '../util'
import PageHeader from './PageHeader'

const ManageTimeTable = ({ clinic, dentistTimeslots, date, updateDate, updateDTSlots }) => {
  const { dataSource, columns } = formatTimetable({ clinic, date, dentistTimeslots, updateDTSlots: (dtslots) => updateDTSlots(dtslots) })

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
  withStateHandlers(
    ({ clinic, dentistTimeslots, updateDate }) => ({ date: new moment(), clinic, dentistTimeslots, updateDate }),
    {
      updateDate: () => (date) => ({ date }),
      updateDTSlots: () => (dentistTimeslots) => ({ dentistTimeslots })
    }
  )
)

export default enhance(ManageTimeTable)