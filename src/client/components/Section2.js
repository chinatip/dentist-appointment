import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: auto;
  max-width: 926px;
  min-height: 300px;
  margin: 0 auto;
`
const InnerContainer = styled.div`
  width: 100%;
  margin: 50px 0;
`
const Header = styled.div`
  text-align: center;
`
const Subheader = styled.div`
  text-align: center;
`
const ItemListContainer = styled.div`
  display: flex;
  justify-content: space-between;

`
const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ItemTitle = styled.div`

`
const ItemSubtitle = styled.div`

`

const Item = ({ title, text, children }) => {
  return (
    <ItemContainer>
      {children}
      <ItemTitle>title</ItemTitle>
      <ItemSubtitle>text text text text text texttexttexttexttext </ItemSubtitle>
    </ItemContainer>
  )
}

export default () => {
  return (
    <Container>
      <InnerContainer>
        <Header>Header</Header>
        <Subheader>Subheader</Subheader>
        <ItemListContainer> 
          <Item /> 
          <Item />       
          <Item />       
        </ItemListContainer>
      </InnerContainer>
    </Container>
  )
}