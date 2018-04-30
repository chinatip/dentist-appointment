import React, { Component } from 'react'
import { compose, withStateHandlers } from 'recompose'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'

import { LOADER, FETCH, DENTIST_TIMESLOT, APPOINTMENT, CLINIC, LIST } from 'services'
import { Table, DatePicker, Button } from 'common'
import { formatTimetable } from '../util'
import PageHeader from './PageHeader'
import { Calendar } from '../../common';

const events=[
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2018, 5, 4),
    end: new Date(2018, 5, 12),
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2018, 3, 7),
    end: new Date(2018, 3, 10),
  },

  {
    id: 2,
    title: 'DTS STARTS',
    start: new Date(2018, 2, 13, 0, 0, 0),
    end: new Date(2018, 2, 20, 0, 0, 0),
  },

  {
    id: 3,
    title: 'DTS ENDS',
    start: new Date(2018, 10, 6, 0, 0, 0),
    end: new Date(2018, 10, 13, 0, 0, 0),
  }
]

const WorkCalendar = () => {
  BigCalendar.momentLocalizer(moment)

  return (
    <div>
        <BigCalendar
          selectable
          events={events}
          defaultView="week"
          // scrollToTime={new moment()}
          // defaultDate={new moment()} 
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2015, 3, 12)}
       
          // onSelectEvent={event => alert(event.title)}
          // onSelectSlot={slotInfo =>
          //   alert(
          //     `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
          //       `\nend: ${slotInfo.end.toLocaleString()}` +
          //       `\naction: ${slotInfo.action}`
          //   )
          // }
        />
    </div>
  )
}

class DentistWorkTable extends Component {
  constructor(props) {
    super()

    this.state = {
      data: [],
      loading: true, 
      clinic: props.clinics[0]
    }
  }

  componentDidMount() {
    const { clinic } = this.state
    const { dentistTimeslots, appointments } = this.props
    // const events = []
    // dentistTimeslots.forEach((slot) => {
    //   const { clinic, startTime, treatment}
    //   if (clinic._id === _id) {

    //   }
    // })
    console.log(dentistTimeslots, clinic, appointments)
    // const { events = [] } = g

    // const data = events.map(event => ({
    //   ...event,
    //   start: new Date(event.start_time),
    //   end: new Date(event.end_time || event.start_time),
    //   title: event.name
    // }))

    // this.setState({ data })
  }

  render() {
    return (
      <div>
        <PageHeader title={'ตารางเวลา'} />
        <WorkCalendar />
      </div>
    )
  }
}

const enhance = compose(
  LOADER,
  FETCH(CLINIC, LIST),
  FETCH(APPOINTMENT, LIST),
  FETCH(DENTIST_TIMESLOT, LIST)
)

export default enhance(DentistWorkTable)