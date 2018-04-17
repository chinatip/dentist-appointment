import React, { Component } from 'react'
import styled from 'styled-components'

import { Section1 } from './components'

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
`

export default () => {
  return (
    <Container>
      <Section1 />
    </Container>
  )
}


