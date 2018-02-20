import React, { Component } from 'react';
import { Table } from 'antd';

class CustomTable extends Component {
  render() {
    const { columns, dataSource } = this.props;
    
    return <Table columns={columns} dataSource={dataSource} pagination={false} />;
  }
}

export default CustomTable;