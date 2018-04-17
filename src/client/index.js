import React, { Component } from 'react'
import styled from 'styled-components'

import { Section1, Section2 } from './components'

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  overflow-x: hidden;
  overflow-y: scroll;
`

export default () => {
  return (
    <Container>
      <Section1 />
      <Section2 />
    </Container>
  )
}


