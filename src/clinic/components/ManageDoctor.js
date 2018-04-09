import React from 'react'
import { compose } from 'recompose'

import { LOADER, FETCH } from 'services'
import { Table, Button } from 'common'

const ManageDoctor = (props) => {
  return <div></div>
  // return <Table columns={columns} dataSource={dataSource} />
};

const enhance = compose(
  LOADER,
  FETCH('timeslots'),
  FETCH('dentists'),
  FETCH('users'),
)

export default enhance(ManageDoctor);