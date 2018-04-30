import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import { formatPatients } from '../util'
import PageHeader from './PageHeader'
import AddPatientModal from './AddPatientModal'

import { Table, Button } from 'common'
import TreatmentCard from 'common/TreatmentCard'
import { stringToMoment } from 'common/utils'
import { POST, CLINIC, PATIENT, REPORT, APPOINTMENT, LIST } from 'services'
import { cssFontH3, cssFontH4, cssFontP } from 'common/styles/style-base'

const AppContainer = styled.div`
  margin-right: 15px;
`
const AppDateLabel = styled.div`
  ${cssFontH4}
`
const AppTimeLabel = styled.div`
  ${cssFontP}
`

const RepContainer = styled.div`
  margin-right: 15px;
`

const Label = styled.div`
  ${cssFontH3}
`
const Flex = styled.div`
  display: flex;
  margin-bottom: 30px;
`

const AppItem = ({ slot, treatment, status }) => {
  const { dentist, startTime } = slot
  const time = stringToMoment(startTime)
  const date = time.format('DD MMM YYYY')
  const timeslot = time.format('H:mm')

  return (
    <AppContainer>
      <AppDateLabel>{date}</AppDateLabel>
      <AppTimeLabel>{timeslot}</AppTimeLabel>
      <div>{ treatment.name }</div>
      <div>{ status }</div>
    </AppContainer>
  )
}

class ManagePatient extends Component {
  constructor(props) {
    super()

    this.state = {
      loading: true,
      patients: [],
      addPatient: false
    }
  }

  componentDidMount() {
    this.loadPatients()
  }

  async loadPatients() {
    const { clinic } = this.props
    const reportsById = {}
    const appointmentsById = {}

    const patients = await POST(CLINIC, PATIENT, { _id: clinic._id })
    
    for (let p of patients) {
      const reports = await POST(PATIENT, REPORT, { _id: p._id })
      reportsById[p._id] = reports
      const appointments = await POST(PATIENT, APPOINTMENT, { _id: p._id })
      appointmentsById[p._id] = appointments
    }

    this.setState({
      loading: false,
      patients,
      reportsById,
      appointmentsById
    })
  }

  handleAddPatient = () => {
    const { addPatient } = this.state
    
    this.setState({
      addPatient: !addPatient
    })
  }

  renderExpandedRowRender = ({ _id }) => {
    const { reportsById, appointmentsById } = this.state

    return (
      <div>
          <Label>การนัดหมาย</Label>
          <Flex>
            { appointmentsById[_id] && _.map(appointmentsById[_id], (app) => {
                const { treatment, status, slot } = app
                return <AppItem key={app._id} treatment={treatment} status={status} slot={slot} />
              }) 
            }
          </Flex>
          <Label>ประวัติการรักษา</Label>
          <Flex>
            { reportsById[_id] && reportsById[_id].map((rep) => {
                const { data, note } = rep
                return (
                  <RepContainer>
                    { rep._id }
                    <TreatmentCard 
                      edit={false}
                      data={data}
                      note={note}
                    />
                  </RepContainer>
                )
              })
            }
          </Flex>
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
    const { clinic, history } = this.props
    const { loading, patients, addPatient } = this.state

    return (
      <div>
        <PageHeader title={'คนไข้'} />
        <Button value='เพิ่มคนไข้' onClick={this.handleAddPatient}/>
        { loading? 'loading': this.renderTable()}
        <AddPatientModal visible={addPatient} onClose={this.handleAddPatient} clinic={clinic} history={history} />
      </div>
    )
  }
}

export default withRouter(ManagePatient)