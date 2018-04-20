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
  margin-bottom: 4rem;
`
const ItemListContainer = styled.div`
  display: flex;
  justify-content: space-between;

`
const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`
const ItemImage = styled.div`
  width: 100%;
  height: 80px;
  margin-bottom: 2rem;
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
const TempCircle = styled.div`
  width: 5.5rem;
  height: 5.5rem;
  background: linear-gradient(green,black);
  position: absolute;
  background: linear-gradient(109deg,rgba(255,255,255,0.15),rgba(177, 247, 230, 0.11) 40%,rgba(68, 211, 214, 0.08) 90%);
  transform: translate(0%, 0%);
  border-radius: 50%;
`


const Item = ({ title, text, children }) => {
  return (
    <ItemContainer>
      {children}
      <TempCircle />
      <ItemImage />
      <ItemTitle>{title}</ItemTitle>
      <ItemSubtitle>{text}</ItemSubtitle>
    </ItemContainer>
  )
}

export default () => {
  return (
    <Container>
      <InnerContainer>
        <Header>ฟีเจอร์ต่างๆ</Header>
        <ItemListContainer> 
          <Item title={'นัดหมาย'} text={'ให้คุณไม่พลาดทุกการนัดหมาย'} /> 
          <Item title={'แจ้งเตือน'} text={'ให้คุณไม่พลาดทุกการนัดหมาย'} />       
          <Item title={'แจ้งเตือน'} text={'ให้คุณไม่พลาดทุกการนัดหมาย'} />       
        </ItemListContainer>
      </InnerContainer>
    </Container>
  )
}