import _ from 'lodash'
import React, { Component } from 'react'
import { compose, withStateHandlers } from 'recompose'
import moment from 'moment'
import styled from 'styled-components'
import BigCalendar from 'react-big-calendar'
import { stringToMoment } from 'common/utils'

import { cssFontH3, cssFontP, colorBlue } from 'common/styles/style-base'
import { LOADER, FETCH, APPOINTMENT, FIND_BY_FB_ID } from 'services'
import { Select } from 'common'
// import PageHeader from './PageHeader'

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

    this.state = {
      events: [],
      loading: true, 
    }
  }

  componentDidMount() {
    const { appointments } = this.props

    let idx = 0
    const events = []
    _.forEach(appointments, (app) => {
      const { slot, treatment, patient } = app
      const startTime = stringToMoment(slot.startTime).toDate()
      const endTime = stringToMoment(slot.startTime).add(treatment.treatment || 30, 'minute').toDate()

      events.push({
        id: idx,
        title: `${patient.firstname} ${patient.lastname}`,
        desc: treatment.name,
        start: startTime,
        end: endTime,
      })
      
      idx += 1
    })

    this.setState({ loading: false, events })
  }

  // updateDentist = (dentist) => {
  //   this.setState({ dentist })
  // }

  render() {
    const { loading, events, dentist, dentistOptions } = this.state

    if (loading) return <div>loading</div>
    
    return (
      <div>
        {/* <PageHeader title={'ตารางงาน'}> */}
          {/* <Select value={dentist} onChange={this.updateDentist} options={dentistOptions} /> */}
        {/* </PageHeader> */}
        <WorkCalendar events={events}/>
      </div>
    )
  }
}

const enhance = compose(
  LOADER,
  FETCH(APPOINTMENT, FIND_BY_FB_ID),
)

export default enhance(DentistWorkTable)