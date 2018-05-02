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

    .ant-menu-submenu-title {
      font-weight: 500 !important;
      font-size: 1.3rem !important;
      line-height: 2.5rem !important;
      color: #00bcce !important;
      font-family: Prompt, sans-serif;
    }
    .ant-menu-item {
      a {
        color: rgb(110, 133, 136) !important;
        font-family: Prompt, sans-serif;
        transition: all 0.3s;
        &:hover {
          color: rgba(0, 188, 206, 0.9) !important;
        }
      }
    }
    .ant-menu-item-selected {
      background: rgba(69, 239, 255, 0.04) !important;
      font-family: Prompt, sans-serif;
      &::after {
        border-right: 3px solid rgba(12, 158, 181, 0.23) !important
      }
      a {
        color: rgba(0, 188, 206, 0.87) !important;
        font-size: 1.1rem;
      }
    }
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
