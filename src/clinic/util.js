import React from 'react'
import moment from 'moment'
import _ from 'lodash'

const DATE_FORMAT = 'DD MMM YYYY'
const TIME_FORMAT = 'HH:mm'

function dataById(data) {
  const dataById = {}

  data.forEach((d) => {
    dataById[d.id] = d
  })

  return dataById
}

// --------------------------------- Appointment Status ---------------------------------

const formatStatusData = ({ appointments, timeslots, dentists, patients, users }) => {
  const timeslotsById = dataById(timeslots)
  const dentistsById = dataById(dentists)
  const patientsById = dataById(patients)
  const usersById = dataById(users)

  return appointments.map((appointment, idx) => {
    const { patient_id, timeslot_id } = appointment
    const timeslot = timeslotsById[timeslot_id]
    const dentist = usersById[dentistsById[timeslot.dentist_id].id]
    const patient = usersById[patientsById[patient_id].id]

    return { 
      key: idx,
      ...appointment, 
      timeslot,
      dentist,
      patient
    }
  })
}

const formatStatusTable = (appointments) => {
  const columns = [{
    title: 'Time',
    dataIndex: 'timeslot',
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
    dataIndex: 'dentist',
    key: 'dentist',
    render: (dentist) => <p>{`${dentist.name} ${dentist.lastname}`}</p>
  }, {
    title: 'Action',
    dataIndex: 'customerName',
    key: 'customerName',
    render: () => <p>unknown</p>
  }, {
    title: 'Patient',
    dataIndex: 'patient',
    key: 'patient',
    render: (patient) => <p>{`${patient.name} ${patient.lastname}`}</p>
  }, {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => <p>waiting</p>
  }];
  
  return { dataSource: appointments, columns}
}

export const formatStatus = (props) => {
  if (props) {
    const appointments = formatStatusData(props)

    return formatStatusTable(appointments)
  }

  return 
}

// --------------------------------- Manage TimeTable ---------------------------------

const formatTimetableData = ({ timeslots, dentists, users }) => {
  const timeslotsById = dataById(timeslots)
  const dentistsById = dataById(dentists)
  const usersById = dataById(users)

  return timeslots.map((slot, idx) => {
    const timeslot = timeslotsById[slot.id]
    const dentist = usersById[dentistsById[timeslot.dentist_id].id]

    return { 
      key: idx,
      timeslot,
      dentist
    }
  })
}

const formatTimetableTable = ({ timeslots, dentists, users }) => {
  const columns = [{
    title: 'Dentist',
    dataIndex: 'dentist',
    key: 'dentist',
    render: (dentist) => {
      const { name, lastname } = dataById(users)[dentist.person_id]
      
      return <p>{`${name} ${lastname}`}</p>
    }
  }];

  _.range(9, 20).forEach((time) => {
    columns.push({
      title: `${time - 1} - ${time}`,
      dataIndex: time,
      key: time,
    })
  })

  const dataSource = dentists.map((dent, idx) => {
    const dentist = {}
    _.range(9, 20).forEach((time) => {
      dentist[time] = 5
    })
    dentist.key = idx
    dentist.dentist = dent

    return dentist
  })
  
  return { dataSource, columns}
}

export const formatTimetable = (props) => {
  if (props) {
    const timeslots = formatTimetableData(props)

    return formatTimetableTable({ ...props, timeslots })
  }

  return 
}