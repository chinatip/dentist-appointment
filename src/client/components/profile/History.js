import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import { getUser } from 'redux/user'
import { LOADER, FETCH, REPORT, FIND_BY_PATIENT_ID } from 'services'
import TreatmentCard from 'common/TreatmentCard'


const enhance = compose(
  LOADER,
  FETCH(REPORT, FIND_BY_PATIENT_ID)
)

const Container = styled.div``
const Flex = styled.div`
  display: flex;
`
const RepContainer = styled.div`
  margin-right: 15px;
`


class History extends Component {
  render() {
    const { reports} = this.props

    return (
      <Container>
        history
        <Flex>
            { reports.map((rep) => {
                const { data, note } = rep

                return (
                  <RepContainer>
                    { rep._id }
                    <TreatmentCard 
                      edit={false}
                      data={data}
                      note={note}
                    />
                  </RepContainer>
                )
              })
            }
          </Flex>
      </Container>
    )
  }
}

export default connect(
  (state) => ({ 
    user: getUser(state)
  }), {}
)(enhance(History))