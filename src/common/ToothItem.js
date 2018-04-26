import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'

import Button from './Button'
import TeethQuadrants from './TeethQuadrants'

import { POST, APPOINTMENT, REPORT, CREATE, UPDATE } from 'services'
import { cssFontH3 } from './styles/style-base'

const cssColorBlue = '#00bcce'

const ListItemContainer = styled.div`
  padding: 15px 10px;
  border: 1px solid ${cssColorBlue};
  border-radius: 4px;
  margin-bottom: 10px;
  display: flex;
`
const ItemContainer = styled.div`
  
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

  input {
    background: transparent;
    border: none;
    width: 60%;
    text-align: center;
    border-radius: 4px;
    ${cssFontH3}
    color: ${cssColorBlue};
  }
`

export default ({ 
  name,
  toothIndex,
  historyList, 
  onUpdateTooth,
  onRemoveTooth,
  onUpdateToothDetail,
  onRemoveToothDetail,
  onAddToothDetail,
}) => {
  return (
    <ListItemContainer>
      <Label>
        <input value={name} onChange={(e) => onUpdateTooth(toothIndex, 'name', e.target.value)}/>
      </Label>
      <ItemContainer>
        { _.map(historyList, (l, lIndex) => ( 
            <List>
              <input value={l} onChange={(e) => onUpdateToothDetail(toothIndex, lIndex, e.target.value)}/>
              <Button value={'X'} onClick={onRemoveToothDetail(toothIndex, lIndex)} />
            </List>
          )
        )}
        <Button value={'+'} onClick={onAddToothDetail(toothIndex)} />
      </ItemContainer>
      <div style={{ flex: 1 }} />
      <Button value={'X'} onClick={onRemoveTooth(toothIndex)} />
    </ListItemContainer>
  )
}