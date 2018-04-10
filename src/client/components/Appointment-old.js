import React, { Component } from 'react'
import styled from 'styled-components'
import { compose } from 'recompose'

import { LOADER, FETCH, LIST, CLINIC, DENTIST, DENTIST_APPOINTMENT, APPOINTMENT } from 'services'
import Table from './AppointmentTable'
import PageContainer from './PageContainer'
import { DatePicker, Select, Button, Modal } from 'common'

const timeSlots = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

const Container = styled.div`
  
`
const OptionContainer = styled.div`
  display: flex;
`
const Col = styled.div`
  flex: 1;
  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
`

const TableContainer = styled.div`
  display: flex;
`
const TableMenuContainer = styled.div`

`
 
const enhance = compose(
  LOADER,
  FETCH(CLINIC, LIST),
  FETCH(DENTIST, LIST),
  FETCH(APPOINTMENT, LIST),
  FETCH(DENTIST_APPOINTMENT, LIST),
)

const renderSelectOptions = (selects, fieldValue, fieldLabel) => {
  if (!selects || selects.length < 1) {
    return []
  }

  return (
    selects.map((s) => {
      return { value: s[fieldValue], label: s[fieldLabel || fieldValue] }
    })
  )
}

const TimeTableSection = ({ showTable, showTableMenu, doctor, treatment, options: { doctors }, onTimeTable, onChange }) => {
  return showTable && (
    <TableContainer>
      <Col>
        <Table timeSlots={timeSlots} onClick={onTimeTable} />
      </Col>
      <Col>
        { showTableMenu && <TableMenuContainer>
            <div>ราคาเฉลี่ย</div>
            <div>{treatment}</div>
            <div>600 - 1000</div>
            <div>เลือกหมอ</div>
            <Select value={doctor} options={renderSelectOptions(doctors, 'name')} onChange={onChange('doctor')} />
            <Button value={'Confirm'} onClick={onChange('showModal')}/>
          </TableMenuContainer>
        }
      </Col>
    </TableContainer>
  )
}

const ClinicSection = ({ clinic, date, treatmentType, treatment, showModal, options: { clinics, treatmentTypes },
  onChange, onUpdateClinic }) => {

  const treatments = treatmentTypes && treatmentType? treatmentTypes.filter(t => t.name === treatmentType)[0].treatments: []

  return (
    <OptionContainer>
      <Col>
        <Select value={clinic} options={renderSelectOptions(clinics, 'id', 'name')} onChange={onUpdateClinic} />
        <DatePicker value={date} size={'large'} onChange={onChange('date')} />
      </Col>
      <Col>
        <Select disabled={!clinic} value={treatmentType} options={renderSelectOptions(treatmentTypes, 'name')} onChange={onChange('treatmentType')} />
        <Select disabled={!clinic || !treatmentType} value={treatment} options={renderSelectOptions(treatments, 'name')} onChange={onChange('treatment')} />
        <Button value={'Find'} onClick={onChange('showTable')} />
      </Col>
    </OptionContainer>
  )
}

const ModalSection = ({ clinic, date, doctor, treatment, timeSlot, showModal, onSubmit, onCancel }) => {
  return (
    <Modal visible={showModal} onOk={onSubmit} onCancel={onCancel}>
      {`Clinic: ${clinic}\n Treatment: ${treatment}\n Doctor: ${doctor}\n Date: ${date}\n timeSlot: ${timeSlot}`}
    </Modal>
  )
}

class Index extends Component {
  constructor(props) {
    super()

    this.state = {
      options: {
        clinics: props.clinics
      },
      showTable: false,
      showTableMenu: false,
      showModal: false
    }
  }

  updateClinic = (clinicId) => {
    const { clinics } = this.props
    const clinic = clinics.filter((c) => c.id === clinicId)[0]
    const { doctors, treatments } = clinic
    let updateState = this.state
    updateState.options['doctors'] = doctors
    updateState.options['treatmentTypes'] = treatments
    updateState['clinic'] = clinic.id

    this.setState(updateState)
  }

  handleChange = (key) => (value = true) => {
    this.setState({
      [key]: value
    })
  }

  handleSubmit = () => {
    const { createAppointment, user } = this.props
    createAppointment(user.id, this.state)
    
    this.handleCloseModal()
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false
    })
  }

  handleTimeTable = (slot) => () => {
    this.setState({
      showTableMenu: true,
      timeSlot: slot
    })
  }

  render() {
    const { clinics } = this.props
    
    console.log(this.props)
    // return / <noscript />
    if (!clinics) return null

    return (
      <PageContainer title={'Appointment'}>
        <Container>
          {/* <ClinicSection {...this.state} onChange={this.handleChange} onUpdateClinic={this.updateClinic} />
          <TimeTableSection {...this.state} onChange={this.handleChange} onTimeTable={this.handleTimeTable} />
          <ModalSection {...this.state} onSubmit={this.handleSubmit} onCancel={this.handleCloseModal} /> */}
        </Container>
      </PageContainer>
    )
  }
}

export default enhance(Index)