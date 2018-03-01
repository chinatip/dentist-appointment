import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { PageContainer, DatePicker, Select, Button, Modal } from 'common';

import { loadUser, updateUser } from 'redux/user';
import { WithData } from 'hoc';
import Table from './Table';

const CLINICS = [
  { value: 'rak-fhan', label: 'บ้านรักฟัน' },
  { value: 'rak-yim', label: 'บ้านรักยิ้ม' },
];
const TREATMENT_TYPES = [
  { value: 'normal', label: 'ทั่วไป' },
  { value: 'special', label: 'เฉพาะทาง' },
];
const NORMAL_TREATMENTS = [
  { value: 'a', label: 'ตรวจฟัน' },
  { value: 'b', label: 'อุดฟัน' },
  { value: 'c', label: 'ถอนฟัน' },
];
const SPECIAL_TREATMENTS = [
  { value: 'd', label: 'จัดฟัน' },
  { value: 'e', label: 'รักษารากฟัน' },
];
const DOCTORS = [
  { value: 'มานี', label: 'มานี' },
  { value: 'มีนา', label: 'มีนา' },
];


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
      clinic: CLINICS[0].value,
      treatmentType: TREATMENT_TYPES[0].value,
      normalTreatment: NORMAL_TREATMENTS[0].value,
      specialTreatment:  SPECIAL_TREATMENTS[0].value,
      doctor: DOCTORS[0].value,
      showTable: false,
      showTableMenu: false,
      showModal: false
    };
  }

  handleChange = (key) => (value) => {
    this.setState({
      [key]: value
    });
  }

  handleClick = (key) => () => {
    this.setState({
      [key]: true
    });
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false
    });
  }

  handleUpdateUser = () => {
    const { updateUser, user } = this.props;
    console.log(user, updateUser)
    // updateUser({ name: 'yesss' })
  }

  renderTable() {
    const { showTable, showTableMenu, doctor } = this.state;

    return showTable && (
      <TableContainer>
        <Col>
          <Table timeSlots={this.props.data.clinics[0].timeSlots} onClick={this.handleClick('showTableMenu')} />
        </Col>
        <Col>
          { showTableMenu && <TableMenuContainer>
              <div>ราคาเฉลี่ย</div>
              <div>อุดฟัน</div>
              <div>600 - 1000</div>
              <div>เลือกหมอ</div>
              <Select value={doctor} options={DOCTORS} onChange={this.handleChange('doctor')} />
              <Button value={'Confirm'} onClick={this.handleClick('showModal')}/>
            </TableMenuContainer>
          }
        </Col>
      </TableContainer>
    );
  }

  render() {
    const { clinic, treatmentType, normalTreatment, specialTreatment, showModal } = this.state;
    
    return (
      <PageContainer title={'Appointment'}>
        <Container>
          <OptionContainer>
            <button onClick={this.handleUpdateUser}>updateUser</button>
            <Col>
              <Select value={clinic} options={CLINICS} onChange={this.handleChange('clinic')} />
              <DatePicker size={'large'} />
            </Col>
            <Col>
              <Select value={treatmentType} options={TREATMENT_TYPES} onChange={this.handleChange('treatmentType')} />
              { treatmentType === 'normal'? 
                <Select value={normalTreatment} options={NORMAL_TREATMENTS} onChange={this.handleChange('normalTreatment')} />:
                <Select value={specialTreatment} options={SPECIAL_TREATMENTS} onChange={this.handleChange('specialTreatment')} />
              }
              <Button value={'Find'} onClick={this.handleClick('showTable')} />
            </Col>
          </OptionContainer>
          { this.renderTable() }
          <Modal visible={showModal} onOk={this.handleCloseModal} onCancel={this.handleCloseModal} />
        </Container>
      </PageContainer>
    );
  }
}

// export default WithData(Index);

export default connect(
  state => {
    return {
      user: loadUser(state)
    }
  },
  { updateUser }
)(WithData(Index));