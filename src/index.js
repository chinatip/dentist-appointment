import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled, { injectGlobal } from 'styled-components'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'

import Routes from './Routes'
import reducer from 'redux/reducers'
import registerServiceWorker from './registerServiceWorker'
import 'antd/dist/antd.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { media, mediaExceed } from 'common/styles/media-style'

const middlewares = [thunk]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let store = createStore(reducer, {}, composeEnhancers(applyMiddleware(...middlewares)))

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`
const GlobalStyles = ({theme}) => {
  injectGlobal `
    body, html {
      padding: 0;
      margin: 0;
      width: 100%;
      height: 100%;
    }

    ${mediaExceed.super`html { font-size: 1vw; }`}
    ${media.small`html { font-size: 16px; }`}

    @import url('https://fonts.googleapis.com/css?family=Prompt:300,400,500,600,700,800,900');
  `
  return null
}

class App extends Component {
  render() {
    return (
      <Provider store={store} key="provider">
        <Container>
          <GlobalStyles />
          <Routes />
        </Container>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
