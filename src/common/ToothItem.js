import _ from 'lodash'
import React, { Component } from 'react'
import styled, { css } from 'styled-components'

import Button from './Button'
import TeethQuadrants from './TeethQuadrants'

import { POST, APPOINTMENT, REPORT, CREATE, UPDATE } from 'services'
import { cssFontH3 } from './styles/style-base'

const cssColorBlue = '#00bcce'
const cssDisabledInput = `
  pointer-events: none;
`
const Container = styled.div`
  padding: 15px 10px;
  border: 1px solid ${cssColorBlue};
  border-radius: 4px;
  margin-bottom: 10px;
  display: flex;
  ${props => !props.edit && `
    .ant-btn {
      display: none;
    }
  `}
`

const DetailContainer = styled.div`
  
`
const List = styled.div`
  display: flex;
`
const Label = styled.div`
  width: 60px;
  height: 60px;
  border: 1px solid ${cssColorBlue};
  border-radius: 6px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`
const LabelInput = styled.input`
  background: transparent;
  border: none;
  width: 60%;
  text-align: center;
  border-radius: 4px;
  ${cssFontH3}
  color: ${cssColorBlue};
  ${props => !props.edit && cssDisabledInput};
`

const DetailInput = styled.input`
  ${props => !props.edit && cssDisabledInput};
`
export default ({ 
  name,
  edit = true,
  toothIndex,
  historyList, 
  onUpdateTooth,
  onRemoveTooth,
  onUpdateToothDetail,
  onRemoveToothDetail,
  onAddToothDetail,
}) => {
  return (
    <Container edit={edit}>
      <Label>
        <LabelInput value={name} onChange={onUpdateTooth? (e) => onUpdateTooth(toothIndex, 'name', e.target.value): null} edit={edit} />
      </Label>
      <DetailContainer>
        { _.map(historyList, (l, lIndex) => ( 
            <List edit={edit}>
              <DetailInput value={l} onChange={onUpdateToothDetail? (e) => onUpdateToothDetail(toothIndex, lIndex, e.target.value): null } edit={edit} />
              <Button value={'X'} onClick={onRemoveToothDetail? onRemoveToothDetail(toothIndex, lIndex): null } />
            </List>
          )
        )}
        <Button value={'+'} onClick={onAddToothDetail? onAddToothDetail(toothIndex): null } />
      </DetailContainer>
      <div style={{ flex: 1 }} />
      <Button value={'X'} onClick={onRemoveTooth? onRemoveTooth(toothIndex): null } />
    </Container>
  )
}