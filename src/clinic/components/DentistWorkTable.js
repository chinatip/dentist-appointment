import _ from 'lodash'
import React, { Component } from 'react'
import { compose, withStateHandlers } from 'recompose'
import moment from 'moment'
import styled from 'styled-components'
import BigCalendar from 'react-big-calendar'
import { stringToMoment } from 'common/utils'

import { cssFontH3, cssFontP, colorBlue } from 'common/styles/style-base'
import { LOADER, FETCH, APPOINTMENT, LIST } from 'services'
import { Select } from 'common'
import PageHeader from './PageHeader'

const Container = styled.div`
  .rbc-today {
    background-color: rgba(51, 181, 193, 0.08);
  }
  .rbc-event {
    background-color: #00bcce !important;
    border: 1px solid #00bcce !important;
  }
  .rbc-current-time-indicator {
    height: 2px;
    background-color: #13d3e6;
  }
  .rbc-toolbar-label {
    ${cssFontH3}
    color: #58b6bd;
  }
  .rbc-header a {
    ${cssFontP}
    font-weight: 500;
    font-size: 0.85rem;
    line-height: 2.1rem;
    color: #666969 !important;
  }
  .rbc-time-slot {
    width: 69.94px;
    height: 20px;
  }
  .rbc-label {
    ${cssFontP}
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 2.4rem;
    color: rgba(102, 105, 105, 0.64) !important;
  }
  .rbc-btn-group button {
    ${cssFontP}
    font-weight: 500;
    font-size: 0.85rem;
    line-height: 1.15rem;
    color: #666969 !important;
  }
`

const WorkCalendar = ({ events }) => {
  BigCalendar.momentLocalizer(moment)

  return (
    <Container>
        <BigCalendar
          selectable
          events={events}
          defaultView="week"
          scrollToTime={new Date()}
          defaultDate={new Date()}
        />
    </Container>
  )
}

class DentistWorkTable extends Component {
  constructor(props) {
    super()

    const { dentist, dentistOptions } = this.initData(props)
    this.state = {
      eventsById: [],
      loading: true, 
      dentist, 
      dentistOptions
    }
  }

  initData(props) {
    const { clinic: { dentists } } = props
    const dentistOptions = dentists.map((d) => ({ label: `${d.firstname} ${d.lastname}`, value: d._id }))

    return { dentist: dentistOptions[0].value, dentistOptions }
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
        
        idx += 1
      })
    })

    this.setState({ loading: false, eventsById })
  }

  updateDentist = (dentist) => {
    this.setState({ dentist })
  }

  render() {
    const { loading, eventsById, dentist, dentistOptions } = this.state

    if (loading) return <div>loading</div>
    
    return (
      <div>
        <PageHeader title={'ตารางงาน'}>
          <Select value={dentist} onChange={this.updateDentist} options={dentistOptions} />
        </PageHeader>
        <WorkCalendar events={eventsById[dentist]}/>
      </div>
    )
  }
}

const enhance = compose(
  LOADER,
  FETCH(APPOINTMENT, LIST),
)

export default enhance(DentistWorkTable)