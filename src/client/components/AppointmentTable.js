import React from 'react';

import { Table, Button } from 'common';

const renderSelectButton = (onClick, text) => {
  return <Button value={'Select'} onClick={onClick(text)} />
};

const getTableData = ({timeSlots, onClick}) => {
  const dataSource = [];
  const columns = [{
    dataIndex: 'timeSlot',
    key: 'timeSlot',
  }, {
    dataIndex: 'timeSlot',
    key: 'select',
    render: text => renderSelectButton(onClick, text)
  }];

  timeSlots.forEach((slot) => {
    const action = {
      key: slot,
      timeSlot: `${slot}:00 - ${slot + 1}:00`,
    }
    dataSource.push(action)
  });

  return { columns, dataSource };
};

export default ({ timeSlots, onClick }) => {
  const { columns, dataSource } = getTableData({ timeSlots: timeSlots, onClick: onClick});

  return <Table columns={columns} dataSource={dataSource} hideHead />;
};