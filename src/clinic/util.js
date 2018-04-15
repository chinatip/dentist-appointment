import React from 'react'
import moment from 'moment'
import _ from 'lodash'
import styled from 'styled-components'
import { withStateHandlers } from 'recompose'

import { Select } from 'common'
import { POST, APPOINTMENT, UPDATE } from 'services'

const DATE_FORMAT = 'DD MMM YYYY'
const TIME_FORMAT = 'HH:mm'

// --------------------------------- Appointment Status ---------------------------------
const APPOINTMENT_STATUS = [
  { label: 'Waiting', value: 'waiting' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Cancel', value: 'cancel' }
]

const SelectStatus = withStateHandlers(
  ({ status }) => ({ select: status }),
  {
    updateStatus: ({}, { status, _id }) => (value) => {
      POST(APPOINTMENT, UPDATE, { status: value, _id })

      return { select: value }
    }
  }
)(({ select, updateStatus }) => {
    return ( select === 'cancel'? 
      <p>{select}</p>
      : <Select value={select || select} onChange={updateStatus} options={APPOINTMENT_STATUS} />
  )}
)

const formatStatusTable = (appointments, editable) => {
  const columns = [
    {
      title: 'Time',
      dataIndex: 'slot',
      key: 'time',
      render: (slot) => {
        const { startTime, endTime } = slot
        const start = moment(startTime)
        const end = moment(endTime)

        return (
          <div>
            <p>{start.format(DATE_FORMAT)}</p>
            <p>{`${start.format(TIME_FORMAT)} - ${end.format(TIME_FORMAT)}`}</p>
          </div>
        )
    }
    }, {
      title: 'Dentist',
      dataIndex: 'slot.dentist',
      key: 'dentist',
      render: (dentist) => <p>{`${dentist.firstname} ${dentist.lastname}`}</p>
    }, {
      title: 'Treatment',
      dataIndex: 'treatment.name',
      key: 'treatment',
      render: (treatment) => <p>{treatment}</p>
    }, {
      title: 'Patient',
      dataIndex: 'patient',
      key: 'patient',
      render: (patient) => <p>{`${patient.firstname} ${patient.lastname}`}</p>
    }
  ]

  const statusCol = {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  }

  if (editable) {
    statusCol.render = (status, { _id }) => <SelectStatus status={status} _id={_id} /> 
  } else {
    statusCol.render = (status) => <p>{status}</p> 
  }
  columns.push(statusCol)
  
  return { dataSource: appointments, columns }
}

export const formatStatus = ({ appointments, editable }) => {
  if (appointments) {
    return formatStatusTable(appointments, editable)
  }

  return { dataSource: [], columns: [] }
}

// --------------------------------- Manage TimeTable ---------------------------------

const updateSlotToTimetable = ({ dentist, slot, availableSlot }) => {
  console.log(dentist, slot, availableSlot)
}

const SlotContainer = styled.div`
  display: flex;

  div {
    font-weight: bold;
  }
`

const SlotController = withStateHandlers(
  ( ({ availableSlot }) => ({ slot: availableSlot.value }) ),
    { 
      updateSlot: ({ slot }, { dentist, availableSlot }) => (value) => {
        return { slot: value < 0? 0: value } 
      }
    }
  ) (({ slot, updateSlot, updateTable }) => {

    return (
      <SlotContainer>
        <button onClick={() => updateSlot(slot-1)}>-</button>
        <div>{slot}</div>
        <button onClick={() => updateSlot(slot+1)}>+</button>
      </SlotContainer>
    )
  }
)

const formatTimetableTable = ({ dentists, clinic }) => {
  const columns = [{
    title: 'Dentist',
    dataIndex: 'dentist',
    key: 'dentist',
    // render: (dentist) => {      
    //   return <p>{`${name} ${lastname}`}</p>
    // }
  }];

  _.range(9, 21).forEach((timeslot) => {
    columns.push({
      title: `${timeslot - 1} - ${timeslot}`,
      dataIndex: timeslot,
      key: timeslot,
      render: (availableSlot, { dentist, timeslot }) => {
        return <SlotController availableSlot={availableSlot} dentist={dentist} />
      }
    })
  })

  const dataSource = dentists.map((dent, idx) => {
    const dentist = {}
    _.range(9, 21).forEach((time) => {
      dentist[time] = { label: time, value: Math.round(Math.random()*5)}
    })
    dentist.key = idx
    dentist.dentist = dent

    return dentist
  })
  
  return { dataSource, columns}
}

export const formatTimetable = ({ clinic, dentists }) => {
  if (clinic && dentists) {
    // const timeslots = formatTimetableData(props)
    console.log('ok')
    // return formatTimetableTable({ ...props, timeslots })
    return { dataSource: [], columns: [] }
  }

  return { dataSource: [], columns: [] } 
}

// --------------------------------- Manage Doctor ---------------------------------

const formatDoctorTable = (dentists) => {
  const columns = [
    {
      title: 'ชื่อ',
      dataIndex: 'firstname',
      key: 'firstname'
    }, {
      title: 'นามสกุล',
      dataIndex: 'lastname',
      key: 'lastname',
    }, {
      title: 'การรักษา',
      dataIndex: 'treatments',
      key: 'treatments',
      render: (treatments) => {
        return <div>{ treatments.map((t) => <p>{t.name}</p>) }</div>
      }
    }, {
      title: 'เบอร์โทร',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: 'แก้ไข',
      dataIndex: '_id',
      key: 'edit',
      render: (id) => <button>edit</button>
    }
  ]  

  return { dataSource: dentists, columns }
}

export const formatDoctor = ({ dentists }) => {
  if (dentists) {
    return formatDoctorTable(dentists)
  }

  return { dataSource: [], columns: [] }
}