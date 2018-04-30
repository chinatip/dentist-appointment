import _ from 'lodash'
import React, { Component } from 'react'
import styled, { css } from 'styled-components'

import ToothItem from './ToothItem'

const Container = styled.div`
  padding: 10px;
  border: 1px solid blue;
`
const NoteContainer = styled.div`
  
`
const NoteInput = styled.input`
  ${props => props.disabled && 'pointer-events: none;'}
`

export default ({ 
  data,
  note, 
  edit,
  onUpdateTooth,
  onRemoveTooth,
  onUpdateToothDetail,
  onRemoveToothDetail,
  onAddToothDetail,
  onUpdateNote
}) => {
  return (
    <Container>
      { data.map((d, dIdx) => {
        const { name, list } = d

        return (
          <ToothItem 
            edit={edit}
            name={name}
            toothIndex={dIdx} 
            historyList={list}
            onUpdateTooth={onUpdateTooth}
            onRemoveTooth={onRemoveTooth}
            onUpdateToothDetail={onUpdateToothDetail}
            onRemoveToothDetail={onRemoveToothDetail}
            onAddToothDetail={onAddToothDetail}
          />
        )
      })}
      <NoteContainer>
        <NoteInput value={note} onChange={onUpdateNote} />
      </NoteContainer>
    </Container>
  )
}