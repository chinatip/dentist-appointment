import React, { Component } from 'react'
import styled from 'styled-components'

import { cssFontH2, cssFontH3, cssFontP, colorBlack, colorGrey } from 'common/styles/style-base'

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
  ${cssFontH2}
  color: ${colorBlack};
  margin-bottom: 100px;
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
const ItemImage = styled.div`
  width: 100%;
  height: 80px;
  margin-bottom: 20px;
`
const ItemTitle = styled.div`
  ${cssFontH3}
  color: ${colorBlack};
  margin-bottom: 0.7rem;
`
const ItemSubtitle = styled.div`
  ${cssFontP}
  color: ${colorGrey};
`

const Item = ({ title, text, children }) => {
  return (
    <ItemContainer>
      {children}
      <ItemImage />
      <ItemTitle>title</ItemTitle>
      <ItemSubtitle>text text text text text textt exttex texttext </ItemSubtitle>
    </ItemContainer>
  )
}

export default () => {
  return (
    <Container>
      <InnerContainer>
        <Header>Header</Header>
        <ItemListContainer> 
          <Item /> 
          <Item />       
          <Item />       
        </ItemListContainer>
      </InnerContainer>
    </Container>
  )
}