import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Clinic from 'clinic'
import Login from './Login'
import Register from './Register'
import Home from 'client'

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route exact path="/register" render={() => <Redirect to="/register/new" />} />
        <Route path="/register/:id" component={Register} />
        <Route exact path="/clinic" render={() => <Redirect to="/clinic/status" />} />
        <Route path="/clinic/:type" component={Clinic} />
      </Switch>
    </Router>
  )
}