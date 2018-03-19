import React from 'react'
import moment from 'moment'

function dataById(data) {
  const dataById = {}

  data.forEach((d) => {
    dataById[d.id] = d
  })

  return dataById
}

// --------------------------------- Appointment Status ---------------------------------

const formatAppointmentStatusData = ({ appointments, timeslots, dentists, patients, users }) => {
  const timeslotsById = dataById(timeslots)
  const dentistsById = dataById(dentists)
  const patientsById = dataById(patients)
  const usersById = dataById(users)

  return appointments.map((appointment, id) => {
    const { patient_id, timeslot_id } = appointment
    const timeslot = timeslotsById[timeslot_id]
    const dentist = usersById[dentistsById[timeslot.dentist_id].id]
    const patient = usersById[patientsById[patient_id].id]

    return { 
      key: id,
      ...appointment, 
      timeslot,
      dentist,
      patient
    }
  })
}

const formatAppointmentStatusTableData = (appointments) => {
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
          <p>{start.format("DD MMM YYYY")}</p>
          <p>{`${start.format("HH:mm")} - ${end.format("HH:mm")}`}</p>
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

export const formatAppointmentStatus = (props) => {
  if (props) {
    const appointments = formatAppointmentStatusData(props)

    return formatAppointmentStatusTableData(appointments)
  }

  return 
}