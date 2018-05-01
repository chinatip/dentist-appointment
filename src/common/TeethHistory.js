import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'
import { compose } from 'recompose'

import Button from './Button'
import TreatmentCard from './TreatmentCard'
import TeethQuadrants from './TeethQuadrants'

import { LOADER, FETCH, POST, APPOINTMENT, REPORT, CREATE, UPDATE, FIND_BY_PATIENT_ID } from 'services'
import { cssFontH3 } from './styles/style-base'

const cssColorBlue = '#00bcce'

const Container = styled.div`
  width: 100%;
  height: 100;
`
const ListContainer = styled.div`
  display: flex;
  flex: wrap;
  margin-top: 30px;
  margin-bottom: 40px;
`
const Column = styled.div`
  width: 50%;
  ${props => props.left && 'padding-right: 15px;'}
  ${props => props.right && 'padding-left: 15px;'}
`

const HistoryContainer = styled.div`
  
`
const HistoryLabel = styled.div`
  ${cssFontH3}
  color: ${cssColorBlue};
  margin-bottom: 28px;
`
const AddToothContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`
const AddToothLabel = styled.div`
  margin-left: 15px;
  ${cssFontH3}
  color: ${cssColorBlue};
`


const enhance = compose(
  LOADER,
  FETCH(REPORT, FIND_BY_PATIENT_ID)
)

class TeethHistory extends Component {
  constructor(props) {
    super()

    this.state = this.initData(props)
  }
  
  initData(props) {
    let nData = []
    let nReports = []
    let nNote = ''
    const { report, reports } = props
    if (report) {
      nData = report.data
      nNote = report.note
    }

    if (reports) {
      if (report) {
        nReports = _.filter(reports, (r) => r._id !== report._id)
      } else {
        nReports = reports
      }
    }

    return { data: nData, reports: nReports, note: nNote }
  }
  
  handleUpdateData = async () => {
    const { data, note } = this.state
    const { report, appointment, onSubmit } = this.props

    if (report) {
      const { _id } = report
      const rep = await POST(REPORT, UPDATE, { _id, data, note })
    } else {
      const { patient, slot: { dentist, clinic } } = appointment
      const rep = await POST(REPORT, CREATE, { 
        clinic: clinic._id,
        dentist: dentist._id,
        patient: patient._id,
        data, 
        note
      })
      const res = await POST(APPOINTMENT, UPDATE, { _id: appointment._id, report: rep._id })
    }

    onSubmit()
    window.location.reload()
  }

  addTooth = () => {
    const updateData = this.state.data
    updateData.push({
      name: 'new',
      list: []
    })

    this.setState({ data: updateData })
  }

  updateTooth = (index, label, value) => {
    const updateData = this.state.data
    updateData[index][label] = value

    this.setState({ data: updateData })
  }

  removeTooth = (index) => () => {
    const { data } = this.state
    const updateData = data.filter((t, idx) => index !== idx)

    this.setState({ data: updateData })
  }

  addToothDetail = (index) => () => {
    const updateData = this.state.data
    updateData[index].list.push('')

    this.setState({ data: updateData })
  }

  updateToothDetail = (index, listIndex, value) => {
    const { data } = this.state
    const updateData = data
    updateData[index].list[listIndex] = value

    this.setState({ data: updateData })
  }

  updateNote = (e) => {
    this.setState({ note: e.target.value })
  } 

  removeToothDetail = (index, listIndex) => () => {
    const { data } = this.state
    const updateData = data
    updateData[index].list = updateData[index].list.filter((t, idx) => listIndex !== idx)

    this.setState({ data: updateData })
  }

  renderCurrentTeeth() {
    const { data, note } = this.state

    return (
      <Column left>
        <AddToothContainer>
          <Button value={'+'} onClick={this.addTooth} />
          <AddToothLabel>เพิ่มฟัน</AddToothLabel>
        </AddToothContainer>
        <TreatmentCard 
          data={data}
          note={note} 
          onUpdateTooth={this.updateTooth}
          onRemoveTooth={this.removeTooth}
          onUpdateToothDetail={this.updateToothDetail}
          onRemoveToothDetail={this.removeToothDetail}
          onAddToothDetail={this.addToothDetail}
          onUpdateNote={this.updateNote}
        />
      </Column>
    )
  }

  renderHistoryTeeth() {
    const { reports } = this.state
    
    return (
      <Column right>
        <HistoryLabel>ประวัติการรักษา</HistoryLabel>
        <HistoryContainer>
          { reports.map((rep) => {
              const { data, note } = rep
              return (
                <div>
                  <TreatmentCard 
                    edit={false}
                    data={data}
                    note={note}
                  />
                </div>
              )
            })
          }
        </HistoryContainer>
      </Column>
    )
  }

  render() {
    const { data, note, reports } = this.state
    const selectedTeeth = data.map((d) => d.name)

    return (
      <Container>
        <TeethQuadrants selectedTeeth={selectedTeeth}/>
        <ListContainer>
          { this.renderCurrentTeeth() }
          { this.renderHistoryTeeth() }
        </ListContainer>
        <Button value={'save'} onClick={this.handleUpdateData} />
      </Container>
    )
  }
}

export default enhance(TeethHistory)