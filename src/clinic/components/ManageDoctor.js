import React from 'react'
import { compose } from 'recompose'

import { Table, Button } from 'common'
import { formatDoctor } from '../util'
import { LOADER, FETCH, DENTIST_TIMESLOT, CLINIC, LIST } from 'services'

const ManageDoctor = (props) => {
  const clinic = props.clinics[0]
  const dentists = clinic.dentists
  
  const { dataSource, columns } = formatDoctor({ clinic, dentists })
  
  return <Table dataSource={dataSource} columns={columns} />
}

const enhance = compose(
  LOADER,
  FETCH(DENTIST_TIMESLOT, LIST),
  FETCH(CLINIC, LIST)
)

export default enhance(ManageDoctor)