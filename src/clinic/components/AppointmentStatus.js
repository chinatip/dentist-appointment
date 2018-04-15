import React from 'react'
import styled from 'styled-components'
import { compose, withStateHandlers } from 'recompose'

import { LOADER, FETCH, APPOINTMENT, LIST } from 'services'
import { Table, Button, Switch } from 'common'
import { formatStatus } from '../util'

const Container = styled.div`

`

const AppointmentStatus = (props) => {
  const { editable, updateEdit } = props
  const { dataSource, columns } = formatStatus(props)

  return (
    <Container>
      <Switch checked={editable} onChange={updateEdit} />
      <Table columns={columns} dataSource={dataSource} />
    </Container>
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