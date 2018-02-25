import React from 'react';

import { Table, Button } from 'common';

const renderSelectButton = (onClick) => {
  return <Button value={'Select'} onClick={onClick} />
};

const getTableData = ({timeSlots, onClick}) => {
  const dataSource = [];
  const columns = [{
    dataIndex: 'timeSlot',
    key: 'timeSlot',
  }, {
    dataIndex: 'select',
    key: 'select',
    render: text => renderSelectButton(onClick)
  }];

  timeSlots.forEach((slot) => {
    const action = {
      key: slot,
      timeSlot: `${slot}:00 - ${slot + 1}:00`,
      select: (slot % 2 === 0),
    }
    dataSource.push(action)
  });

  return { columns, dataSource };
};

export default ({ timeSlots, onClick }) => {
  const { columns, dataSource } = getTableData({ timeSlots: timeSlots, onClick: onClick});

  return <Table columns={columns} dataSource={dataSource} hideHead />;
};