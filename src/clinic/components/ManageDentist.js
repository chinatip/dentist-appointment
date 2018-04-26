import React from 'react'
import styled from 'styled-components'
import { compose, withStateHandlers } from 'recompose'

import { Table, Button } from 'common'
import { formatDentists } from '../util'
import ManageDentistModal from './ManageDentistModal'
import { LOADER, FETCH, DENTIST_TIMESLOT, CLINIC, TREATMENT, LIST } from 'services'
import PageHeader from './PageHeader'

const ManageDentist = ({ clinics, treatments, data, modal, onUpdateModal }) => {
  const clinic = clinics[0]
  const dentists = clinic.dentists  
  const { dataSource, columns } = formatDentists({ clinic, dentists, onEdit: onUpdateModal })
  
  return (
    <div>
      <PageHeader title={'หมอฟัน'}>
        <Button onClick={onUpdateModal} value={'เพิ่มหมอฟัน'}/>
      </PageHeader>
      <Table dataSource={dataSource} columns={columns} />
      <ManageDentistModal visible={modal} onOk={onUpdateModal} onCancel={onUpdateModal} treatments={treatments} clinic={clinic} data={data} />
    </div>
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