import React from 'react'
import styled from 'styled-components'
import { compose, withStateHandlers } from 'recompose'

import { Table, Button } from 'common'
import { formatDoctor } from '../util'
import ManageDentistModal from './ManageDentistModal'
import { LOADER, FETCH, DENTIST_TIMESLOT, CLINIC, TREATMENT, LIST } from 'services'

const Container = styled.div`

`

const ManageDentist = ({ clinics, treatments, data, modal, onUpdateModal }) => {
  const clinic = clinics[0]
  const dentists = clinic.dentists  
  const { dataSource, columns } = formatDoctor({ clinic, dentists, onEdit: onUpdateModal })
  
  return (
    <Container>
      <Button onClick={onUpdateModal} value={'เพิ่มหมอฟัน'}/>
      <Table dataSource={dataSource} columns={columns} />
      <ManageDentistModal visible={modal} onOk={onUpdateModal} onCancel={onUpdateModal} treatments={treatments} clinic={clinic} data={data} />
    </Container>
  )
}

const enhance = compose(
  LOADER,
  FETCH(CLINIC, LIST),
  FETCH(TREATMENT, LIST),
  withStateHandlers(
    { modal: false, data: {} },
    {
      onUpdateModal: ({ modal }) => (data) => {
        if (!modal) {
          return { modal: !modal, data }
        }

        return { modal: !modal, data: {} }
      }
    }
  )
)

export default enhance(ManageDentist)