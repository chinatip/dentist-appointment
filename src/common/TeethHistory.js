import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'

import Button from './Button'
import ToothItem from './ToothItem'
import TeethQuadrants from './TeethQuadrants'

import { POST, APPOINTMENT, REPORT, CREATE, UPDATE } from 'services'
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
`

class TeethHistory extends Component {
  constructor(props) {
    super()

    let data = []

    if (props.report) {
      data = props.report.data
    }

    this.state = { data }
  }
  
  handleUpdateData = async () => {
    const { data } = this.state
    const { report, appointment, onSubmit } = this.props

    if (report) {
      const { _id } = report
      const rep = await POST(REPORT, UPDATE, { _id, data })
    } else {
      const { patient, slot: { dentist, clinic } } = appointment
      const rep = await POST(REPORT, CREATE, { 
        clinic: clinic._id,
        dentist: dentist._id,
        patient: patient._id,
        data
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

  removeToothDetail = (index, listIndex) => () => {
    const { data } = this.state
    const updateData = data
    updateData[index].list = updateData[index].list.filter((t, idx) => listIndex !== idx)

    this.setState({ data: updateData })
  }

  render() {
    const { data } = this.state
    const selectedTeeth = data.map((d) => d.name)
    console.log(this.props)
    return (
      <Container>
        <TeethQuadrants selectedTeeth={selectedTeeth}/>
        <ListContainer>
          <Column left>
            <Button value={'+'} onClick={this.addTooth} />
            { data.map((d, dIdx) => {
              const { name, list } = d
              return (
                <ToothItem 
                  name={name}
                  toothIndex={dIdx} 
                  historyList={list}
                  onUpdateTooth={this.updateTooth}
                  onRemoveTooth={this.removeTooth}
                  onUpdateToothDetail={this.updateToothDetail}
                  onRemoveToothDetail={this.removeToothDetail}
                  onAddToothDetail={this.addToothDetail}
                />
              )
            })}
          </Column>
          <Column right>
            <HistoryLabel>ประวัติการรักษา</HistoryLabel>
            <HistoryContainer>

            </HistoryContainer>
          </Column>
        </ListContainer>
        <Button value={'save'} onClick={this.handleUpdateData} />
      </Container>
    )
  }
}

export default TeethHistory