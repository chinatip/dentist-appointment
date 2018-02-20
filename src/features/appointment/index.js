import React, { Component } from 'react';
import styled from 'styled-components';
import forEach from 'lodash/forEach';
import { PageContainer, DatePicker, Table } from 'common';
import { WithData } from 'hoc';

const Container = styled.div`
  
`;

class Index extends Component {
  getTableData() {
    const { timeSlots, clinics } = this.props.data;
    const dataSource = [];
    const columns = [{
      dataIndex: 'action',
      key: 'action',
      render: text => <span>{text}</span>,
    }];
    timeSlots.forEach((slot) => {
      const timeSlot = {
        title: slot,
        dataIndex: slot,
        key: slot,
        render: (text, record) => {
          return record[slot]? <div style={{ color: 'green'}}>/</div>: <div style={{ color: 'red'}}>/</div>;
        }
      }
      columns.push(timeSlot);
    })
    
    forEach(clinics[0].actions, (status, actionName) => {
      if (status) {
        const action = {
          key: actionName,
          action: actionName,
        }
        timeSlots.forEach((slot) => {
          action[slot] = true;
        })
        dataSource.push(action)
      }
    })

    return { columns, dataSource };
  }

  render() {
    const { columns, dataSource } = this.getTableData();
    
    return (
      <PageContainer title={'Appointment'}>
        <Container>
          <DatePicker size={'large'} />
          <Table columns={columns} dataSource={dataSource}/>
        </Container>
      </PageContainer>
    );
  }
}

export default WithData(Index);