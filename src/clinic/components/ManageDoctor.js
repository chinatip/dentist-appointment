import React from 'react'
import { compose } from 'recompose'

import { LOADER, FETCH_TABLE } from 'services'
import { Table, Button } from 'common'

const ManageDoctor = (props) => {
  return <div></div>
  // return <Table columns={columns} dataSource={dataSource} />
};

const enhance = compose(
  LOADER,
  FETCH_TABLE('timeslots'),
  FETCH_TABLE('dentists'),
  FETCH_TABLE('users'),
)

export default enhance(ManageDoctor);