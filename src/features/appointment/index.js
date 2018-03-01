import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Table from './Table';
import { getUser } from 'redux/user';
import { getClinics } from 'redux/clinic';
import { createAppointment } from 'redux/appointment';
import { PageContainer, DatePicker, Select, Button, Modal } from 'common';

const timeSlots = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

const Container = styled.div`
  
`;
const OptionContainer = styled.div`
  display: flex;
`;
const Col = styled.div`
  flex: 1;
  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
`;

const TableContainer = styled.div`
  display: flex;
`;
const TableMenuContainer = styled.div`

`;

class Index extends Component {
  constructor(props) {
    super();

    this.state = {
      options: {
        clinics: props.clinics
      },
      showTable: false,
      showTableMenu: false,
      showModal: false
    };
  }

  updateClinic = (clinicId) => {
    const { clinics } = this.props;
    const clinic = clinics.filter((c) => c.id === clinicId)[0];
    const { doctors, treatments } = clinic;
    let updateState = this.state;
    updateState.options['doctors'] = doctors;
    updateState.options['treatmentTypes'] = treatments;
    updateState['clinic'] = clinic.id;

    this.setState(updateState);
  }

  handleChange = (key) => (value = true) => {
    this.setState({
      [key]: value
    });
  }

  handleSubmit = () => {
    const { createAppointment, user } = this.props;
    createAppointment(user.id, this.state)
    
    this.handleCloseModal();
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false
    });
  }

  renderSelectOptions(selects, fieldValue, fieldLabel) {
    if (!selects || selects.length < 1) {
      return [];
    }

    return (
      selects.map((s) => {
        return { value: s[fieldValue], label: s[fieldLabel || fieldValue] };
      })
    );
  }

  renderTable() {
    const { showTable, showTableMenu, doctor, options: { doctors } } = this.state;

    return showTable && (
      <TableContainer>
        <Col>
          <Table timeSlots={timeSlots} onClick={this.handleChange('showTableMenu')} />
        </Col>
        <Col>
          { showTableMenu && <TableMenuContainer>
              <div>ราคาเฉลี่ย</div>
              <div>อุดฟัน</div>
              <div>600 - 1000</div>
              <div>เลือกหมอ</div>
              <Select value={doctor} options={this.renderSelectOptions(doctors, 'name')} onChange={this.handleChange('doctor')} />
              <Button value={'Confirm'} onClick={this.handleChange('showModal')}/>
            </TableMenuContainer>
          }
        </Col>
      </TableContainer>
    );
  }

  render() {
    const { clinic, treatmentType, treatment, showModal, options } = this.state;
    const { clinics, treatmentTypes } = options;

    return (
      <PageContainer title={'Appointment'}>
        <Container>
          <OptionContainer>
            <Col>
              <Select value={clinic} options={this.renderSelectOptions(clinics, 'id', 'name')} onChange={this.updateClinic} />
              <DatePicker size={'large'} />
            </Col>
            <Col>
              <Select disabled={!clinic} value={treatmentType} options={this.renderSelectOptions(treatmentTypes, 'name')} onChange={this.handleChange('treatmentType')} />
              <Select disabled={!clinic} value={treatment} options={this.renderSelectOptions(treatmentTypes, 'name')} onChange={this.handleChange('treatment')} />:
              <Button value={'Find'} onClick={this.handleChange('showTable')} />
            </Col>
          </OptionContainer>
          { this.renderTable() }
          <Modal visible={showModal} onOk={this.handleSubmit} onCancel={this.handleCloseModal} />
        </Container>
      </PageContainer>
    );
  }
}

export default connect(
  state => {
    return {
      user: getUser(state),
      clinics: getClinics(state),
    }
  },
  { createAppointment }
)(Index);