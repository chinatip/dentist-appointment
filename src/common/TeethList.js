import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'

import Button from './Button'
import TeethQuadrants from './TeethQuadrants'

import { POST, APPOINTMENT, REPORT, CREATE, UPDATE } from 'services'

const Container = styled.div`
  width: 100%;
  height: 100;
`
const ListContainer = styled.div`

`
const ListItemContainer = styled.div`
  padding: 10px;
  background: grey;
  display: flex;
`
const ItemContainer = styled.div`
  
`
const List = styled.div`
  display: flex;
`

class TeethList extends Component {
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

    return (
      <Container>
        <TeethQuadrants selectedTeeth={selectedTeeth}/>
        <ListContainer>
          <Button value={'+'} onClick={this.addTooth} />
          { data.map((d, dIdx) => {
            const { name, list } = d
            return (
              <ListItemContainer>
                <input value={name} onChange={(e) => this.updateTooth(dIdx, 'name', e.target.value)}/>
                <Button value={'X'} onClick={this.removeTooth(dIdx)} />
                <ItemContainer>
                  <Button value={'+'} onClick={this.addToothDetail(dIdx)} />
                  { _.map(list, (l, lIndex) => ( 
                      <List>
                        <input value={l} onChange={(e) => this.updateToothDetail(dIdx, lIndex, e.target.value)}/>
                        <Button value={'X'} onClick={this.removeToothDetail(dIdx, lIndex)} />
                      </List>
                    )
                  )}
                </ItemContainer>
              </ListItemContainer>
            )
          })}
        </ListContainer>
        <Button value={'save'} onClick={this.handleUpdateData} />
      </Container>
    )
  }
}

export default TeethList