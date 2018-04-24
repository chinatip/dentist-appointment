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
  flex-wrap: wrap;
`
const TeethQuadrantContainer = styled.div`
  width: 50%;
  
  ${props => props.top && 'padding-bottom: 20px;'}
  ${props => props.left && 'padding-right: 30px;'}
`
const TeethListContainer = styled.div`
  display: flex;
  ${props => props.reverse && 'justify-content: flex-end;'}
  margin-bottom: 10px;
`

const quadrants = [1, 2, 4, 3]
const primary = ['A', 'B', 'C', 'D', 'E']
const permanent = [1, 2, 3, 4, 5, 6, 7, 8]

class TeethQuadrants extends Component {
  renderTeeth(teethList, q) {
    const teeth = _.clone(teethList)
    const reverse = q === 1 || q === 4
    if (reverse) {
      teeth.reverse()
    }
    
    return (
      <TeethListContainer reverse={reverse}>
        { teeth.map((t) => {
          return <Button value={`${q}-${t}`} />
        })}
      </TeethListContainer>
    )
  }

  renderQuadrants() {
    return (
      <QuadrantContainer>
        { quadrants.map((q) => {
            const isTopQ = q === 1 || q === 2
            const isLeftQ = q === 1 || q === 4

            return (
              <TeethQuadrantContainer top={isTopQ} left={isLeftQ}>
                { isTopQ ?
                  <div>
                    { this.renderTeeth(primary, q) }
                    { this.renderTeeth(permanent, q) }
                  </div>: 
                  <div>
                    { this.renderTeeth(permanent, q) }
                    { this.renderTeeth(primary, q) }
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