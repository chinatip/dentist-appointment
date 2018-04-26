import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'
import { compose } from 'recompose'

import { formatPatients } from '../util'
import PageHeader from './PageHeader'
import ToothCard from 'common/ToothCard'


import { Table } from 'common'
import { stringToMoment } from 'common/utils'
import { LOADER, POST, FETCH, CLINIC, PATIENT, REPORT, APPOINTMENT, LIST } from 'services'
import { cssFontH3, cssFontH4, cssFontP } from 'common/styles/style-base'

const AppContainer = styled.div`
  display: flex;
`
const AppItemContainer = styled.div`
  margin-right: 15px;
`
const AppDateLabel = styled.div`
  ${cssFontH4}
`
const AppTimeLabel = styled.div`
  ${cssFontP}
`

const Label = styled.div`
  ${cssFontH3}
`

const AppItem = ({ slot, treatment, status }) => {
  const { dentist, startTime } = slot
  const time = stringToMoment(startTime)
  const date = time.format('DD MMM YYYY')
  const timeslot = time.format('H:mm')

  return (
    <AppItemContainer>
      <AppDateLabel>{date}</AppDateLabel>
      <AppTimeLabel>{timeslot}</AppTimeLabel>
      <div>{ treatment.name }</div>
      <div>{ status }</div>
    </AppItemContainer>
  )
}

class ManagePatient extends Component {
  constructor(props) {
    super()

    this.state = {
      clinic: props.clinics[0],
      loading: true,
      patients: []
    }
  }

  componentDidMount() {
    this.loadPatients()
  }

  async loadPatients() {
    const { clinic } = this.state
    const reportsById = {}
    const appointmentsById = {}

    const patients = await POST(CLINIC, PATIENT, { _id: clinic._id })
    patients.forEach(async (p) => {
      const reports = await POST(PATIENT, REPORT, { _id: p._id })
      reportsById[p._id] = reports
      const appointments = await POST(PATIENT, APPOINTMENT, { _id: p._id })
      appointmentsById[p._id] = appointments
    })

    this.setState({
      loading: false,
      patients,
      reportsById,
      appointmentsById
    })
  }

  renderExpandedRowRender = ({ _id }) => {
    const { reportsById, appointmentsById } = this.state

    return (
      <div>
        <AppContainer>
          <Label>การนัดหมาย</Label>
          { _.map(appointmentsById[_id], (app) => {
              const { treatment, status, slot } = app
              return <AppItem key={app._id} treatment={treatment} status={status} slot={slot} />
            }) 
          }
        </AppContainer>
        { reportsById[_id].map((rep) => {
            const { data, note } = rep
            return (
              <div>
                { rep._id }
                <ToothCard 
                  edit={false}
                  data={data}
                  note={note}
                />
              </div>
            )
          })
        }
      </div>
    )
  }
  
  renderTable() {
    const { patients } = this.state
    const { dataSource, columns } = formatPatients({ patients })

    return (
      <div>
        <Table dataSource={dataSource} columns={columns} expandedRowRender={this.renderExpandedRowRender} />
      </div>
    )
  }

  render() {
    const { loading, patients } = this.state
    console.log(this.state)
    return (
      <div>
        <PageHeader title={'คนไข้'} />
        { loading? 'loading': this.renderTable()}
      </div>
    )
  }
}

const enhance = compose(
  LOADER,
  FETCH(CLINIC, LIST)
)

export default enhance(ManagePatient)