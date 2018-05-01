import _ from 'lodash'
import React, { Component } from 'react'
import { compose, withStateHandlers } from 'recompose'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'
import { stringToMoment } from 'common/utils'

import { LOADER, FETCH, APPOINTMENT, LIST } from 'services'
import { Table, DatePicker, Button } from 'common'
import { formatTimetable } from '../util'
import PageHeader from './PageHeader'
import { Calendar } from '../../common';

const WorkCalendar = ({ events }) => {
  BigCalendar.momentLocalizer(moment)

  return (
    <div>
        <BigCalendar
          selectable
          events={events}
          defaultView="week"
          scrollToTime={new Date()}
          defaultDate={new Date()}
        />
    </div>
  )
}

class DentistWorkTable extends Component {
  constructor(props) {
    super()

    this.state = {
      eventsById: [],
      loading: true, 
    }
  }

  componentDidMount() {
    const { clinic, appointments } = this.props
    const dataByDent = {}

    appointments.forEach((app) => {
      const { slot, treatment } = app
      const { _id, dentist, clinic } = slot

      if (clinic._id === slot.clinic._id) {
        if (!dataByDent[dentist._id]) {
          dataByDent[dentist._id] = {}
        } 

        dataByDent[dentist._id][_id] = {}
        dataByDent[dentist._id][_id].slot = slot
        dataByDent[dentist._id][_id].appointment = app
        dataByDent[dentist._id][_id].treatment = treatment
      }
    })

    let idx = 0
    const eventsById = {}
    _.forEach(dataByDent, (d, dentId) => {
      if (!eventsById[dentId]) {
        eventsById[dentId] = []
      }
      _.forEach(d, (s, slotId) => {
        const { slot, appointment: { patient }, treatment } = s
        const startTime = stringToMoment(slot.startTime).toDate()
        const endTime = stringToMoment(slot.startTime).add(treatment.treatment || 30, 'minute').toDate()

        eventsById[dentId].push({
          id: idx,
          title: `${patient.firstname} ${patient.lastname}`,
          desc: treatment.name,
          start: startTime,
          end: endTime,
        })

        console.log(startTime, s.appointment._id, `${patient.firstname} ${patient.lastname}`)
        
        idx += 1
      })
    })

    this.setState({ loading: false, eventsById })
  }

  render() {
    const { loading, eventsById } = this.state

    if (loading) return <div>loading</div>
    
    return (
      <div>
        <PageHeader title={'ตารางงาน'} />
        <WorkCalendar events={eventsById[Object.keys(eventsById)[0]]}/>
      </div>
    )
  }
}

const enhance = compose(
  LOADER,
  FETCH(APPOINTMENT, LIST),
)

export default enhance(DentistWorkTable)