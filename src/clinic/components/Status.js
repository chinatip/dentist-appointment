import React from 'react';

import { Table, Button } from 'common';

const getTableData = () => {
  const dataSource = [{
    key: '1',
    date: '1/3/2018',
    action: 'จัดฟัน',
    customerName: 'มานี มั่งมี',
    status: 'waiting'
  }, {
    key: '2',
    date: '1/3/2018',
    action: 'ถอนฟัน',
    customerName: 'มานะ มั่งมี',
    status: 'cancelled'
  }, {
    key: '3',
    date: '1/3/2018',
    action: 'รักษารากฟัน',
    customerName: 'มานะ มั่งมี',
    status: 'confirmed'
  }];
  
  const columns = [{
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  }, {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  }, {
    title: 'customerName',
    dataIndex: 'customerName',
    key: 'customerName',
  }, {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => status === 'waiting'? <button>confirm</button>: status
  }];

  return { columns, dataSource };
};

export default ({ timeSlots, onClick }) => {
  const { columns, dataSource } = getTableData();

  return <Table columns={columns} dataSource={dataSource} />;
};