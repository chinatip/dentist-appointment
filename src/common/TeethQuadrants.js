import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'

import Button from './Button'

const Container = styled.div`
  width: 100%;
  height: 100%;
`
const QuadrantContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`
const TeethQuadrantContainer = styled.div`
  flex: 1;
  
  ${props => props.top && 'padding-bottom: 20px;'}
  ${props => props.left && 'padding-right: 30px;'}
`
const TeethListContainer = styled.div`
  display: flex;
  ${props => props.reverse && 'justify-content: flex-end;'}
  margin-bottom: 10px;
`

const QUADRANTS = [1, 2, 4, 3]
const PERMANENT = [1, 2, 3, 4, 5, 6, 7, 8]
const PRIMARY = ['A', 'B', 'C', 'D', 'E']
const PRIMARY_BY_NUMBER = {
  'A': 1,
  'B': 2,
  'C': 3,
  'D': 4,
  'E': 5
}

class TeethQuadrants extends Component {
  renderTeeth({ list, q, isPrimary = false }) {
    const { selectedTeeth } = this.props    
    const teeth = _.clone(list)
    const reverse = q === 1 || q === 4
    if (reverse) {
      teeth.reverse()
    }

    return (
      <TeethListContainer reverse={reverse}>
        { teeth.map((t) => {
          let isSeleted = selectedTeeth.includes(`${q}${t}`)

          if (isPrimary) {
            const tLabel = `${q+4}${PRIMARY_BY_NUMBER[t]}`
            isSeleted = selectedTeeth.includes(tLabel) || isSeleted
          }

          return <Button value={t} teeth selectedTooth={isSeleted} />
        })}
      </TeethListContainer>
    )
  }

  renderQuadrants() {
    return (
      <QuadrantContainer>
        { QUADRANTS.map((q) => {
            const isTopQ = q === 1 || q === 2
            const isLeftQ = q === 1 || q === 4

            return (
              <TeethQuadrantContainer top={isTopQ} left={isLeftQ}>
                { isTopQ ?
                  <div>
                    { this.renderTeeth({ list: PRIMARY, q, isPrimary: true }) }
                    { this.renderTeeth({ list: PERMANENT, q }) }
                  </div>: 
                  <div>
                    { this.renderTeeth({ list: PERMANENT, q }) }
                    { this.renderTeeth({ list: PRIMARY, q, isPrimary: true }) }
                  </div>
                }
              </TeethQuadrantContainer>
            )
          }) 
        }
      </QuadrantContainer>
    )
  }

  render() {
    return (
      <Container>
        { this.renderQuadrants() }
      </Container>
    )
  }
}

export default TeethQuadrants