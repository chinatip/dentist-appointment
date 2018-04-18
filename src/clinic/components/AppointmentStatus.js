import React from 'react'
import styled from 'styled-components'
import { compose, withStateHandlers } from 'recompose'

import { LOADER, FETCH, APPOINTMENT, LIST } from 'services'
import { Table, Button, Switch } from 'common'
import { formatStatus } from '../util'
import PageHeader from './PageHeader'
import { cssFontH3, colorGrey } from 'common/styles/style-base'

const EditContainer = styled.div`
  display: flex;
`
const EditContainerLabel = styled.div`
  ${cssFontH3}
  color: ${colorGrey};
  margin-right: 1rem;
`

const AppointmentStatus = (props) => {
  const { editable, updateEdit } = props
  const { dataSource, columns } = formatStatus(props)

  return (
    <div>
      <PageHeader title={'สถานะการนัดหมาย'}>
        <EditContainer>
          <EditContainerLabel>แก้ไข</EditContainerLabel>
          <Switch checked={editable} onChange={updateEdit} />
        </EditContainer>
      </PageHeader>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  )
};

const enhance = compose(
  LOADER,
  FETCH(APPOINTMENT, LIST),
  withStateHandlers(
    { editable: false },
    { 
      updateEdit: ({ editable }) => (e) => ({ 
        editable: !editable, 
      })
    }
  )
)

export default enhance(AppointmentStatus);