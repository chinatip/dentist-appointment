import React, { Component } from 'react'
import styled from 'styled-components'
import { compose, withStateHandlers } from 'recompose'

import { formatPatients } from '../util'
import PageHeader from './PageHeader'
import TreatmentHistoryModal from './TreatmentHistoryModal'

import { Table, Button, Switch } from 'common'
import { LOADER, POST, FETCH, CLINIC, PATIENT, REPORT, APPOINTMENT, LIST } from 'services'
import { cssFontH3, colorGrey } from 'common/styles/style-base'

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

  renderExpandedRowRender = (props) => {
    console.log(props)

    return <div></div>
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