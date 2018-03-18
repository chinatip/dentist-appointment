import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const MenuContainer = styled.div`
  width: 220px;
  height: 100%;
  display: flex;
  flex-direction: column;
`
const MenuItemContainer = styled.div`
  width: 100%;
  padding: 10px;
  border: 1px solid black;
  flex: 1;
`
const ItemContainer = styled.div`
  width: 100%;
  height: 30px;
  background: blue;
  margin-bottom: 5px;
`
const AddButton = styled.div`
  width: 100%;
  height: 30px;
  background: red;
`
const TabContainer = styled.div`

`

const MenuItem = () => {
  return (
    <ItemContainer>
      text
    </ItemContainer>
  )
}


class ManageDoctor extends Component {
  render() {
    return (
      <Container>
        <MenuContainer>
          <MenuItemContainer>
            <MenuItem />
            <MenuItem />
            <MenuItem />
          </MenuItemContainer>
          <AddButton>+</AddButton>
        </MenuContainer>
      </Container>
    )
  }
}

export default ManageDoctor;